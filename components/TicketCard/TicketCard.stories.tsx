import { Meta, StoryObj } from "@storybook/react";
import TicketCard from "./index";

const meta = {
  title: "Tickets/TicketCard",
  component: TicketCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TicketCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Item: Story = {
  args: {
    attractionImage: "/static/images/attraction-1.png",
    attractionImageAlt: "Atração 1",
    attractionLocation: "Local da Atração",
    attractionPriceBefore: 2430.33,
    attractionPriceNow: 1999.99,
    attractionRatingCount: 332,
    attractionRatingValue: 4.3,
    attractionTitle: "Nome da Atração",
  },
  decorators: [
    (Story) => {
      return <div className="bg-graygray-05 p-6">{Story()}</div>;
    },
  ],
};
