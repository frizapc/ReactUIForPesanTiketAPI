import LoginForm from "../../elements/loginForm";
import { getUser, login } from "../../apis/ticketEvent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({setIsLogin}) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function authenticatedUser() {
      const result = await getUser();
      if (result.message === "Unauthenticated.") {
        setLoading(true);
        setIsLogin(false);
        return navigate("/login", { replace: true });
      }
      setIsLogin(true);
      return navigate("/dashboard", { replace: true });
    }
    authenticatedUser();
  }, [navigate, setIsLogin]);

  return (
    <>
      <div className="d-flex justify-content-evenly p-3">
        {loading ? (
          <LoginForm loginFunc={login} />
        ) : (
          <h1>
            <span className="spinner-border text-secondary"></span>Loading...
          </h1>
        )}
      </div>
    </>
  );
}

export default Login;
