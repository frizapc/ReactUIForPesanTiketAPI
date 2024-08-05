import { Link } from "react-router-dom";
import UserEvents from "./userEvents";
import UserTickets from "./userTickets";
function UserCard({ user }) {
  const name = user.name;
  const user_events = user.user_events.map((event) => (
    <UserEvents event={event} key={event.id} />
  ));
  const user_tickets = user.user_tickets.map((ticket) => (
    <UserTickets ticket={ticket} key={ticket.id} />
  ));
  return (
    <>
      <div className=" container-fluid card mb-3 mx-sm-0 mx-md-5">
        <div className="card-body mb-3 text-center">
          <h1 className="card-title">Hi! {name}</h1>
          <h2 className="card-text">Welcome back!</h2>
        </div>
        <div className="card-body mb-4 mx-5 p-0" style={{ maxWidth: "1200px" }}>
          <h2 className="card-text">Acaramu :</h2>
          <div className="row gap-4">{user_events}</div>
        </div>
        <div className="card-body mb-4 mx-5 p-0" style={{ maxWidth: "1200px" }}>
          <h2 className="card-text">Tiketmu :</h2>
          <div className="row gap-4">{user_tickets}</div>
        </div>
      </div>
        <Link
          className="nav-link text-white btn badge-lg bg-success position-fixed bottom-0 end-0 my-5 mx-3 p-2"
          aria-disabled="true"
          to="/event/create"
          style={{ zIndex: 1 }}
        >
          Event Baru
        </Link>
    </>
  );
}

export default UserCard;
