import { useState, useRef } from "react";
import { updateEvent } from "../apis/ticketEvent";
import { useNavigate } from "react-router-dom";
import CallAlert from "./alert";

function UpdateEventForm({ eventData }) {
  const [alert, setAlert] = useState(null);
  const [titleMessage, setTitleMessage] = useState("");

  const [title, setTitle] = useState(eventData.title);
  const [location, setLocation] = useState(eventData.location);
  const [start_time, setStart_time] = useState(eventData.start_time);
  const [end_time, setEnd_time] = useState(eventData.end_time);
  const [description, setDescription] = useState(eventData.description);
  let pictureInput = useRef("null");
  const navigate = useNavigate();

  async function submitEvent(event) {
    event.preventDefault();
    setAlert(null);
    const newEventData = {
      title,
      location,
      start_time,
      end_time,
      description,
      picture: pictureInput.files[0],
    };
    const response = await updateEvent(newEventData, eventData.id);
    switch (response.message) {
      case "Request failed with status code 422":
        const message = response.response.data;
        if (message.status === 422) {
          setTitleMessage(message.message);
        } else {
          setTitleMessage("");
        }
        break;
      case "Request failed with status code 401":
        navigate("/login");
        break;
      case "Request failed with status code 409":
        setAlert(
          <CallAlert status="danger" message={response.response.data.message} />
        );
        break;
      case "Network Error":
        navigate("/login");
        break;
      default:
        const data = response.data;
        setAlert(<CallAlert status="success" message={data.message} />);
        setTitleMessage("");
    }
  }
  return (
    <>
      <form
        className="d-flex flex-column justify-content-evenly p-3"
        style={{ width: "40rem" }}
      >
        {alert ?? alert}

        <div className="my-3 mx-auto">
          <h1>Edit Event</h1>
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="col-sm-2 col-form-label">
            Judul :
          </label>
          <div className="col-sm-10 w-100">
            <input
              className={"form-control " + (titleMessage ? "is-invalid" : "")}
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              defaultValue={title}
            />
            <div className="invalid-feedback">
              {titleMessage ?? titleMessage}
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="col-sm-2 col-form-label">
            Lokasi :
          </label>
          <div className="col-sm-10 w-100">
            <input
              className="form-control"
              onChange={(e) => setLocation(e.target.value)}
              id="location"
              defaultValue={location}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="start_time" className="col-sm-2 col-form-label">
            Mulai :
          </label>
          <div className="col-sm-10 w-100">
            <input
              type="datetime-local"
              className="form-control"
              onChange={(e) => setStart_time(e.target.value)}
              id="start_time"
              defaultValue={start_time}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="end_time" className="col-sm-2 col-form-label">
            Selesai :
          </label>
          <div className="col-sm-10 w-100">
            <input
              type="datetime-local"
              className="form-control"
              onChange={(e) => setEnd_time(e.target.value)}
              id="end_time"
              defaultValue={end_time}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="col-sm-2 col-form-label">
            Deskripsi :
          </label>
          <div className="col-sm-10 w-100">
            <textarea
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              defaultValue={description}
            ></textarea>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="picture" className="form-label">
            Thumbnail
          </label>
          <input
            className="form-control"
            type="file"
            id="picture"
            ref={(input) => (pictureInput = input)}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={submitEvent}>
          Submit
        </button>
      </form>
    </>
  );
}
export default UpdateEventForm;
