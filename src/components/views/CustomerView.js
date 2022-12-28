import * as React from "react";

import {Button, Stack, Typography, TextField, Box} from "@mui/material";
import {useEffect, useState} from "react";

const CustomerView = () => {
    const [customerData, setCustomerData] = useState({});
    const [customerName, setCustomerName] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");
    const [phoneNr, setPhoneNr] = useState("");
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/customer/1", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setCustomerData(data);
                setCustomerName(data.name);
                setCustomerAddress(data.address);
                setMail(data.email);
                setPhoneNr(data.telnum);
                setPass(data.password);
            })
    }, []);

    const handleSubmit = (e) => {

        const choice = window.confirm(
            "Are you sure you want to submit the changes? This action can not be undone."
        )

        if (choice) {
            alert(
                "Change submitted! \nName: " +
                customerName +
                "\nAdress: " +
                customerAddress +
                "\nPhone Number: " +
                phoneNr +
                "\nEmail: " +
                mail
            );
            e.preventDefault();

            fetch("http://localhost:8080/customer/1", {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    name: customerName,
                    address: customerAddress,
                    telnum: phoneNr,
                    email: mail,
                    password: pass,
                }),
            })
                .then((res) => res.json())
                .catch((err) => console.log("error --> " + err));
        }

    }

    return (
        <div>
            <Box sx={{textAlign: "center"}}>
                <Typography
                    id="title"
                    component="h1"
                    variant="h5"
                    marginTop={2}
                    marginBottom={2}
                >
                    Your Profile
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Stack direction="column" alignItems="center" spacing={4}>
                        <TextField
                            id="outlined-name"
                            label="Name"
                            name="name"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            inputMode="text"
                            margin="normal"
                        />
                        <TextField
                            id="outlined-address"
                            label="Address"
                            name="address"
                            value={customerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            id="outlined-phone"
                            label="Phone"
                            name="telnum"
                            value={phoneNr}
                            onChange={(e) => setPhoneNr(e.target.value)}
                            margin="normal"
                            inputMode="tel"
                        />
                        <TextField
                            id="outlined-email"
                            label="Email"
                            name="email"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                            margin="normal"
                            inputMode={"email"}
                        />
                    </Stack>
                    <Button
                        type={"submit"}
                        color={"primary"}
                        variant={"contained"}
                        sx={{marginTop: 4}}
                    >
                        Save changes
                    </Button>
                </form>
            </Box>
        </div>
    );
};

export default CustomerView;
