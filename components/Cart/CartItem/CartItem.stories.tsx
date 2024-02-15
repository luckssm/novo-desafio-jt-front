import { Meta, StoryObj } from "@storybook/react";
import CartItem from "./index";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";

const meta = {
  title: "Cart/CartItem",
  component: CartItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CartItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Item: Story = {
  args: {
    item: {
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
    },
    index: 0,
  },
  decorators: [
    (Story) => {
      return (
        <Provider store={store}>
          <div className="bg-graygray-05 p-6">{Story()}</div>
        </Provider>
      );
    },
  ],
};
