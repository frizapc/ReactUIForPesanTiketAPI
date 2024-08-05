import { useParams } from "react-router-dom";
import { getOneEvent } from "../../apis/ticketEvent";
import { useEffect, useState } from "react";
import EventDetailCard from "../../elements/eventDetailCard";

function EventDetail() {
  const { eventId } = useParams();
  const [event, setEvent] = useState({ data: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getOneEvent(eventId).then((res) => {
      setEvent(res.data);
      setLoading(true)
    });
  }, [eventId]);

  return (
    <>
      <div className="d-flex justify-content-evenly p-3">
        {loading ? (
          <EventDetailCard event={event} />
        ) : (
          <h1>
            <span className="spinner-border text-secondary"></span>Loarding...
          </h1>
        )}
      </div>
    </>
  );
}

export default EventDetail;
