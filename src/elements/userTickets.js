import { Link } from "react-router-dom";
import { attendeRegister } from "../apis/ticketEvent";
import { useState } from "react";
import CallAlert from "./alert";

function UserTickets({ ticket }) {
  const [alert, setAlert] = useState(null);
  let { id, qr_img, status, event_id } = ticket;
  return (
    <>
      <div
        className="col-md-6 col-sm-12 container-fluid card mb-3 p-0"
        style={{ maxWidth: "540px" }}
      >
        <div className="row g-0">
          <div
            className="col-md-4 d-flex justify-content-center align-items-center"
            style={{
              backgroundImage: `url(${qr_img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              cursor: "pointer",
              position: "relative",
            }}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(255, 255, 255, 0.7)",
              }}
            ></div>
            <p className="badge rounded-pill text-bg-dark position-relative m-0 p-2">
              Lihat QR
            </p>
          </div>
          <div className="col-md-8">
            <div className="card-body d-flex flex-column gap-1">
              <button type="button" className="btn btn-primary">
                <Link
                  className="navbar-brand"
                  to={`/tickets/${id}`}
                  style={{ zIndex: 1 }}
                >
                  Rincian
                </Link>
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={async () => {
                  const result = await attendeRegister(event_id);
                  if (
                    result.message === "Request failed with status code 403"
                  ) {
                    setAlert(
                      <CallAlert
                        status="danger"
                        message={result.response.data.message}
                      />
                    );
                  } else{
                    window.location.reload()
                  }
                }}
                disabled={status !== "Dibeli" ? true : false}
              >
                Registrasi
              </button>
              <p className="card-text">
                Status:
                <small className="badge rounded-pill text-bg-info">
                  {status}
                </small>
              </p>
              {alert ?? alert}
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                QR Code
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body mx-auto">
              <img
                src={qr_img}
                className="img-fluid rounded-start"
                alt={qr_img}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserTickets;
