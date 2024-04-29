import { Suspense } from "react";
import SearchResultsComponent from "../components/search-results/search-results.component";
import SearchBarComponent from "../components/search-bar/search-bar.component";
import Loading from "./loading";

export default function Results({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const location = (searchParams?.location as string) || "";
  const departureDate = (searchParams?.departureDate as string) || "";

  return (
    <>
      <h1>Search results</h1>

      <SearchBarComponent />

      <Suspense key={location + departureDate} fallback={<Loading />}>
        <SearchResultsComponent searchParams={searchParams} />
      </Suspense>
    </>
  );
}
