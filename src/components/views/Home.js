import './Home.css'
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <section className="hero-CTA">
                <h1 className="hero-title">
                    Welcome to <span>StädaFint</span>
                </h1>
                <p className="hero-subtitle">Your local cleaning company</p>
                <p className="hero-subtitle">we make your everyday a little bit easier...</p>

                <Button sx={{marginTop: "2rem"}} size="large" className="hero-button" variant="contained" component={Link} to="/register-booking">Book a Cleaning</Button>
        </section>

    )
}

export default Home;