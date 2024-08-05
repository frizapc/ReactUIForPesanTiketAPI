import { useParams } from "react-router-dom";
import { getTicket } from "../../apis/ticketEvent";
import { useEffect, useState } from "react";
import TicketDetailCard from "../../elements/ticketDetailCard";

function TicketDetail() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState({ data: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTicket(ticketId).then((res) => {
      setTicket(res.data);
      setLoading(true);
    });
  }, [ticketId]);

  return (
    <>
      <div className="d-flex flex-column justify-content-evenly align-items-center p-3">
        {loading ? (
          <TicketDetailCard ticket={ticket} />
        ) : (
          <h1>
            <span className="spinner-border text-secondary"></span>Loarding...
          </h1>
        )}
      </div>
    </>
  );
}

export default TicketDetail;
