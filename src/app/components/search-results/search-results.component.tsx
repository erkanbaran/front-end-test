import { BookingResponse, Holiday } from "@/types/booking";
import { Rooms } from "@/utils/composition.service";
import SearchResultsFilterComponent from "../search-results-filter/search-results-filter.component";
import styles from "./search-results.module.css";

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

      <ul className={styles.list}>
        {listOfHolidays.map(
          ({ hotel, pricePerPerson, totalPrice }: Holiday, index) => (
            <li key={index}>
              <article className={styles.listItem}>
                <figure className={styles.resultFigure}>
                  <img
                    className={styles.resultImage}
                    src={hotel.content.images[0].RESULTS_CAROUSEL.url}
                    alt={hotel.name}
                  />
                </figure>
                <div className={styles.contentWrapper}>
                  <section>
                    <h1 className={styles.hotelName}>{hotel.name}</h1>
                    <span>{hotel.content.parentLocation}</span>
                    {hotel.content.hotelFacilities.length !== 0 && (
                      <div>
                        <h4>Amenities</h4>
                        <ul className={styles.facilitiesList}>
                          {hotel.content.hotelFacilities
                            .slice(0, 5)
                            .map((facility: string, index) => (
                              <li key={index}>{facility}</li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </section>
                  <footer className={styles.contentFooter}>
                    <div className={styles.priceWrapper}>
                      <span className={styles.pricePp}>
                        £{pricePerPerson}pp
                      </span>
                      <span className={styles.priceTotal}>
                        £{totalPrice} total
                      </span>
                    </div>
                    {hotel.content.starRating && (
                      <span>{hotel.content.starRating} star facility</span>
                    )}
                  </footer>
                </div>
              </article>
            </li>
          )
        )}
      </ul>
    </section>
  );
}
