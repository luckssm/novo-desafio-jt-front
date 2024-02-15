import { Meta, StoryObj } from "@storybook/react";
import SecondaryButton from "./SecondaryButton";

const meta = {
  title: "Buttons/SecondaryButton",
  component: SecondaryButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      return (
        <div className="bg-graygray-60 w-64 h-32 flex items-center justify-center">
          <div className="w-32">{Story()}</div>
        </div>
      );
    },
  ],
} satisfies Meta<typeof SecondaryButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Secondary: Story = {
  args: {
    buttonText: "Saber mais",
  },
};
