import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { centsToText } from "../../../services/utils/helpers/money";

import CartItem from "./index";

describe("CartItem", () => {
  const item = {
    date: "12/03/2024",
    image: "/static/images/attraction-1.png",
    ticketName: "Nome do Ingresso",
    tickets: [
      {
        type: "Adult",
        value: 180000,
      },
      {
        type: "Child",
        value: 160000,
      },
    ],
  };

  it("should render the Cart Item with the item information", () => {
    render(
      <Provider store={store}>
        <CartItem index={0} item={item} />
      </Provider>,
    );

    const calculateItemPrice = () => {
      return item.tickets.reduce((acc, ticket) => {
        return acc + ticket.value;
      }, 0);
    };

    expect(
      screen.getByText(`${item.ticketName} - ${item.date}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`1 Adulto: ${centsToText(item.tickets[0].value)}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`1 Criança: ${centsToText(item.tickets[1].value)}`),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(`${centsToText(calculateItemPrice())}`)[0],
    ).toBeInTheDocument();
  });
});
