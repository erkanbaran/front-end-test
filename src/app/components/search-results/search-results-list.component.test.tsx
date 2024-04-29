import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SearchResultsListComponent from "./search-results-list.component";
import { Holiday } from "@/types/booking";

const mockData = [
  {
    totalPrice: 1388.55,
    pricePerPerson: 694.27,
    hotel: {
      id: "H1848",
      name: "Holiday Inn Orlando SW Celebration",
      content: {
        name: "Holiday Inn Orlando SW Celebration",
        parentLocation: "Kissimmee, Orlando",
        images: [
          {
            RESULTS_CAROUSEL: {
              url: "//d3hk78fplavsbl.cloudfront.net/assets/common-prod/hotel/205/h1848/h1848-1-results_carousel.jpg?version=5",
            },
            MOBILE_MAIN: {
              url: "//d3hk78fplavsbl.cloudfront.net/assets/common-prod/hotel/300/h1848/h1848-1-mobile_main.jpg?version=5",
            },
            IMAGE_DESCRIPTION: "",
          },
        ],
        hotelFacilities: [
          "Restaurant",
          "Bar",
          "No Smoking",
          "Free Parking",
          "Fitness Centre/Gym",
          "Laundry Service",
          "Games Room",
          "Internet Access",
          "Free transport to theme parks",
          "Swimming Pool",
          "Whirlpool",
        ],
        starRating: "3",
      },
    },
    departureDate: "2024-05-09",
    selectedDate: "2024-05-09",
  },
  {
    totalPrice: 1388.55,
    pricePerPerson: 694.27,
    hotel: {
      id: "H1848",
      name: "Disney's Grand Floridian Resort & Spa",
      content: {
        name: "Holiday Inn Orlando SW Celebration",
        parentLocation: "Kissimmee, Orlando",
        images: [
          {
            RESULTS_CAROUSEL: {
              url: "//d3hk78fplavsbl.cloudfront.net/assets/common-prod/hotel/205/h1848/h1848-1-results_carousel.jpg?version=5",
            },
            MOBILE_MAIN: {
              url: "//d3hk78fplavsbl.cloudfront.net/assets/common-prod/hotel/300/h1848/h1848-1-mobile_main.jpg?version=5",
            },
            IMAGE_DESCRIPTION: "",
          },
        ],
        hotelFacilities: [
          "Restaurant",
          "Bar",
          "No Smoking",
          "Free Parking",
          "Fitness Centre/Gym",
          "Laundry Service",
          "Games Room",
          "Internet Access",
          "Free transport to theme parks",
          "Swimming Pool",
          "Whirlpool",
        ],
        starRating: "3",
      },
    },
    departureDate: "2024-05-09",
    selectedDate: "2024-05-09",
  },
];

describe("SearchResultsList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render No result found! when the array is empty", () => {
    render(<SearchResultsListComponent holidaysList={[]} />);

    const message = screen.getByText("No result found!");

    expect(message).toBeInTheDocument();
  });

  it("should render a list with the correct number of items", () => {
    render(<SearchResultsListComponent holidaysList={mockData as Holiday[]} />);

    const holidayArray = screen.getAllByRole("article");

    expect(holidayArray.length).toBe(2);
  });

  it("should render the list in the correct order", () => {
    render(<SearchResultsListComponent holidaysList={mockData as Holiday[]} />);

    const firstItem = screen.getAllByRole("article")[0];

    expect(firstItem).toHaveTextContent("Holiday Inn Orlando SW Celebration");
  });
});
