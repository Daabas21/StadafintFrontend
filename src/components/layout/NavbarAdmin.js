import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Logo from "../images/sf.png";

const NavbarAdmin = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img src={Logo} alt="" />
          <Typography
            variant="h5"
            component={Link}
            to="/landingpage"
            sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}
          >
            StädaFint - Admin
          </Typography>

          <Button color="inherit" component={Link} to="/admincleaners">
            Employees
          </Button>
          <Button color="inherit" component={Link} to="/admincustomers">
            Customers
          </Button>
          <Button color="inherit" component={Link} to="/admin">
            Bookings
          </Button>
          <Button color="inherit" component={Link} to="/logout">
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default NavbarAdmin;
