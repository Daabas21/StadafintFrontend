import DatePicker from 'react-datepicker';
import React, { useEffect, useState } from 'react'

import "react-datepicker/dist/react-datepicker.css"
import { Stack } from '@mui/system';
import { format } from 'date-fns';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';

const WorkingTime = () => {

    const [dateRange, setDateRange] = useState([null, null]);
    const [date1, date2] = dateRange;

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const [doneJobs, setDoneJobs] = useState();


    useEffect(() => {
        if (date1 && date2) {
            setStartDate(format(date1, 'yyyy-MM-dd'))
            setEndDate(format(date2, 'yyyy-MM-dd'))
        }
    }, [date1, date2])


    const searchDoneJobs = () => {
        if (startDate && endDate) {
            fetch(`http://localhost:8080/cleaner/1/date?startDate=${startDate}&endDate=${endDate}`, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
                .then(res => res.json())
                .then(data => data.sort((a, b) => Date.parse(a.date) - Date.parse(b.date)))
                .then(data => setDoneJobs(data))
        } else {
            alert("you must enter start and end date")
        }
    }

    const handleCalendarOpen = () => {
        document.addEventListener('touchstart', (event) => {
            event.stopPropagation();
        }, true)
    }

    const calculateWorkingTime = () => {
        const arrWorkingTime = doneJobs.map(t => t.workingTime);

        let sum = arrWorkingTime.reduce((a, b) => a + b)

        alert("Your working time for this period is "+ sum + " hours")
    }

    return (
        <Stack alignItems={"center"}>
            <div>Enter the dates</div>
            <DatePicker
                selectsRange={true}
                startDate={date1}
                endDate={date2}
                onChange={(update) => setDateRange(update)}
                dateFormat='dd-MM-yyyy'
                withPortal
                onCalendarOpen={handleCalendarOpen}
            />
            <Button
                onClick={searchDoneJobs}
            >search</Button>
            <Grid container spacing={2} wrap={"wrap"} justifyContent={"center"}>

                {doneJobs ? doneJobs.map(booking => {
                    return (
                        <Card key={booking.bookingId} sx={{ minWidth: 250, marginTop: 2, textAlign: "center" }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {booking.date}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {booking.address}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {booking.time}
                                </Typography>
                                <Typography variant="body2">
                                    Service: {booking.service ? booking.service : "none"}
                                    <br />
                                    Status: {booking.status}
                                </Typography>
                            </CardContent>
                        </Card>
                    )
                }) : null}
            </Grid>
            {doneJobs ? <Button
            onClick={calculateWorkingTime}
            >
            Calculate workingTime for selected period
            </Button> : null}
        </Stack>
    )
}

export default WorkingTime