import { Link } from "react-router-dom";
import { logout } from "../../apis/ticketEvent";

function Navigation({ isLogin }) {
  return (
    <>
      <nav
        className="navbar bg-dark border-bottom border-body navbar-expand-md p-3"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            TON-TON
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  aria-disabled="true"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  aria-disabled="true"
                  to="/events"
                >
                  Event
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  aria-disabled="true"
                  to="/populer"
                >
                  Populer
                </Link>
              </li>
              <li className="nav-item">
                {isLogin ? (
                  <Link
                    className="nav-link text-white"
                    aria-disabled="true"
                    onClick={() => {
                      logout();
                    }}
                    to="/login"
                  >
                    Logout
                  </Link>
                ) : (
                  <Link
                    className="nav-link text-white"
                    aria-disabled="true"
                    to="/login"
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
