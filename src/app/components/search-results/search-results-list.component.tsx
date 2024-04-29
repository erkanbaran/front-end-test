import { Holiday } from "@/types/booking";
import styles from "./search-results-list.module.css";

export default function SearchResultsListComponent({
  holidaysList,
}: {
  holidaysList: Holiday[];
}) {
  if (holidaysList.length === 0) return <div>No result found!</div>;

  return (
    <ul className={styles.list}>
      {holidaysList.map(
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
                    <span className={styles.pricePp}>£{pricePerPerson}pp</span>
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
  );
}
