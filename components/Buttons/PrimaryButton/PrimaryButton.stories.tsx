import { Meta, StoryObj } from "@storybook/react";
import PrimaryButton from "./PrimaryButton";

const meta = {
  title: "Buttons/PrimaryButton",
  component: PrimaryButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PrimaryButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    buttonText: "Saber mais",
  },
};

export const PrimaryWithIcon: Story = {
  args: {
    buttonText: "Saber mais",
    iconType: "right-arrow",
  },
};

export const PrimaryLoading: Story = {
  args: {
    buttonText: "Saber mais",
    isLoading: true,
  },
  decorators: [
    (Story) => {
      return <div className="w-32">{Story()}</div>;
    },
  ],
};
