import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { getTicketById } from "../../services/api/apiCalls";

import { centsToText } from "../../services/utils/helpers/money";
import { addItemsToCart } from "../../redux/slices/cartSlice";

import Header from "../../components/Header";
import CustomBaseImage from "../../components/CustomBaseImage/CustomBaseImage";
import LocationInfoText from "../../components/LocationInfoText";
import SecondaryButton from "../../components/Buttons/SecondaryButton/SecondaryButton";
import ReviewRating from "../../components/ReviewRating";
import PerkComponent from "../../components/Perk";
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton";

import { CompleteTicket } from "..";
import { Perk } from "../../services/utils/helpers/perks";

// Array to test more than one perk
const perks: Array<Perk["slug"]> = [
  "airline-ticket",
  "wi-fi",
  "breakfast",
  "room",
];

export default function Ingresso() {
  const router = useRouter();
  const ticketId = router.query.id;

  const dispatch = useDispatch();

  const goBack = () => {
    router.back();
  };

  const [ticketData, setTicketData] = useState<CompleteTicket | null>(null);

  // We don't have this information of price per ticket type in the backend, so
  // we will just set this hardcoded for now
  const [ticketValuesData, setTicketValuesData] = useState([
    {
      type: "Adult",
      value: 235128,
    },
    {
      type: "Child",
      value: 220000,
    },
  ]);

  const [isAddTicketToCartButtonLoading, setIsAddTicketToCartButtonLoading] =
    useState(false);

  useEffect(() => {
    const getTicketData = async () => {
      getTicketById({ id: ticketId })
        .then((res) => {
          if (res.data) {
            setTicketData(res.data);
          }
        })
        .catch((err) => console.error("err: ", err));
    };

    if (ticketId) {
      getTicketData();
    }
  }, [ticketId]);

  const resolveSelectedTicketValues = () => {
    const ticketValuesLength = ticketValuesData.length;
    if (ticketValuesLength === 0) {
      return "Sem Ingressos selecionados.";
    }

    if (ticketValuesLength === 1) {
      return "01 Ingresso";
    }

    if (ticketValuesLength < 10) {
      return `0${ticketValuesLength} Ingressos`;
    }

    return `${ticketValuesLength} Ingressos`;
  };

  const renderPerks = () => {
    return perks.map((perk, key) => {
      return (
        <div className="mr-4" key={key}>
          <PerkComponent perkType={perk} />
        </div>
      );
    });
  };

  const resolveTicketType = ({ ticketType }) => {
    if (ticketType === "Adult") {
      return "adulto";
    }
    return "infantil";
  };

  // TODO: Add ticket dynamic amount
  const TicketDetails = ({ ticketValue }) => {
    return (
      <div className="flex justify-between mb-3">
        <p className="p2 text-graygray-40">
          01 Ingresso {resolveTicketType({ ticketType: ticketValue.type })}
        </p>
        <p className="p2 text-graygray-40">{centsToText(ticketValue.value)}</p>
      </div>
    );
  };

  const renderSelectedTicketValues = () => {
    return ticketValuesData.map((ticketValue, index) => {
      return <TicketDetails ticketValue={ticketValue} key={index} />;
    });
  };

  const calculateTotalTicketValue = () => {
    let totalValue = 0;
    ticketValuesData.forEach((ticketValue) => {
      totalValue += ticketValue.value;
    });
    return totalValue;
  };

  const handleAddTicketToCart = async () => {
    const cartItem = {
      ticketName: ticketData?.name,
      date: "15/02/2024", // Date is hardcoded for now
      tickets: ticketValuesData,
      image: ticketData?.image,
    };

    dispatch(addItemsToCart(cartItem));
  };

  return (
    <>
      <Header />
      <div className="px-[16px] lg:px-[60px] py-6 bg-graygray-05 min-h-screen">
        <div className="flex mb-9">
          <button className="self-start mr-4" onClick={goBack}>
            <CustomBaseImage
              src={"/static/icons/back-arrow.svg"}
              alt={"Botão de voltar"}
              minWidth={24}
              maxWidth={24}
            />
          </button>
          <div>
            <h3 className="mb-2" data-test={"ticket-name-details"}>
              {ticketData?.name}
            </h3>
            <LocationInfoText locationText={ticketData?.location} />
          </div>
        </div>
        <div className="relative mb-9">
          <CustomBaseImage
            src={ticketData?.image}
            alt={"Imagem de capa"}
            width={"100%"}
            height={400}
          />
          <div className="absolute flex w-full top-2 px-2 justify-end">
            <div>
              <SecondaryButton buttonText={"Visualizar mais fotos"} />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full sm:w-4/6">
            <div className="mb-6">
              <ReviewRating
                reviewNote={ticketData?.rating?.value}
                reviewAmount={ticketData?.rating?.reviewsCount}
              />
            </div>
            <div className="flex flex-wrap mb-8">{renderPerks()}</div>
            <div className="mb-6">
              <h3 className="text-brand-color-black mb-2">
                Sobre o Ingresso selecionado:
              </h3>
              <p className="p2 text-graygray-40">{ticketData?.description}</p>
            </div>
            <div>
              <h3 className="text-brand-color-black mb-2">Localização</h3>
              {/* TODO: Get image url from backend when we have this field */}
              <CustomBaseImage
                src={"/static/images/attraction-location-map.jpg"}
                alt={"Mapa localização"}
              />
            </div>
          </div>
          <div className="w-full sm:w-2/6 sm:pl-9 mt-4 sm:mt-0">
            <div className="bg-graygray-00 p-6 pt-8 rounded-md">
              <div className="border-b border-graygray-10 pl-1 pb-6 mb-6 flex justify-between">
                <div className="flex">
                  <CustomBaseImage
                    src={"/static/icons/calendar-date-list.svg"}
                    alt={"Ícone Calendário"}
                    width={24}
                    height={24}
                  />
                  <div className="ml-4">
                    <p className="p22 text-brand-color-black mb-1">
                      Data do Ingresso
                    </p>
                    {/* TODO: change to the correct selected date */}
                    <p className="p2 text-graygray-40">15/02/2024</p>
                  </div>
                </div>
                <div>
                  <CustomBaseImage
                    src={"/static/icons/arrow-down.svg"}
                    alt={"Ícone seta expandir"}
                    width={24}
                    height={24}
                  />
                </div>
              </div>
              <div className="border-b border-graygray-10 pl-1 pb-6 mb-6 flex justify-between">
                <div className="flex">
                  <CustomBaseImage
                    src={"/static/icons/profile.svg"}
                    alt={"Ícone Calendário"}
                    width={24}
                    height={24}
                  />
                  <div className="ml-4">
                    <p className="p22 text-brand-color-black mb-1">Ingressos</p>
                    <p className="p2 text-graygray-40">
                      {resolveSelectedTicketValues()}
                    </p>
                  </div>
                </div>
                <div>
                  <CustomBaseImage
                    src={"/static/icons/arrow-down.svg"}
                    alt={"Ícone seta expandir"}
                    width={24}
                    height={24}
                  />
                </div>
              </div>
              <div className="border-b border-graygray-10 pb-4 mb-6">
                {renderSelectedTicketValues()}
              </div>
              <div className="flex justify-between items-center mb-6">
                <p className="p22 text-brand-color-black">Valor total</p>
                <h2 className="text-brand-color-blue">
                  {centsToText(calculateTotalTicketValue())}
                </h2>
              </div>
              <PrimaryButton
                buttonText={"Comprar Ingresso"}
                onButtonClick={handleAddTicketToCart}
                isLoading={isAddTicketToCartButtonLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
