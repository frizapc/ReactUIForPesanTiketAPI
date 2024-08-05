import moment from "moment";
import { Link } from "react-router-dom";
import { deleteOneEvent, organizerCheckin } from "../apis/ticketEvent";

function UserEvents({ event }) {
  let { id, title, picture, description, start_time, available } = event;
  description = description.slice(0, 100);
  start_time = moment(start_time, "YYYY-MM-DD HH:mm:ss").format(
    "HH:mm DD-MMM-YYYY"
  );
  return (
    <>
      <div
        className="col-md-6 col-sm-12 container-fluid card mb-3 p-0"
        style={{ maxWidth: "540px" }}
      >
        <div className="row g-0">
          <div className="col-md-4 m-auto">
            <img
              src={`${picture}?${new Date().getTime()}`}
              className="img-fluid rounded-start img-thumbnail"
              alt={title}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">
                <Link className="navbar-brand" to={`/event/${id}`}>
                  {title}{" "}
                  {available ? (
                    <span className="badge rounded-pill text-bg-success">
                      Dibuka
                    </span>
                  ) : (
                    <span className="badge rounded-pill text-bg-danger">
                      Ditutup
                    </span>
                  )}
                </Link>
              </h5>
              <p className="card-text">{description}</p>
              <p className="card-text">
                <small className="text-body-secondary">{start_time}</small>
              </p>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-info dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Kelola
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={`/event/edit/${id}`}>
                      Ubah
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      disabled={!available}
                      onClick={async () => {
                        const result = await organizerCheckin(id);
                        if (result.status === 200) {
                          window.location.reload();
                        }
                        
                      }}
                    >
                      Check-In
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={async () => {
                        const result = await deleteOneEvent(id);
                        if (result.status === 200) {
                          window.location.reload();
                        }
                      }}
                    >
                      Hapus
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserEvents;
