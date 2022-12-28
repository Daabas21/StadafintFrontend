import * as React from 'react';
import {useState} from "react";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import dayjs from "dayjs";
import {
    Radio,
    RadioGroup,
    TextField,
    FormControl,
    FormLabel,
    FormControlLabel,
    Button,
    Stack,
    Typography, Snackbar
} from '@mui/material';

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
    const [open, setOpen] = useState(false)
    let filteredList = []

    const navigate = useNavigate()

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

    const getBookings = async () => {
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

    const time = `${timeValue?.$d?.toLocaleTimeString("en-GB", {hour: "2-digit", minute: "2-digit"})}:00`

    const checkIfBookingExists = () => {
        filteredList = bookingList.filter((book) => (book.customerId === customerId &&
            book.date === dateValue?.$d?.toLocaleDateString('en-CA') &&
            book.address === input.address &&
            book.time === time
        ))
    }

    const handleChange = (e) => {
        setInput(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSave = (e) => {

        e.preventDefault()
        checkIfBookingExists()

        if (filteredList.length === 0) {
            const date = new Date(dateValue)

            if (input.address !== "" && input.service !== "" && dateValue !== undefined && timeValue !== undefined) {
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
                        time: time,
                        status: input.status,
                        workingTime: input.workingTime,
                        service: input.service
                    }),
                })
                    .then((res) => res.json())
                    .catch((e) => console.log("Error " + e));

                setOpen(true)
                setTimeout(() => {navigate("/my-bookings")}, 2000);
            } else {
                alert("Please fill out all the fields. ")
            }
        } else {
            alert("You have already made a booking like this. Please try again with other date, time and/or address.")
        }
    }

    return (
        <div>
            <Typography
                id="title"
                component="h1"
                variant="h5"
                margin={2}
                textAlign="center"
            >
                Book Your Cleaning
            </Typography>

            <form>
                <Stack alignItems="center" spacing={4}>
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
                            disablePast={true}
                        />

                        <TimePicker
                            label="Pick time"
                            value={timeValue}
                            onChange={(newValue) => {
                                setTimeValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            closeOnSelect
                            // minTime={dayjs().set('hour', 8)}
                            // maxTime={dayjs().set('hour', 17)}
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
                    />

                    <Button
                        color={"primary"}
                        variant={"contained"}
                        onClick={handleSave}
                        type="submit"
                    >
                        Book
                    </Button>
                    <Snackbar
                        open={open}
                        autoHideDuration={3000}
                        onClose={() => setOpen(false)}
                        message="Booked successfully. Redirecting to your bookings"
                    />
                </Stack>
            </form>

        </div>
    )
}

export default RegisterBooking;