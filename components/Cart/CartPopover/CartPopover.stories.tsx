import { Meta, StoryObj } from "@storybook/react";
import CartPopover from "./index";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";

const meta = {
  title: "Cart/CartPopover",
  component: CartPopover,
  parameters: {},
  tags: ["autodocs"],
} satisfies Meta<typeof CartPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Item: Story = {
  args: {
    cartItems: [
      {
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
      {
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
    ],
  },
  decorators: [
    (Story) => {
      return <Provider store={store}>{Story()}</Provider>;
    },
  ],
};
