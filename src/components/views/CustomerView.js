import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Stack} from "@mui/material";
import {useEffect, useState} from "react";


const CustomerView = () => {

    const[customerData, setCustomerData] = useState({name: "initialStateName", address: "", telnum: "", email: ""})

    const [customerName, setCustomerName] = useState(customerData.name);
    const [customerAddress, setCustomerAddress] = useState("")
    const [phoneNr, setPhoneNr] = useState("")
    const [mail, setMail] = useState("")


    useEffect( () => {
        fetch('http://localhost:8080/customer/1')
            .then(res => res.json())
            .then(data => setCustomerData(data))
    },[])


    const handleChange = (e) => {
        console.log(e.target.name)
        console.log(customerName)
        setCustomerName(e.target.value)
    };

    const handleSubmit = (e) => {
        alert('Change submitted: ' + customerName + ' ' + customerAddress + ' ' + phoneNr + ' ' + mail);
        console.log("Name: ", customerName, "Adress: ", customerAddress, "phoneNr: ", phoneNr, "email: ", mail)
        e.preventDefault();
        console.log("CUSTOMER i view -->")
        console.log(customerData)
        // setCustomerName("")
        // setCustomerAddress("")
        // setPhoneNr("")
        // setMail("")

        fetch('http://localhost:8080/customer/1' , {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(customerName)
        })
            .then((result) => result.json())
            .then((info) => { console.log(info); })
    }

    // make some kind of check before submitting changes
    function handleClick() {
        alert("Are you sure? ")
    }

    return (
        <div>
            <p>Customer: {customerData.name}</p>
            <p>Customer: {customerData.address}</p>
            <p>Customer: {customerData.telnum}</p>
            <p>Customer: {customerData.email}</p>

            {/*{customerData? customerData.map(customer =><p>Mina sidor: {customer.name}</p>) : null}*/}
            <Box sx={{ width: '100%'}}>
            <form onSubmit={handleSubmit}>
                <Stack direction="column" ml={10} mr={10}>
                <TextField
                    id="outlined-name"
                    name="customerName"
                    label="Name"
                    value={customerName}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    id="outlined-address"
                    label="Address"
                    value={customerAddress}
                    onChange={e => setCustomerAddress(e.target.value)}
                    margin="normal"
                />
                <TextField
                    id="outlined-phone"
                    label="Phone"
                    value={phoneNr}
                    onChange={e => setPhoneNr(e.target.value)}
                    margin="normal"
                />
                <TextField
                    id="outlined-email"
                    label="Email"
                    value={mail}
                    onChange={e => setMail(e.target.value)}
                    margin="normal"
                />
                </Stack>
                <button type="submit" onClick={handleClick}>Save changes</button>

            </form>
            </Box>
        </div>
    )
}

export default CustomerView;