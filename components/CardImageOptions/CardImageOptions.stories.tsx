import { Meta, StoryObj } from "@storybook/react";
import CardImageOptions from "./index";

const meta = {
  title: "Cards/CardImageOptions",
  component: CardImageOptions,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      return (
        <div className="relative">
          <div className="h-[200px] w-[200px] bg-graygray-60"></div>
          {Story()}
        </div>
      );
    },
  ],
} satisfies Meta<typeof CardImageOptions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardImage: Story = {};
