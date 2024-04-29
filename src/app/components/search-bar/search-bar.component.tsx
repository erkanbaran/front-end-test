"use client";

import { BookingRequest, PartyComposition } from "@/types/booking";
import { DateTime } from "luxon";
import { DATE_FORMATS } from "@/utils/constants";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./search-bar.module.css";

export enum SearchKeys {
  Location = "location",
  DepartureDate = "departureDate",
}

export default function SearchBarComponent() {
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const mockRequest: BookingRequest = {
    bookingType: "holiday",
    location: "orlando",
    departureDate: DateTime.now()
      .plus({ days: 7, months: 1 })
      .toFormat(DATE_FORMATS.URL_DATE),
    direct: false,
    duration: "7",
    gateway: "LHR",
    partyCompositions: [
      {
        adults: 2,
        childAges: [],
        infants: 0,
      },
    ],
  };

  const onSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const formProps = Object.fromEntries(formData);

    if (!formProps[SearchKeys.Location] || !formProps[SearchKeys.DepartureDate])
      return;

    let departureDate = DateTime.fromISO(
      formProps[SearchKeys.DepartureDate].toString()
    ).toFormat(DATE_FORMATS.URL_DATE);

    push(
      `/results?bookingType=${mockRequest?.bookingType}&location=${
        formProps[SearchKeys.Location]
      }&gateway=${
        mockRequest?.gateway
      }&departureDate=${departureDate}&duration=${
        mockRequest?.duration
      }${mockRequest?.partyCompositions
        ?.map(
          (party: PartyComposition, i: number) =>
            `&partyCompositions=a${party?.adults}`
        )
        .join("&")}`
    );
  };

  return (
    <form onSubmit={onSearch} name="search-bar" className={styles.searchForm}>
      <div>
        <label htmlFor={SearchKeys.Location} className={styles.formLabel}>
          Location
        </label>
        <input
          type="text"
          name={SearchKeys.Location}
          id={SearchKeys.Location}
          placeholder="Where To?"
          required
          className={styles.formInput}
          defaultValue={searchParams.get(SearchKeys.Location)?.toString()}
        />
      </div>
      <div>
        <label htmlFor={SearchKeys.DepartureDate} className={styles.formLabel}>
          Departure Date
        </label>
        <input
          type="date"
          name={SearchKeys.DepartureDate}
          id={SearchKeys.DepartureDate}
          required
          className={styles.formInput}
          defaultValue={DateTime.fromFormat(
            searchParams.get(SearchKeys.DepartureDate)?.toString() || "",
            DATE_FORMATS.URL_DATE
          ).toFormat(DATE_FORMATS.INPUT_DATE)}
        />
      </div>
      <button type="submit" className={styles.formButton}>
        <span>Find Holidays</span>
      </button>
    </form>
  );
}
