import React, { useEffect, useState } from 'react'
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";


const AssignedCleanings = ({ cleanerData }) => {

    const [myBooking, setMyBooking] = useState([])

    useEffect(() => {

        const getBookings = () => {
            fetch(`http://localhost:8080/cleaner/${cleanerData.id}/booking`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
                .then(res => res.json())
                .then(data => data.sort((a, b) => Date.parse(a.date) - Date.parse(b.date)))
                .then(booking => setMyBooking(booking))
        }

        if (cleanerData.id) {
            getBookings()
        }

    }, [cleanerData.id])




    const handleDone = (id) => {

        fetch(`http://localhost:8080/cleaner/${id}/booking`, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => res.json())


        fetch(`http://localhost:8080/cleaner/${cleanerData.id}/booking`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => data.sort((a, b) => Date.parse(a.date) - Date.parse(b.date)))
            .then(booking => setMyBooking(booking))
    
}


return (
    <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: 20
    }}>
        <Typography
            id="title"
            component="h1"
            variant="h5"
            marginTop={2}
            marginBottom={2}
        >
            Assigned Cleanings
        </Typography>
        <Grid container spacing={2} wrap={"wrap"} justifyContent={"center"}>
            {myBooking ?
                myBooking.map((booking) => {
                    return (
                        <Grid item key={booking.bookingId}>
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
                                        {/*<br/>*/}
                                        {/*Description: {booking.description ? booking.description : "none"}*/}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: "center" }}>
                                    {booking.status === "Performed" ?
                                        <Button
                                            variant="outlined"
                                            color="success"
                                            onClick={() => handleDone(booking.bookingId)}
                                        >
                                            Done
                                        </Button> :
                                        <Button
                                            variant='outlined'
                                            disabled
                                        >Done</Button>}
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                }) : null}
        </Grid>
    </div>
)
}

export default AssignedCleanings