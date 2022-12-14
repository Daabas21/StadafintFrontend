import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Logo from "../images/sf.png";

const NavbarCustomer = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img src={Logo} alt="" />
          <Typography
            variant="h5"
            component={Link}
            to="/landingpage"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "white",
            }}
          >
            StädaFint - Customer
          </Typography>
          <Button color="inherit" component={Link} to="/customer">
            My Account
          </Button>
          <Button color="inherit" component={Link} to="/my-bookings">
            My Bookings
          </Button>
          <Button color="inherit" component={Link} to="/booking">
            Book
          </Button>
          <Button color="inherit" component={Link} to="/logout">
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default NavbarCustomer;
