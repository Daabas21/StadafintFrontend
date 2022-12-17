import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import {
    Radio,
    RadioGroup,
    TextField,
    FormControl,
    FormLabel,
    FormControlLabel,
    Button,
    Stack,
    Typography
} from '@mui/material';
import {useState} from "react";

const RegisterBooking = () => {

    const [dateValue, setDateValue] = useState();
    const [timeValue, setTimeValue] = useState();
    const [input, setInput] = useState({cleanerId: 1 , customerId: 1 ,description: "", address: "", date: "", time: "", status: "Unconfirmed", workingTime: 0.0, service: ""})

    const handleChange = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = () => {

        const date = new Date(dateValue)
        const formattedTime = `${timeValue.$H}:${timeValue.$m}:00`

        fetch("http://localhost:8080/booking", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                cleanerId: input.cleanerId,
                customerId: input.customerId,
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
            .then((data) => console.log(data))
            .catch((e) => console.log("Error " + e));
    }

    return (
        <div>
            <Stack alignItems="center" spacing={4}>
                <Typography
                    id="title"
                    component="h1"
                    variant="h5"
                    align="center"
                    marginTop={2}
                >
                    Book Your Cleaning
                </Typography>

                <FormControl>
                    <FormLabel id="cleaning-type">Cleaning type/service: </FormLabel>
                    <RadioGroup
                        aria-labelledby="cleaning-type"
                        defaultValue="B"
                        name="service"
                        onChange={handleChange}
                    >
                        <FormControlLabel value="B" control={<Radio />} label="Basic" />
                        <FormControlLabel value="T" control={<Radio />} label="Topp" />
                        <FormControlLabel value="D" control={<Radio />} label="Diamant" />
                        <FormControlLabel value="W" control={<Radio />} label="Window cleaning" />
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
                {/*</LocalizationProvider>*/}

                {/*<LocalizationProvider dateAdapter={AdapterDayjs}>*/}
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
                />

                <Button
                    color={"primary"}
                    variant={"contained"}
                    onClick={handleClick}
                >
                    Book
                </Button>
            </Stack>
        </div>
    )
}

export default RegisterBooking;