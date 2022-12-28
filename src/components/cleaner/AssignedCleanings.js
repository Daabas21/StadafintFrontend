import React, { useEffect, useState } from 'react'
import { Button, Card, CardActions, CardContent, Grid, Typography} from "@mui/material";


const AssignedCleanings = ({ cleanerData }) => {

    const [myBooking, setMyBooking] = useState([])

    useEffect(() => {
        console.log(cleanerData)
        fetch(`http://localhost:8080/cleaner/${cleanerData.id}/booking`,{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => setMyBooking(data))

            console.log(myBooking)
    },[cleanerData.id])


    let sortedBookings = myBooking.sort((a,b) => Date.parse(a.date) - Date.parse(b.date))

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

            {sortedBookings.map((booking, index) => {
                return (
                    <Grid item key={booking.bookingId}>
                        <Card key={booking.id} sx={{minWidth: 250, marginTop: 2, textAlign: "center"}}>
                            <CardContent>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    {booking.date}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {booking.address}
                                </Typography>
                                <Typography sx={{mb: 1.5}} color="text.secondary">
                                    {booking.time}
                                </Typography>
                                <Typography variant="body2">
                                    Service: {booking.service ? booking.service : "none"}
                                    <br/>
                                    Status: {booking.status}
                                    {/*<br/>*/}
                                    {/*Description: {booking.description ? booking.description : "none"}*/}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{justifyContent: "center"}}>
                            </CardActions>
                        </Card>
                    </Grid>
                )
            })}
        </Grid>
    </div>
  )
}

export default AssignedCleanings