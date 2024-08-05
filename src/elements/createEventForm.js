import { useState, useRef } from "react";
import { insertEvent } from "../apis/ticketEvent";
import { useNavigate } from "react-router-dom";
import CallAlert from "./alert";

function CreateEventForm() {
  const [alert, setAlert] = useState(null);
  const [titleMessage, setTitleMessage] = useState("");
  const [locationMessage, setLocationMessage] = useState("");
  const [start_timeMessage, setStart_timeMessage] = useState("");
  const [end_timeMessage, setEnd_timeMessage] = useState("");
  const [descriptionMessage, setDescriptionMessage] = useState("");
  const [pictureMessage, setPictureMessage] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [start_time, setStart_time] = useState("");
  const [end_time, setEnd_time] = useState("");
  const [description, setDescription] = useState("");
  let pictureInput = useRef(null);
  const navigate = useNavigate();

  async function submitEvent(event) {
    event.preventDefault();
    setAlert(null);
    const eventData = {
      title,
      location,
      start_time,
      end_time,
      description,
      picture: pictureInput.files[0],
    };
    const response = await insertEvent(eventData);
    
    switch (response.message) {
      case "Request failed with status code 422":
        const message = response.response.data.errors;
        if ("title" in message) {
          setTitleMessage(message.title[0]);
        } else {
          setTitleMessage("");
        }
        if ("location" in message) {
          setLocationMessage(message.location[0]);
        } else {
          setLocationMessage("");
        }
        if ("start_time" in message) {
          setStart_timeMessage(message.start_time[0]);
        } else {
          setStart_timeMessage("");
        }
        if ("end_time" in message) {
          setEnd_timeMessage(message.end_time[0]);
        } else {
          setEnd_timeMessage("");
        }
        if ("description" in message) {
          setDescriptionMessage(message.description[0]);
        } else {
          setDescriptionMessage("");
        }
        if ("picture" in message) {
          setPictureMessage(message.picture[0]);
        } else {
          setPictureMessage("");
        }
        break;
      case "Request failed with status code 401":
        navigate("/login");
        break;
      case "Network Error":
        console.log(response.message);
        break;
      default:
        const data = response.data;
        setAlert(<CallAlert status="success" message={data.message} />);
        setTitleMessage("");
        setLocationMessage("");
        setStart_timeMessage("");
        setEnd_timeMessage("");
        setDescriptionMessage("");
        setPictureMessage("");
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
          <h1>Event Baru</h1>
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
              className={
                "form-control " + (locationMessage ? "is-invalid" : "")
              }
              onChange={(e) => setLocation(e.target.value)}
              id="location"
            />
            <div className="invalid-feedback">
              {locationMessage ?? locationMessage}
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="start_time" className="col-sm-2 col-form-label">
            Mulai :
          </label>
          <div className="col-sm-10 w-100">
            <input
              type="datetime-local"
              className={
                "form-control " + (start_timeMessage ? "is-invalid" : "")
              }
              onChange={(e) => setStart_time(e.target.value)}
              id="start_time"
            />
            <div className="invalid-feedback">
              {start_timeMessage ?? start_timeMessage}
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="end_time" className="col-sm-2 col-form-label">
            Selesai :
          </label>
          <div className="col-sm-10 w-100">
            <input
              type="datetime-local"
              className={
                "form-control " + (end_timeMessage ? "is-invalid" : "")
              }
              onChange={(e) => setEnd_time(e.target.value)}
              id="end_time"
            />
            <div className="invalid-feedback">
              {end_timeMessage ?? end_timeMessage}
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="col-sm-2 col-form-label">
            Deskripsi :
          </label>
          <div className="col-sm-10 w-100">
            <textarea
              className={
                "form-control " + (descriptionMessage ? "is-invalid" : "")
              }
              onChange={(e) => setDescription(e.target.value)}
              id="description"
            ></textarea>
            <div className="invalid-feedback">
              {descriptionMessage ?? descriptionMessage}
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="picture" className="form-label">
            Thumbnail
          </label>
          <input
            className={"form-control " + (pictureMessage ? "is-invalid" : "")}
            type="file"
            id="picture"
            ref={(input) => (pictureInput = input)}
          />
          <div className="invalid-feedback">
            {pictureMessage ?? pictureMessage}
          </div>
        </div>

        <button type="submit" className="btn btn-primary" onClick={submitEvent}>
          Submit
        </button>
      </form>
    </>
  );
}
export default CreateEventForm;
