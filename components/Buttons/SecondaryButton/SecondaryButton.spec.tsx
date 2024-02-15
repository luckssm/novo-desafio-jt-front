import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import SecondaryButton from "./SecondaryButton";

describe("SecondaryButton", () => {
  it("should render the Secondary Button with the button text", () => {
    render(
      <SecondaryButton buttonText="Saiba mais" onButtonClick={() => {}} />,
    );

    expect(screen.getByText("Saiba mais")).toBeInTheDocument();
  });
});
