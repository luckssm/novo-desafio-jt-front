import { useDispatch } from "react-redux";

import { centsToText } from "../../../services/utils/helpers/money";
import { removeCartItem } from "../../../redux/slices/cartSlice";
import { generateUUID } from "../../../services/utils/helpers/uuid";

import CustomBaseImage from "../../CustomBaseImage/CustomBaseImage";

export type TicketType = {
  type: string;
  value: number;
};

export type CartItem = {
  date: string;
  image: string;
  ticketName: string;
  tickets: Array<TicketType>;
};

type CartItemComponentProps = {
  item: CartItem;
  index: number;
};

const CartItemComponent = ({ item, index }: CartItemComponentProps) => {
  const dispatch = useDispatch();

  const resolveItemName = () => {
    return `${item?.ticketName} - ${item?.date}`;
  };

  const resolveTicketType = ({ ticketType }) => {
    if (ticketType === "Adult") {
      return "Adulto";
    }
    return "Criança";
  };

  const ticketQuantity = item?.tickets.length;

  const resolveItemTicketType = (ticket: TicketType) => {
    const ticketType = resolveTicketType({
      ticketType: ticket?.type,
    });
    // TODO: group quantities so that there can be more than one ticket per type
    return `1 ${ticketType}: ${centsToText(ticket?.value)}`;
  };

  const resolveItemTicketPriceTypes = () => {
    return item?.tickets.map((ticket) => {
      return (
        <p
          key={generateUUID()}
          className="p3 text-graygray-40 inline-block mr-2"
        >
          {resolveItemTicketType(ticket)}
        </p>
      );
    });
  };

  const resolveItemQuantity = () => {
    const ticketQuantityString =
      ticketQuantity > 10 ? ticketQuantity : `0${ticketQuantity}`;
    return `Qtd ${ticketQuantityString}`;
  };

  const calculateItemTotalPrice = () => {
    return item.tickets.reduce((acc, currentValue) => {
      return acc + currentValue.value;
    }, 0);
  };

  const resolveItemTotalPrice = () => {
    return centsToText(calculateItemTotalPrice());
  };

  const handleRemoveCartItem = async () => {
    dispatch(removeCartItem(index));
  };

  return (
    <div className="flex border-b border-graygray-10 pb-5 mb-6">
      <div className="mr-4">
        <CustomBaseImage
          src={item?.image}
          alt={"Miniatura ingresso"}
          maxWidth={57}
        />
      </div>
      <div className="w-full">
        <div className="flex justify-between border-b border-graygray-10 pb-2 mb-2">
          <div>
            <p className="p2 text-graygray-60 mb-2">{resolveItemName()}</p>
            {resolveItemTicketPriceTypes()}
          </div>
          <button
            className="self-start ml-5"
            onClick={handleRemoveCartItem}
            data-test={"remove-item"}
            data-testid={"remove-item"}
          >
            <CustomBaseImage
              src={"/static/icons/trash-delete-bin.svg"}
              alt={"Ícone lixeira para remoção"}
              width={17}
              height={17}
            />
          </button>
        </div>
        <div>
          <div className="flex justify-between mb-3">
            <p className="p2 text-graygray-60">{resolveItemQuantity()}</p>
            <p className="p2 text-graygray-60">{resolveItemTotalPrice()}</p>
          </div>
          <div className="flex justify-between">
            <p className="p2 text-brand-color-black">Subtotal</p>
            <p className="p22 text-light-black">{resolveItemTotalPrice()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemComponent;
