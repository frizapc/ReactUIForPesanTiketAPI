import Navigation from "./navigation";

function Header ({isLogin}) {
    return (
      <>
        <header className="flex-shrink-0">
          <Navigation isLogin={isLogin} />
        </header>
      </>
    );
}

export default Header;