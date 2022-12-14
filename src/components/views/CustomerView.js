import * as React from "react";

import { Button, Stack, Typography, TextField, Box } from "@mui/material";
import { useEffect, useState } from "react";

const CustomerView = () => {
  const [customerData, setCustomerData] = useState({});
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [phoneNr, setPhoneNr] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/customer/1")
      .then((res) => res.json())
      .then((data) => {
        setCustomerData(data);
        setCustomerName(data.name);
        setCustomerAddress(data.address);
        setMail(data.email);
        setPhoneNr(data.telnum);
        setPass(data.password);
      });
  }, []);

  const handleChange = (e) => {
    console.log(e.target.name);
    console.log(customerName);
    setCustomerName(e.target.value);
  };

  const handleSubmit = (e) => {
    alert(
      "Change submitted: " +
        customerName +
        " " +
        customerAddress +
        " " +
        phoneNr +
        " " +
        mail
    );
    console.log(
      "Name: ",
      customerName,
      "Adress: ",
      customerAddress,
      "phoneNr: ",
      phoneNr,
      "email: ",
      mail
    );
    e.preventDefault();
    console.log("CUSTOMER i view -->");
    console.log(customerData);

    fetch("http://localhost:8080/customer/1", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: customerName,
        address: customerAddress,
        telnum: phoneNr,
        email: mail,
        password: pass,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log("DATA--> ", data))
      .catch((err) => console.log("error --> " + err));
  };

  // make some kind of check before submitting changes
  function handleClick() {
    alert("Are you sure? ");
  }

  return (
    <div>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        align="center"
        onChange={handleChange}
      >
        Mina sidor: {customerName}
      </Typography>

      {/*{customerData? customerData.map(customer =><p>Mina sidor: {customer.name}</p>) : null}*/}
      <Box sx={{ width: "100%" }}>
        <form onSubmit={handleSubmit}>
          <Stack direction="column" ml={10} mr={10}>
            <TextField
              id="outlined"
              name="customerName"
              label="Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              inputMode="text"
              margin="normal"
            />
            <TextField
              id="outlined-address"
              label="Address"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              margin="normal"
            />
            <TextField
              id="outlined-phone"
              label="Phone"
              value={phoneNr}
              onChange={(e) => setPhoneNr(e.target.value)}
              margin="normal"
              inputMode="tel"
            />
            <TextField
              id="outlined-email"
              label="Email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              margin="normal"
              inputMode={"email"}
            />
          </Stack>
          <Button
            type={"submit"}
            color={"primary"}
            variant={"outlined"}
            onClick={handleClick}
          >
            Save changes
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default CustomerView;
