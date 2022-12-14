import { Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function CleanerView() {
  const [cleanerData, setCleanerData] = useState();
  const [input, setInput] = useState({
    name: "",
    address: "",
    telnum: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/cleaner/1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setCleanerData(data));
  }, []);

  useEffect(() => {
    if (cleanerData) {
      setInput({
        name: cleanerData.name,
        address: cleanerData.address,
        telnum: cleanerData.telnum,
        email: cleanerData.email,
        password: cleanerData.password,
      });
    }
  }, [cleanerData]);

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    await fetch("http://localhost:8080/cleaner/1", {
      method: "PUT",
      body: JSON.stringify(input),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    let response = await fetch("http://localhost:8080/cleaner/1", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    let body = await response.json();

    console.log(body);

    setCleanerData(body);

    alert("Your data is edited");
  };

  return (
    <div className="App">
      <Stack spacing={2} alignItems="center" margin={5}>
        <TextField
          id="name"
          label="Name"
          variant="standard"
          value={input.name}
          name="name"
          onChange={handleChange}
        />
        <TextField
          id="address"
          label="Address"
          variant="standard"
          value={input.address}
          name="address"
          onChange={handleChange}
        />
        <TextField
          id="telnumber"
          label="Tel"
          variant="standard"
          value={input.telnum}
          name="telnum"
          onChange={handleChange}
        />
        <TextField
          id="email"
          label="Email"
          variant="standard"
          value={input.email}
          name="email"
          onChange={handleChange}
        />
        <TextField
          id="password"
          label="NewPassword"
          variant="standard"
          value={input.password}
          name="password"
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Stack>
    </div>
  );
}

export default CleanerView;
