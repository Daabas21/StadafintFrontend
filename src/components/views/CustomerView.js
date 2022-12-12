import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Stack} from "@mui/material";
import {useEffect, useState} from "react";


const CustomerView = () => {

    const[customerData, setCustomerData] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/customer')
            .then(res => res.json())
            .then(data => setCustomerData(data))
    },[])

    const [customerName, setCustomerName] = useState("");
    const [customerAddress, setCustomerAddress] = useState("")
    const [phoneNr, setPhoneNr] = useState("")
    const [mail, setMail] = useState("")

    const handleChange = (e) => {
        setCustomerName(e.target.value)
    };

    const handleSubmit = (event) => {
        alert('Change submitted: ' + customerName + ' ' +  customerAddress + ' ' + phoneNr + ' '  + mail);
        console.log("Name: ", customerName, "Adress: ", customerAddress, "phoneNr: ", phoneNr, "email: ", mail)
        event.preventDefault();
        console.log("CUSTOMER i view -->")
        console.log(customerData)

    }

    return (
        <div>
            {customerData? customerData.map(customer =><p>Mina sidor: {customer.name}</p>) : null}
            <Box sx={{ width: '100%'}}>
            <form onSubmit={handleSubmit}>
                <Stack direction="column" ml={10} mr={10}>
                <TextField
                    margin="normal"
                    id="outlined-name"
                    label="Name"
                    value={customerName}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    id="outlined-address"
                    label="Address"
                    value={customerAddress}
                    onChange={e => setCustomerAddress(e.target.value)}
                />
                <TextField
                    margin="normal"
                    id="outlined-phone"
                    label="Phone"
                    value={phoneNr}
                    onChange={e => setPhoneNr(e.target.value)}
                />
                <TextField
                    margin="normal"
                    id="outlined-email"
                    label="Email"
                    value={mail}
                    onChange={e => setMail(e.target.value)}
                />
                </Stack>
                <button type="submit">Save changes</button>

            </form>
            </Box>
        </div>
    )
}

export default CustomerView;