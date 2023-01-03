import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const NavbarCleaner = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h4"
            component={Link}
            to="/landingpage"
            sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}
          >
            StädaFint - Employee
          </Typography>
          <Button color="inherit" component={Link} to="/cleaner">
            My Account
          </Button>
          <Button color="inherit" component={Link} to="/cleanerbookings">
            Assignments
          </Button>
          <Button color="inherit" component={Link} to="/logout">
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default NavbarCleaner;
