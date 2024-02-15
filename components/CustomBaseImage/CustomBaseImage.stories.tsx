import { Meta, StoryObj } from "@storybook/react";
import CustomBaseImage from "./CustomBaseImage";

const meta = {
  title: "Images/CustomBaseImage",
  component: CustomBaseImage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CustomBaseImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Image: Story = {
  args: {
    src: "/static/images/attraction-1.png",
    alt: "Atração 1",
  },
};

export const ImageFixedWidth: Story = {
  args: {
    src: "/static/images/attraction-1.png",
    alt: "Atração 1",
    width: 200,
  },
};
