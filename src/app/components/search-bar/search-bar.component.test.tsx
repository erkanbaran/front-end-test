import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBarComponent from "./search-bar.component";

jest.mock("next/navigation");

const mockPush = jest.fn();

describe("SearchBar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const useRouter = jest.spyOn(require("next/navigation"), "useRouter");

    useRouter.mockImplementation(() => ({
      push: mockPush,
    }));
  });

  it("should have submit button", () => {
    render(<SearchBarComponent />);

    const button = screen.getByRole("button", {
      name: /Find Holidays/i,
    });

    expect(button).toBeInTheDocument();
  });

  // it("should be able to add text to the input", async () => {
  //   render(<SearchBarComponent />);

  //   const input = screen.getByPlaceholderText("Where To?");
  //   await userEvent.type(input, "London");

  //   expect(input).ToHaveValue("London");
  // });
});
