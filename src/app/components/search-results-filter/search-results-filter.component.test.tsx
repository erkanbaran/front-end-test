import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchResultsFilterComponent from "./search-results-filter.component";

jest.mock("next/navigation");

const mockPush = jest.fn();

describe("SearchResultsFilter Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const useRouter = jest.spyOn(require("next/navigation"), "useRouter");

    useRouter.mockImplementation(() => ({
      push: mockPush,
    }));
  });

  it("should render at least one checkbox", () => {
    render(<SearchResultsFilterComponent />);

    const checkbox = screen.getAllByRole("checkbox")[0];

    expect(checkbox).toBeInTheDocument();
  });

  it("should call push method when first checkbox clicked", async () => {
    render(<SearchResultsFilterComponent />);

    const checkbox = screen.getAllByRole("checkbox")[0];
    await userEvent.click(checkbox);

    expect(mockPush).toBeCalled();
  });
});
