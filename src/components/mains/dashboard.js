import { getUser } from "../../apis/ticketEvent";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserCard from "../../elements/userCard";

function Dashboard({setIsLogin}) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function authenticatedUser() {
      const result = await getUser();
      if (result.message === "Unauthenticated.") {
        setIsLogin(false);
        return navigate("/login", { replace: true });
      }
      setUser(result);
      setLoading(true);
      setIsLogin(true);
    }
    authenticatedUser();
  }, [navigate, setIsLogin]);

  return (
    <>
      <div className="d-flex justify-content-evenly p-3">
        {loading ? (
          <UserCard user={user.user} />
        ) : (
          <h1>
            <span className="spinner-border text-secondary"></span>Loading...
          </h1>
        )}
      </div>
    </>
  );
}

export default Dashboard;
