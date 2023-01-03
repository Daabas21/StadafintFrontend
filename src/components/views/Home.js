import "./Home.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import image from "../images/w.jpg";

import { useEffect } from "react";

const Home = ({ logout }) => {
  useEffect(() => {
    if (logout) {
      deleteToken();
    }
  }, [logout]);

  const deleteToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("lasLoginTime");
    window.location.href = "/";
  };
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <section className="hero-CTA">
        <h1 className="hero-title">
          Welcome to <span>StädaFint</span>
        </h1>
        <p className="hero-subtitle">Your local cleaning company</p>
        <p className="hero-subtitle">
          we make your everyday a little bit easier...
        </p>

        <Button
          sx={{ marginTop: "2rem" }}
          size="large"
          className="hero-button"
          variant="contained"
          component={Link}
          to="/login"
        >
          Book a Cleaning
        </Button>
      </section>
    </div>
  );
};

export default Home;
