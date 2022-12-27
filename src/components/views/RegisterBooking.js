import * as React from 'react';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {
    Radio,
    RadioGroup,
    TextField,
    FormControl,
    FormLabel,
    FormControlLabel,
    Button,
    Stack,
    Typography, IconButton, Snackbar, Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {useState} from "react";
import {useEffect} from "react";

const RegisterBooking = () => {

    const [dateValue, setDateValue] = useState();
    const [timeValue, setTimeValue] = useState();
    const [input, setInput] = useState({
        cleanerId: 1,
        customerId: 1,
        description: "",
        address: "",
        date: "",
        time: "",
        status: "Unconfirmed",
        workingTime: 0.0,
        service: ""
    })
    const [customerId, setCustomerId] = useState(0)
    const [bookingList, setBookingList] = useState([]);
    let filteredList = []

    const [open, setOpen] = useState(false)

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
                setCustomerId(data.id)
            })

        getBookings().then(r => r)
    }, [customerId]);

    const getBookings = async() => {
        let res = await fetch(`http://localhost:8080/customer/${customerId}/booking`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        let data = await res.json()
        setBookingList(data)
    }


    const checkIfBookingExists = () => {
        filteredList = bookingList.filter((book) => (book.customerId === customerId &&
            book.date === dateValue.$d.toLocaleDateString('en-CA') &&
            book.address === input.address &&
            book.time === `${timeValue.$d.toLocaleTimeString("en-GB", {hour: "2-digit", minute: "2-digit"})}:00`
        ))
    }

    const handleChange = (e) => {
        setInput(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSave = () => {

        checkIfBookingExists()
        if (filteredList.length === 0) {

            const date = new Date(dateValue)
            const formattedTime = `${timeValue.$d.toLocaleTimeString("en-GB", {hour: "2-digit", minute: "2-digit"})}:00`

            fetch("http://localhost:8080/customer/booking", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    cleanerId: input.cleanerId,
                    customerId: customerId,
                    description: input.description,
                    address: input.address,
                    date: date,
                    time: formattedTime,
                    status: input.status,
                    workingTime: input.workingTime,
                    service: input.service
                }),
            })
                .then((res) => res.json())
                .catch((e) => console.log("Error " + e));
            setOpen(true)
        } else {
            alert("You have already made a booking like this. Please try again with other date, time and/or address.")
        }
    }

    return (
        <div>
            <Stack alignItems="center" spacing={4}>
                <Typography
                    id="title"
                    component="h1"
                    variant="h5"
                    marginTop={2}
                >
                    Book Your Cleaning
                </Typography>

                <FormControl required={true}>
                    <FormLabel id="cleaning-type">Cleaning type/service</FormLabel>
                    <RadioGroup
                        aria-labelledby="cleaning-type"
                        // defaultValue="basic"
                        name="service"
                        onChange={handleChange}
                    >
                        <FormControlLabel value="Basic" control={<Radio/>} label="Basic"/>
                        <FormControlLabel value="Topp" control={<Radio/>} label="Topp"/>
                        <FormControlLabel value="Diamant" control={<Radio/>} label="Diamant"/>
                        <FormControlLabel value="Window-clean" control={<Radio/>} label="Window cleaning"/>
                    </RadioGroup>
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Pick your date"
                        value={dateValue}
                        onChange={(newValue) => {
                            setDateValue(newValue);
                        }}
                        renderInput={(props) => <TextField {...props} helperText={"mm/dd/yy"}/>}
                    />

                    <TimePicker
                        label="Pick time"
                        value={timeValue}
                        onChange={(newValue) => {
                            setTimeValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        closeOnSelect
                    />
                </LocalizationProvider>

                <TextField
                    id='address'
                    label='Cleaning address'
                    name='address'
                    value={input.address}
                    onChange={handleChange}
                    variant='outlined'
                    sx={{width: 260}}
                    required={true}
                />

                <Button
                    color={"primary"}
                    variant={"contained"}
                    onClick={handleSave}
                >
                    Book
                </Button>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message="Booked successfully"
                />
            </Stack>
        </div>
    )
}

export default RegisterBooking;