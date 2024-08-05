import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginForm({ loginFunc }) {
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function submitUser(event) {
    event.preventDefault();
    const loginstatus = await loginFunc(email, password);

    switch (loginstatus.message) {
      case "Request failed with status code 422":
        const message = loginstatus.response.data.errors;
        console.log(loginstatus);
        if ("email" in message) {
          setEmailMessage(message.email[0]);
        } else {
          setEmailMessage("");
        }
        if ("password" in message) {
          setPasswordMessage(message.password[0]);
        } else {
          setPasswordMessage("");
        }
        break;
      case "Request failed with status code 401":
        setEmailMessage("");
        setPasswordMessage("Password Salah");
        break;
      case "Network Error":
        console.log(loginstatus.message);
        break;
      default:
        const data = loginstatus.data;
        Cookies.set("userToken", data.user);
        setEmailMessage("");
        setPasswordMessage("");
        navigate("/dashboard");
    }
  }

  return (
    <>
      <form
        className="d-flex flex-column justify-content-evenly p-3"
        style={{ width: "22rem" }}
      >
        <div className="my-3 mx-auto">
          <h1>Login Page</h1>
        </div>

        <div className="mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10 w-100">
            <input
              type="email"
              className={"form-control " + (emailMessage ? "is-invalid" : "")}
              id="inputEmail3"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="invalid-feedback">
              {emailMessage ?? emailMessage}
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10  w-100">
            <input
              type="password"
              className={
                "form-control " + (passwordMessage ? "is-invalid" : "")
              }
              id="inputPassword3"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="invalid-feedback">
              {passwordMessage ?? passwordMessage}
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" onClick={submitUser}>
          Login
        </button>
      </form>
    </>
  );
}

export default LoginForm;
