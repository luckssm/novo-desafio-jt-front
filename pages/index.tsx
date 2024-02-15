import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { getTickets } from "../services/api/apiCalls";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import TicketCard from "../components/TicketCard";
import { Pagination } from "../components/Pagination";
import { AllFiltersContainer } from "../components/Filters/AllFiltersContainer";

export type CompleteTicket = {
  id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  price: {
    full: number;
    discount: number;
  };
  rating: {
    reviewsCount: number;
    value: number;
  };
  createdAt: Date;
  updatedAt: Date;
};

export async function getStaticProps() {
  const allTicketsData = await getTickets({ searchTerm: "" })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error("Error when static loading data: ", err);
      return null;
    });

  return {
    props: {
      allTicketsData,
    },
  };
}

export default function Home({
  allTicketsData,
}: {
  allTicketsData: Array<CompleteTicket>;
}) {
  const itemsPerPage = 6;

  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);

  const paginatedResults = (tickets: Array<CompleteTicket>) => {
    return tickets?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    );
  };

  const [completeTickets, setCompleteTickets] = useState(
    paginatedResults(allTicketsData),
  );

  const [lastSearchedTerm, setLastSearchedTerm] = useState("");

  const [totalItems, setTotalItems] = useState(allTicketsData.length);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(allTicketsData?.length / itemsPerPage),
  );

  const getNewTickets = async ({ searchTerm }: { searchTerm: string }) => {
    getTickets({ searchTerm })
      .then((res) => {
        if (res.data) {
          const responsePaginated = res.data;
          setCompleteTickets(paginatedResults(responsePaginated));
          setTotalItems(responsePaginated.length);
          setTotalPages(Math.ceil(responsePaginated.length / itemsPerPage));
        }
      })
      .catch((err) => console.error("Error getting tickets: ", err));
  };

  // API call when navigating through pagination
  useEffect(() => {
    if (currentPage <= totalPages) {
      getNewTickets({ searchTerm: lastSearchedTerm });
    }
  }, [currentPage]);

  const goToTicketPage = ({ url }) => {
    router.push(url, { scroll: false });
  };

  const searchTicketByCityFunction = (input: string) => {
    getNewTickets({ searchTerm: input });
    setLastSearchedTerm(input);
  };

  const renderTicketCard = (completeTicket: CompleteTicket) => {
    return (
      <TicketCard
        attractionTitle={completeTicket?.name}
        attractionLocation={completeTicket?.location}
        attractionImage={completeTicket?.image}
        attractionImageAlt={completeTicket?.name}
        attractionPriceBefore={completeTicket?.price?.full}
        attractionPriceNow={completeTicket?.price?.discount}
        attractionRatingCount={completeTicket?.rating?.reviewsCount}
        attractionRatingValue={completeTicket?.rating?.value}
        onButtonClick={() =>
          goToTicketPage({ url: `/detalhe-ingresso/${completeTicket?.id}` })
        }
      />
    );
  };

  const renderTicketCards = () => {
    return (
      <>
        {completeTickets?.length > 0 ? (
          <>
            {completeTickets.map(
              (completeTicket: CompleteTicket, index: number) => {
                return (
                  <div className="mb-3" key={index}>
                    {renderTicketCard(completeTicket)}
                  </div>
                );
              },
            )}
            <Pagination
              totalItems={totalItems}
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        ) : (
          <>
            <p>Não foram encontrados ingressos!</p>
          </>
        )}
      </>
    );
  };

  return (
    <>
      <Header />
      <div className="px-[16px] lg:px-[60px] py-9">
        <SearchBar searchFunction={searchTicketByCityFunction} />
      </div>
      <div className="flex px-[16px] lg:px-[60px] py-6 bg-graygray-05 min-h-screen">
        <div className="hidden lg:block mr-6 p-6 bg-white shadow-shadow-s w-full max-w-[368px]">
          <AllFiltersContainer />
        </div>
        <div className="w-full">{renderTicketCards()}</div>
      </div>
    </>
  );
}
