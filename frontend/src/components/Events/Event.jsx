import React from "react";
import styles from "../../styles/style";
import EventCard from "./EventCard.jsx";
import { useSelector } from "react-redux";

const Event = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <div>
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>
          <div className="w-full grid">
            {allEvents && allEvents.length > 0 ? (
              <EventCard data={allEvents[0]} />
            ) : (
              <p className="text-center text-2xl text-gray-500">
                No events available!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Event;
