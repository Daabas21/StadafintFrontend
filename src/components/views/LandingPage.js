import "./Home.css";
import image from "../images/w.jpg";

const LandingPage = () => {
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
      </section>
    </div>
  );
};

export default LandingPage;
