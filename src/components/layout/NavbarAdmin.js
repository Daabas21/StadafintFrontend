import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const NavbarAdmin = () => {
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
            Städa fint - Admin
          </Typography>

          <Button color="inherit" component={Link} to="/">
            Employees
          </Button>
          <Button color="inherit" component={Link} to="/">
            Customers
          </Button>
          <Button color="inherit" component={Link} to="/admin">
            Bookings
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default NavbarAdmin;
