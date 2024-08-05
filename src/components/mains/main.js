import { Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard";
import Event from "./event";
import EventDetail from "./eventDetail";
import Populer from "./populer";
import Login from "./login";
import CreateEvent from "./createEvent";
import UpdateEvent from "./updateEvent";
import TicketDetail from "./ticketDetail";

function Main({ isLogin, setIsLogin }) {
  return (
    <>
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Dashboard setIsLogin={setIsLogin} />} />
          <Route
            path="/dashboard"
            element={<Dashboard setIsLogin={setIsLogin} />}
          />
          <Route path="/events" element={<Event />} />
          <Route
            path="/event/create"
            element={
              <CreateEvent isLogin={isLogin} setIsLogin={setIsLogin} />
            }
          />
          <Route path="/event/:eventId" element={<EventDetail />} />
          <Route path="/event/edit/:eventId" element={<UpdateEvent />} />
          <Route path="/tickets/:ticketId" element={<TicketDetail />} />
          <Route path="/populer" element={<Populer />} />
          <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
          <Route path="/*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </main>
    </>
  );
}

export default Main;
