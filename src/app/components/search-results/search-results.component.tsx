import { BookingResponse, Holiday } from "@/types/booking";
import { Rooms } from "@/utils/composition.service";
import SearchResultsFilterComponent from "../search-results-filter/search-results-filter.component";
import SearchResultsListComponent from "./search-results-list.component";

async function getData(params: {
  [key: string]: string | string[] | undefined;
}) {
  const body = {
    bookingType: params.bookingType,
    direct: false,
    location: params.location,
    departureDate: params.departureDate,
    duration: params.duration,
    gateway: params.gateway,
    partyCompositions: Rooms.parseAndConvert([
      params.partyCompositions as string,
    ]),
  };

  const res = await fetch(
    "https://www.virginholidays.co.uk/cjs-search-api/search",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function SearchResultsComponent({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const req = await getData(searchParams);
  const results: BookingResponse = req;

  if (results?.holidays?.length === 0) return <div>No result found!</div>;

  let listOfHolidays = results?.holidays;

  let facilitiesFilters: Array<string> = [];
  let starRatingsFilters: Array<string> = [];

  if (searchParams?.facilities) {
    facilitiesFilters = searchParams.facilities.toString().split(",");
  }

  if (facilitiesFilters.length > 0) {
    listOfHolidays = listOfHolidays.filter((item: Holiday) => {
      const itemValue = item["hotel"].content.hotelFacilities;
      return facilitiesFilters.some((filter) => itemValue.includes(filter));
    });
  }

  if (searchParams?.raitings) {
    starRatingsFilters = searchParams.raitings.toString().split(",");
  }

  if (starRatingsFilters.length > 0) {
    listOfHolidays = listOfHolidays.filter((item: Holiday) => {
      const itemValue = item["hotel"].content.starRating as string;
      return starRatingsFilters.some((filter) => itemValue === filter);
    });
  }

  return (
    <section>
      <h2>
        {listOfHolidays.length} results found for {searchParams?.location} on{" "}
        {searchParams?.departureDate}
      </h2>

      <p>Please fill out the filters and results list below&hellip;</p>

      <SearchResultsFilterComponent />

      <SearchResultsListComponent holidaysList={listOfHolidays} />
    </section>
  );
}
