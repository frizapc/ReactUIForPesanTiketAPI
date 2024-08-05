import React, { useState, useEffect } from "react";
import EventCard from "../../elements/eventCard";
import { getEvents } from "../../apis/ticketEvent";

function Event() {
  const [result, setResult] = useState({ data: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getEvents().then((res) => {
      setResult(res);
      setLoading(true);
    });
    return () => {
      setLoading(false)
    }
  }, []);
  
  const events = result.data;
  const cards = events.map((event) => <EventCard event={event} key={event.id} />);

  return (
    <>
      <div className="d-flex justify-content-evenly flex-wrap p-3">
        {loading ? (
          cards
        ) : (
          <h1>
            <span className="spinner-border text-secondary"></span>Loarding...
          </h1>
        )}
      </div>
    </>
  );
}

export default Event;
