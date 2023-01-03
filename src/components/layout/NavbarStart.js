import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
// import Logo from "../common/Logo";
import Logo from "../images/sf.png";

const NavbarStart = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img src={Logo} alt="" />
          <Typography
            variant="h4"
            component={Link}
            to="/landingpage"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "white",
            }}
          >
            StädaFint
          </Typography>

          <Button color="inherit" component={Link} to="/RegisterUser">
            Create Account
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default NavbarStart;
