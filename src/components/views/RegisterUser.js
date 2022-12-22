import * as React from "react";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import { useState } from "react";

const setToken = (token) => {
  localStorage.setItem("token", token);
  localStorage.setItem("lastLoginTime", new Date(Date.now()).getTime);
}

const RegisterUser = () => {
  const [values, setValues] = useState({
    name: "", address: "", telnum: "", email: "", password: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    const res = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { 
        "Content-type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        address: values.address,
        telnum: values.telnum,
        email: values.email,
        password: values.password,
      }),
    })


    const data = await res.json()
    const token = data.token

    setToken(token);

  };

  function handleClick() {
    if (!values.address || !values.name || !values.password || !values.email) {
      alert("Name, adress, email and password are required!")
    } else {

      handleSubmit();
      alert("Your account is created ");
      setValues({ name: "", address: "", telnum: "", email: "", password: "" })
    }
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
      <Box width={'100%'}>
        <Stack direction="column" alignItems={"center"} justifyItems='center'>
          <TextField
            id="outlined-basic"
            name="name"
            label="Name"
            variant="outlined"
            value={values.name}
            onChange={handleChange}
            margin="normal"
            style={{ width: '20%' }}
          />
          <TextField
            id="outlined-basic"
            name="address"
            label="Address"
            variant="outlined"
            value={values.address}
            onChange={handleChange}
            margin="normal"
            style={{ width: '20%' }}
          />

          <TextField
            id="outlined-basic"
            name="telnum"
            label="Phone"
            variant="outlined"
            value={values.telnum}
            onChange={handleChange}
            margin="normal"
            style={{ width: '20%' }}
          />
          <TextField
            id="outlined-basic"
            name="email"
            label="Email"
            variant="outlined"
            value={values.email}
            onChange={handleChange}
            margin="normal"
            style={{ width: '20%' }}
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
            style={{ width: '20%' }}
          />
          <Button
            color={"primary"}
            variant={"outlined"}
            onClick={handleClick}
            margin="normal"
          >Create Account</Button>
        </Stack>

      </Box>
    </div>
  );
};

export default RegisterUser;
