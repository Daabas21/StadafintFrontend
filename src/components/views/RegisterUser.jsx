import * as React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormGroup,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RegisterUser = () => {
  const [open, setOpen] = React.useState(false);
  //Need state with values from entitys?
  const [values, setValues] = useState({
    id: "",
    fullname: "",
    adress: "",
    phonenumber: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetch("blablablab")
      .then((res) => res.json())
      .then((data) => setValues(data)); //hämta entyties from backend
  }, []);

  //WIll be moved  to APPBAR?!
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    alert("ALERT " + values);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Register new user</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit}>
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              align="center"
              onChange={handleChange}
            >
              Register User
            </Typography>
            <FormGroup row>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                type={"text"}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                label="Adress"
                variant="outlined"
                type={"text"}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup row>
              <TextField
                id="outlined-basic"
                label="Phonenumber"
                variant="outlined"
                type={"text"}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type={"text"}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup row>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                onChange={handleChange}
              />
            </FormGroup>

            <Button type={"submit"} color={"primary"} variant={"contained"}>
              Create Account
            </Button>
          </Box>
        </form>
      </Modal>
    </div>
  );
};

export default RegisterUser;
