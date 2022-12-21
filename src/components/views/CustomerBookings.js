import {useEffect, useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider,
    List,
    ListItem,
    ListItemText,
    Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CustomerBookings = () => {

    const [bookingList, setBookingList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/customer/1/booking")
            .then((res) => res.json())
            .then((data) => setBookingList(data));
    }, []);


    return(
        <div>
            {bookingList.map((booking, index) => {
                return (
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{booking.date}</Typography>
                            <Typography> @ {booking.time}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {booking.address}
                            </Typography>
                            <Typography>
                                Service: {booking.service ? booking.service : "none"}
                            </Typography>
                            <Typography>
                                Description: {booking.description ? booking.description : "none"}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

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