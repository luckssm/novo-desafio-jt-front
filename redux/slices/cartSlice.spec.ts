import cartSlice from "./cartSlice";
import { addItemsToCart, removeCartItem } from "./cartSlice";
import { CartItem } from "../../components/Cart/CartItem";

const cartItem1: CartItem = {
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
};

const cartItem2: CartItem = {
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
};

describe("CartSlice", () => {
  it("should return initial state", () => {
    expect(cartSlice(undefined, { type: undefined })).toEqual({
      cartItems: [],
    });
  });

  it("should handle an item being added to an empty cart", () => {
    expect(cartSlice(undefined, addItemsToCart(cartItem1))).toEqual({
      cartItems: [cartItem1],
    });
  });

  it("should handle multiple items being added to an empty cart", () => {
    expect(
      cartSlice(
        cartSlice(undefined, addItemsToCart(cartItem2)),
        addItemsToCart(cartItem1),
      ),
    ).toEqual({
      cartItems: [cartItem2, cartItem1],
    });
  });

  it("should handle multiple items being added to an empty cart and then removing one", () => {
    let currentState = cartSlice(undefined, addItemsToCart(cartItem2));
    currentState = cartSlice(currentState, addItemsToCart(cartItem1));
    currentState = cartSlice(currentState, addItemsToCart(cartItem2));

    expect(cartSlice(currentState, removeCartItem(0))).toEqual({
      cartItems: [cartItem1, cartItem2],
    });
  });
});
