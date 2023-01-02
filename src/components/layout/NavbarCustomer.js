import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const NavbarCustomer = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h4"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}
          >
            Städa fint - Customer
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
