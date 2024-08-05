import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../apis/ticketEvent";
import CreateEventForm from "../../elements/createEventForm";

function CreateEvent({ isLogin, setIsLogin }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function authenticatedUser() {
      const result = await getUser();
      if (result.message === "Unauthenticated.") {
        setIsLogin(false);
        return navigate("/login", { replace: true });
      }
      setLoading(true);
      setIsLogin(true);
    }
    authenticatedUser();
  }, [navigate, setIsLogin]);
  return (
    <>
      <div className="d-flex justify-content-evenly p-3">
        {loading ? (
          <CreateEventForm/>
        ) : (
          <h1>
            <span className="spinner-border text-secondary"></span>Loading...
          </h1>
        )}
      </div>
    </>
  );
}

export default CreateEvent;
