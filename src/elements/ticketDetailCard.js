import { Link } from "react-router-dom";
import CallAlert from "./alert";

function TicketDetailCard({ ticket }) {
  let { qr_img, status, event, user } = ticket;
  let { id, title, location, start_time, end_time } = event;
  let { name } = user;
  return (
    <>
      <CallAlert status={'warning'} message={'Harap segera klik tombol registrasi pada tiket jika status masih "Dibeli"'}></CallAlert>
      <div
        className="col-md-6 col-sm-12 container-fluid card mb-3 p-0"
        style={{ maxWidth: "1000px" }}
      >
        <div className="row g-0">
          <div className="col-md-4 m-auto">
            <img
              src={qr_img}
              className="img-fluid rounded-start img-thumbnail"
              alt={qr_img}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">
                <Link className="navbar-brand" to={`/event/${id}`}>
                  {title} 📍{location}
                </Link>
              </h5>
              <h5 className="card-text">Pemilik : {name}</h5>
              <h5 className="card-text">
                Status Tiket:{" "}
                <span className="badge rounded-pill text-bg-info">
                  {status}
                </span>
              </h5>
              <p className="card-text">Mulai Pada: {start_time}</p>
              <p className="card-text">Selesai Pada: {end_time}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TicketDetailCard;
