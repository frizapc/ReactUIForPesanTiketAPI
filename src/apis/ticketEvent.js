import axios from "axios";
import Cookies from "js-cookie";

async function getEvents() {
  return fetch("http://127.0.0.1:8000/api/events", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
}

async function getOneEvent(eventId) {
  return axios
    .get(`http://127.0.0.1:8000/api/events/${eventId}`)
    .then((response) => response)
    .then((response) => response.data)
    .catch((errors) => {
      return errors;
    });
}

async function insertEvent(eventData) {
  const formData = new FormData();
  formData.append("title", eventData.title);
  formData.append("location", eventData.location);
  formData.append("start_time", eventData.start_time);
  formData.append("end_time", eventData.end_time);
  formData.append("description", eventData.description);
  formData.append("picture", eventData.picture);
  return axios
    .post("http://127.0.0.1:8000/api/events", formData, {
      headers: { Authorization: `Bearer ${Cookies.get("userToken")}` },
    })
    .then((response) => response)
    .catch((errors) => {
      return errors;
    });
}

async function updateEvent(eventData, eventId) {
  const formData = new FormData();
  formData.append("title", eventData.title);
  formData.append("location", eventData.location);
  formData.append("start_time", eventData.start_time);
  formData.append("end_time", eventData.end_time);
  formData.append("description", eventData.description);
  formData.append("picture", eventData.picture);

  return axios
    .post(`http://127.0.0.1:8000/api/events/${eventId}?_method=PUT`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("userToken")}`,
      },
    })
    .then((response) => response)
    .catch((errors) => {
      return errors;
    });
}

async function deleteOneEvent(eventId) {
  return axios
    .delete(`http://127.0.0.1:8000/api/events/${eventId}`, {
      headers: { Authorization: `Bearer ${Cookies.get("userToken")}` },
    })
    .then((response) => response)
    .then((response) => response.data)
    .catch((errors) => {
      return errors;
    });
}

async function organizerCheckin(eventId) {
  return axios
    .post(`http://127.0.0.1:8000/api/events/${eventId}/check-in`, [], {
      headers: { Authorization: `Bearer ${Cookies.get("userToken")}` },
    })
    .then((response) => response)
    .then((response) => response)
    .catch((errors) => {
      return errors;
    });
}

async function purchaseEvent(eventId) {
  return axios
    .post(`http://127.0.0.1:8000/api/tickets/event/${eventId}`, [], {
      headers: { Authorization: `Bearer ${Cookies.get("userToken")}` },
    })
    .then((response) => response)
    .then((response) => response.data)
    .catch((errors) => {
      return errors.response;
    });
}

async function getTicket(ticketId) {
  return axios
    .get(`http://127.0.0.1:8000/api/tickets/${ticketId}`, {
      headers: { Authorization: `Bearer ${Cookies.get("userToken")}` },
    })
    .then((response) => response)
    .then((response) => response.data)
    .catch((errors) => {
      console.log(errors);
    });
}

async function attendeRegister(eventId) {
  return axios
    .post(`http://127.0.0.1:8000/api/events/${eventId}/register`, [], {
      headers: { Authorization: `Bearer ${Cookies.get("userToken")}` },
    })
    .then((response) => response)
    .then((response) => response.data)
    .catch((errors) => {
      return errors;
    });
}

async function login(email, password) {
  return axios
    .post(
      "http://127.0.0.1:8000/api/auth/login",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((errors) => {
      return errors;
    });
}

async function getUser() {
  return fetch("http://127.0.0.1:8000/api/user", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${Cookies.get("userToken")}`,
    },
  })
    .then((response) => response.json())
    .then((response) => response)
    .catch((errors) => {
      return errors;
    });
}

async function logout() {
  return fetch("http://127.0.0.1:8000/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${Cookies.get("userToken")}`,
    },
    method: "POST",
  })
    .then((response) => response.json())
    .then((response) => {
      Cookies.remove("userToken");
      return response;
    })
    .catch((errors) => {
      return errors;
    });
}

export {
  getEvents,
  getOneEvent,
  insertEvent,
  updateEvent,
  deleteOneEvent,
  organizerCheckin,
  purchaseEvent,
  attendeRegister,
  getTicket,
  login,
  getUser,
  logout,
};
