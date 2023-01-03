import { Button, Link, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

const setToken = (token) => {
  localStorage.setItem("token", token);
  localStorage.setItem("lastLoginTime", new Date(Date.now()).getTime);
};

const Login = ({ logout }) => {
  // const navigate = useNavigate();
  const [input, setInput] = useState({ email: "", password: "" });

  useEffect(() => {
    if (logout) {
      deleteToken();
    }
  }, [logout]);

  const deleteToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("lasLoginTime");
    document.location.href = "/";
  };

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    const res = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    const token = data.token;

    setToken(token);
    document.location.href = "/landingpage";
  };

  return (
    <div>
      <Stack spacing={2} alignItems="center">
        <TextField
          id="email"
          label="email"
          variant="standard"
          value={input.email}
          name="email"
          onChange={handleChange}
        />
        <TextField
          id="password"
          type="password"
          label="password"
          variant="standard"
          value={input.password}
          name="password"
          onChange={handleChange}
        />
        <Button variant="contained" color="success" onClick={handleLogin}>
          LOGIN
        </Button>
        <div>
          You don't have an account yet?
          <div style={{ textAlign: "center" }}>
            <Link href="/registeruser">Sign Up</Link> here.
          </div>
        </div>
      </Stack>
    </div>
  );
};

export default Login;
