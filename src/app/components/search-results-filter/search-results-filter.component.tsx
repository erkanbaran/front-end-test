"use client";

import { ChangeEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { generateUpdatedURL } from "@/utils/generateUpdatedUrl";
import styles from "./search-results-filter.module.css";

const facilitiesFilters: string[] = [
  "Restaurant",
  "Bar",
  "Fitness Centre/Gym",
  "Laundry Service",
  "Room Service",
  "Spa",
];

const starRatingFilters: string[] = ["5", "4", "3", "2", "1"];

export default function SearchResultsFilterComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  let _facilitiesFilters: Array<string> = [];

  const handleFilterChange = (
    filter: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    _facilitiesFilters = searchParams.get(filter)?.toString().split(",") || [];

    if (event.target.checked) {
      _facilitiesFilters = [..._facilitiesFilters, event.target.value];
    } else {
      _facilitiesFilters = _facilitiesFilters.filter(
        (filterTag) => filterTag !== event.target.value
      );
    }

    const updatedUrl = generateUpdatedURL(pathname, searchParams, {
      [filter]: _facilitiesFilters.join(","),
    });
    router.push(updatedUrl);
  };

  return (
    <section className={styles.filters}>
      <div>
        <h4>Filter by facilities:</h4>

        {facilitiesFilters.length !== 0 && (
          <ul>
            {facilitiesFilters.map((facility, index) => (
              <li key={index}>
                <label htmlFor={facility}>
                  <input
                    type="checkbox"
                    onChange={(event) =>
                      handleFilterChange("facilities", event)
                    }
                    value={facility}
                    id={facility}
                  />
                  <span>{facility}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h4>Filter by starts:</h4>

        {starRatingFilters.length !== 0 && (
          <ul>
            {starRatingFilters.map((raiting, index) => (
              <li key={index}>
                <label htmlFor={raiting}>
                  <input
                    type="checkbox"
                    onChange={(event) => handleFilterChange("raitings", event)}
                    value={raiting}
                    id={raiting}
                  />
                  <span>{raiting}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
