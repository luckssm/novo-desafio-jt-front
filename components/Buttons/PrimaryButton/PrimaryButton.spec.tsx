import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import PrimaryButton from "./PrimaryButton";

describe("PrimaryButton", () => {
  it("should render the Primary Button with the button text", () => {
    render(<PrimaryButton buttonText="Saiba mais" onButtonClick={() => {}} />);

    expect(screen.getByText("Saiba mais")).toBeInTheDocument();
  });
});
