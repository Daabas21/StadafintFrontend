import { useState } from "react";
import NavbarStart from "./components/layout/NavbarStart";
import NavbarAdmin from "./components/layout/NavbarAdmin";
import NavbarCleaner from "./components/layout/NavbarCleaner";
import NavbarCustomer from "./components/layout/NavbarCustomer";
import AppRouter from "./components/routes";

function App() {
  const [login, logout] = useState({ loginStatus: false, roll: "admin" });
  const [roll, setRoll] = useState({ roll: "admin", id: "" });

  return (
    <div className="App">
      {login.loginStatus === false ? <NavbarStart /> : ""}
      {login.loginStatus === true && login.roll === "admin" ? (
        <NavbarAdmin />
      ) : (
        ""
      )}
      {login.loginStatus === true && login.roll === "cleaner" ? (
        <NavbarCleaner />
      ) : (
        ""
      )}
      {login.loginStatus === true && login.roll === "customer" ? (
        <NavbarCustomer />
      ) : (
        ""
      )}

      <AppRouter />
    </div>
  );
}

export default App;
