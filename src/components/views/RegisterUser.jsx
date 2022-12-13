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
    name: "",
    adress: "",
    phone: "",
    email: "",
    password: "",
  });

  //WIll be moved  to APPBAR?!
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    alert("ALERT " + values.name);

    fetch("http://localhost:8080/customer", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        kund_name: values.name,
        kund_adress: values.adress,
        kund_telnum: values.phone,
        kund_email: values.email,
        kund_password: values.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => setValues(data))
      .catch((e) => console.log(e));
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
                name="name"
                label="Name"
                variant="outlined"
                // value={values.fullname}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                name="adress"
                label="Adress"
                variant="outlined"
                // value={values.adress}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup row>
              <TextField
                id="outlined-basic"
                name="phone"
                label="Phone"
                variant="outlined"
                // value={values.phone}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                name="email"
                label="Email"
                variant="outlined"
                // value={values.email}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup row>
              <TextField
                id="outlined-basic"
                name="password"
                label="Password"
                variant="outlined"
                type={"text"}
                // value={values.password}
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
