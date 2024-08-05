import { Link } from "react-router-dom";

function EventCard({ event }) {
  const { id, picture, title, available, description } = event;
  const urlDetail = `/event/${id}`;

  return (
    <>
      <div className="card m-3" style={{ width: "18rem" }}>
        <img
          src={`${picture}?${new Date().getTime()}`}
          className="card-img-top"
          alt={title}
        />
        <div className="card-body">
          <h5 className="card-title">
            {title} {" "}
            {available ? (
              <span className="badge rounded-pill text-bg-success">Dibuka</span>
            ) : (
              <span className="badge rounded-pill text-bg-danger">Ditutup</span>
            )}
          </h5>
          <p className="card-text">{description}</p>
          <button type="button" className="btn btn-primary d-block m-auto w-50">
            <Link className="navbar-brand" to={urlDetail}>
              Rincian
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default EventCard;
