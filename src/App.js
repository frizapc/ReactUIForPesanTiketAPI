import { useState } from "react";
import Footer from "./components/footers/footer";
import Header from "./components/headers/header";
import Main from "./components/mains/main";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <Header isLogin={isLogin} />
      <Main isLogin={isLogin} setIsLogin={setIsLogin} />
      <Footer />
    </>
  );
}

export default App;
