import {useEffect, useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Button, Card, CardActions, CardContent,
    Divider,
    List,
    ListItem,
    ListItemText,
    Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as React from "react";

const CustomerBookings = () => {

    const [bookingList, setBookingList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/customer/1/booking")
            .then((res) => res.json())
            .then((data) => setBookingList(data));
    }, []);


    return(
        <div style={{ display: "flex", flexDirection: "column", alignItems:"center"}}>
            <Typography
                id="title"
                component="h1"
                variant="h5"
                marginTop={2}
            >
                Your bookings
            </Typography>

            {bookingList.map((booking, index) => {
                return (

                    <Card sx={{ minWidth: 275, marginTop: 2 }}>
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
                                Description: {booking.description ? booking.description : "none"}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Delete</Button>
                        </CardActions>
                    </Card>



                    // <Accordion>
                    //     <AccordionSummary
                    //         expandIcon={<ExpandMoreIcon />}
                    //         aria-controls="panel1a-content"
                    //         id="panel1a-header"
                    //     >
                    //         <Typography>{booking.date}</Typography>
                    //         <Typography> @ {booking.time}</Typography>
                    //     </AccordionSummary>
                    //     <AccordionDetails>
                    //         <Typography>
                    //             {booking.address}
                    //         </Typography>
                    //         <Typography>
                    //             Service: {booking.service ? booking.service : "none"}
                    //         </Typography>
                    //         <Typography>
                    //             Description: {booking.description ? booking.description : "none"}
                    //         </Typography>
                    //     </AccordionDetails>
                    // </Accordion>


                    // <List sx={{textAlign: "center"}}>
                    //     <ListItem>
                    //         <ListItemText
                    //             primary={`Date: ${booking.date}`}
                    //         />
                    //     </ListItem>
                    //
                    //     <ListItem>
                    //         <ListItemText
                    //             primary={`Time: ${booking.time}`}
                    //         />
                    //     </ListItem>
                    //     <ListItem>
                    //         <ListItemText
                    //             primary={`Address: ${booking.address}`}
                    //         />
                    //     </ListItem>
                    //     <ListItem>
                    //         <ListItemText
                    //             primary={booking.service ? `Service: ${booking.service}` : "Service: none"}
                    //         />
                    //     </ListItem>
                    //
                    //     <ListItem>
                    //         <ListItemText
                    //             primary={`Status: ${booking.status}`}
                    //         />
                    //     </ListItem>
                    //     <ListItem>
                    //         <ListItemText
                    //             primary={`Description: ${booking.description}`}
                    //         />
                    //     </ListItem>
                    //     <Divider />
                    //
                    // </List>

            )
            })}

        </div>
    )
}

export default CustomerBookings;