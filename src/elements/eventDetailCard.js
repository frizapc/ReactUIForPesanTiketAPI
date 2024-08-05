import moment from "moment";
import { purchaseEvent } from "../apis/ticketEvent";
import CallAlert from "./alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EventDetailCard({ event }) {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  let {
    id,
    picture,
    title,
    description,
    location,
    start_time,
    end_time,
    available,
    organizer,
  } = event;

  start_time = moment(start_time, "YYYY-MM-DD HH:mm:ss").format(
    "HH:mm DD-MMM-YYYY"
  );
  end_time = moment(end_time, "YYYY-MM-DD HH:mm:ss").format(
    "HH:mm DD-MMM-YYYY"
  );

  async function makePurchase() {
    const result = await purchaseEvent(id);
    switch (result.status) {
      case 409:
        setAlert(<CallAlert status="danger" message={result.data.message} />);
        break;
      case 401:
        navigate("/login");
        break;
      default:
        setAlert(<CallAlert status="success" message={result.message} />);
        break;
    }
  }

  return (
    <>
      <div className="card mb-3">
        <img
          src={picture}
          className="card-img-top"
          alt={title}
          style={{ maxWidth: "900px" }}
        />
        <div className="card-body">
          <h5 className="card-title">
            {title} - 📍{location}
          </h5>
          <p className="card-text">{description}</p>
          <p className="card-text">Penyelenggara: {organizer.name}</p>
          <p className="card-text">Mulai: {start_time}</p>
          <p className="card-text">Selesai: {end_time}</p>
          <p className="card-text">
            Status:{" "}
            {available ? (
              <span className="badge rounded-pill text-bg-success">Dibuka</span>
            ) : (
              <span className="badge rounded-pill text-bg-danger">Ditutup</span>
            )}
          </p>
          <button
            type="button"
            className="btn btn-primary d-block mt-5 mx-auto w-50"
            disabled={!available}
            onClick={makePurchase}
          >
            Pesan Tiket
          </button>
          {alert ?? alert}
        </div>
      </div>
    </>
  );
}

export default EventDetailCard;
