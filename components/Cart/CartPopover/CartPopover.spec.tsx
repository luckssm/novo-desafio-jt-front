import {
  fireEvent,
  getByTestId,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { centsToText } from "../../../services/utils/helpers/money";

import CartPopover from "./index";
import { CartItem } from "../CartItem";

describe("CartPopover", () => {
  const cartItems: Array<CartItem> = [
    {
      date: "12/03/2024",
      image: "/static/images/attraction-1.png",
      ticketName: "Nome do Ingresso 1",
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
    },
    {
      date: "12/03/2024",
      image: "/static/images/attraction-1.png",
      ticketName: "Nome do Ingresso 2",
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
    },
  ];

  const calculateItemPrice = (item: CartItem) => {
    return item.tickets.reduce((acc, ticket) => {
      return acc + ticket.value;
    }, 0);
  };

  const calculateCartItemsPrice = () => {
    return cartItems.reduce((acc, item) => {
      return acc + calculateItemPrice(item);
    }, 0);
  };

  const calculateTotalDiscount = () => calculateCartItemsPrice() * 0.07;

  it("should render the Cart Popover with the items information and the correct total price", () => {
    render(
      <Provider store={store}>
        <CartPopover cartItems={cartItems} closePopover={() => {}} />
      </Provider>,
    );

    expect(
      screen.getByText(`${cartItems[0].ticketName} - ${cartItems[0].date}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${cartItems[1].ticketName} - ${cartItems[1].date}`),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(`${centsToText(calculateCartItemsPrice())}`)[0],
    ).toBeInTheDocument();
    expect(
      screen.getByText(`-${centsToText(calculateTotalDiscount())}`),
    ).toBeInTheDocument();
  });
});
