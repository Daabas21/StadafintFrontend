import * as React from "react";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import { useState } from "react";

const RegisterUser = () => {
  const [values, setValues] = useState({
    name: "",
    address: "",
    telnum: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    fetch("http://localhost:8080/customer", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        address: values.address,
        telnum: values.telnum,
        email: values.email,
        password: values.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((e) => console.log("Error " + e));
  };

  function handleClick() {
    handleSubmit();
    alert("Your account is created ");
  }

  return (
    <div>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        align="center"
      >
        Register User
      </Typography>
      <Box sx={{ width: "100%" }}>
        <form>
          <Stack direction="column" ml={10} mr={10}>
            <TextField
              id="outlined-basic"
              name="name"
              label="Name"
              variant="outlined"
              value={values.fullname}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              id="outlined-basic"
              name="address"
              label="Address"
              variant="outlined"
              value={values.address}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              id="outlined-basic"
              name="telnum"
              label="Phone"
              variant="outlined"
              value={values.telnum}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              id="outlined-basic"
              name="email"
              label="Email"
              variant="outlined"
              value={values.email}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              id="outlined-basic"
              name="password"
              label="Password"
              variant="outlined"
              type={"password"}
              value={values.password}
              onChange={handleChange}
              margin="normal"
            />
          </Stack>

          <Button
            type={"submit"}
            color={"primary"}
            variant={"outlined"}
            onClick={handleClick}
            margin="normal"
          >
            Create Account
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default RegisterUser;
