import { useEffect, useState } from "react";
import NavbarStart from "./components/layout/NavbarStart";
import NavbarAdmin from "./components/layout/NavbarAdmin";
import NavbarCleaner from "./components/layout/NavbarCleaner";
import NavbarCustomer from "./components/layout/NavbarCustomer";
import AppRouter from "./components/routes";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function App(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      fetch(`http://localhost:8080/auth/details`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAuthenticated(true);
          setUser(data);
        });
    }
    setIsLoaded(true);
  }, [user]);

  if (isLoaded) {
    return (
      <div className="App">
        {authenticated ? (
          user.roles.includes("ADMIN") ? (
            <NavbarAdmin />
          ) : user.roles.includes("CLEANER") ? (
            <NavbarCleaner />
          ) : (
            <NavbarCustomer />
          )
        ) : (
          <NavbarStart />
        )}
        <AppRouter />
      </div>
    );
  } else {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
}

export default App;
