import {useEffect, useState} from "react";
import {
    Accordion, AccordionDetails, AccordionSummary,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Typography,
} from "@mui/material";
import * as React from "react";
import BookingHistory from "./BookingHistory";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BookingCard from "../common/BookingCard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CustomerBookings = () => {
    const [bookingList, setBookingList] = useState([]);
    const [customerId, setCustomerId] = useState(0);

    useEffect(() => {
        fetch("http://localhost:8080/customer/1", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setCustomerId(data.id);
            });
        getData().then((r) => r);
    }, [customerId]);

    const getData = async () => {
        let res = await fetch(
            `http://localhost:8080/customer/${customerId}/booking`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        );
        let data = await res.json();

        setBookingList(data);
    };

    let sortedBookings = bookingList.sort(
        (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );

    const handleDelete = async (id) => {
        const choice = window.confirm(
            "Are you sure you want to delete this booking? This action can not be undone."
        );
        if (choice) {
            await fetch(`http://localhost:8080/customer/booking/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            await getData();
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: 20,
            }}
        >
            <Typography
                id="title"
                component="h1"
                variant="h5"
                marginTop={2}
                marginBottom={2}
            >
                Bookings
            </Typography>
            {/*<Grid container spacing={2} wrap={"wrap"} justifyContent={"center"}>*/}
            {/*    {sortedBookings*/}
            {/*        .filter(booking => booking.status !== "Performed")*/}
            {/*        .map((booking, index) => {*/}
            {/*            return (*/}
            {/*                <Grid item key={booking.bookingId}>*/}
            {/*                    <Card*/}
            {/*                        key={booking.id}*/}
            {/*                        sx={{minWidth: 250, marginTop: 2, textAlign: "center"}}*/}
            {/*                    >*/}
            {/*                        <CardContent>*/}
            {/*                            <Typography*/}
            {/*                                sx={{fontSize: 14}}*/}
            {/*                                color="text.secondary"*/}
            {/*                                gutterBottom*/}
            {/*                            >*/}
            {/*                                {booking.date}*/}
            {/*                            </Typography>*/}
            {/*                            <Typography variant="h5" component="div">*/}
            {/*                                {booking.address}*/}
            {/*                            </Typography>*/}
            {/*                            <Typography sx={{mb: 1.5}} color="text.secondary">*/}
            {/*                                {booking.time}*/}
            {/*                            </Typography>*/}
            {/*                            <Typography variant="body2">*/}
            {/*                                Service: {booking.service ? booking.service : "none"}*/}
            {/*                                <br/>*/}
            {/*                                Status: {booking.status}*/}
            {/*                                /!*<br/>*!/*/}
            {/*                                /!*Description: {booking.description ? booking.description : "none"}*!/*/}
            {/*                            </Typography>*/}
            {/*                        </CardContent>*/}
            {/*                        <CardActions sx={{justifyContent: "center"}}>*/}
            {/*                            <Button*/}
            {/*                                variant="outlined"*/}
            {/*                                color="error"*/}
            {/*                                onClick={() => handleDelete(booking.bookingId)}*/}
            {/*                            >*/}
            {/*                                Unbook*/}
            {/*                            </Button>*/}
            {/*                        </CardActions>*/}
            {/*                    </Card>*/}
            {/*                </Grid>*/}
            {/*            );*/}
            {/*        })}*/}
            {/*</Grid>*/}

            {/*<Accordion>*/}
            {/*    <AccordionSummary*/}
            {/*        expandIcon={<ExpandMoreIcon />}*/}
            {/*        aria-controls="panel1a-content"*/}
            {/*        id="panel1a-header"*/}
            {/*    >*/}
            {/*        <Typography>Confirmed</Typography>*/}
            {/*    </AccordionSummary>*/}
            {/*    <AccordionDetails>*/}
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="h5" component="div">
                                            Address
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h5" component="div">
                                            Date
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h5" component="div">
                                            Time
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h5" component="div">
                                            Service
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h5" component="div">
                                            Status
                                        </Typography>
                                    </TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedBookings
                                    .filter(booking => booking.status !== "Performed")
                                    .map((row) => (
                                        <TableRow
                                            key={row.bookingId}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.address}
                                            </TableCell>
                                            <TableCell>{row.date}</TableCell>
                                            <TableCell>{row.time}</TableCell>
                                            <TableCell>{row.service}</TableCell>
                                            <TableCell>{row.status}</TableCell>
                                                                        <IconButton
                                                                            variant="outlined"
                                                                            color="error"
                                                                            onClick={() => handleDelete(row.bookingId)}
                                                                        >
                                                                            <DeleteOutlineIcon />
                                                                        </IconButton>


                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            {/*    </AccordionDetails>*/}
            {/*</Accordion>*/}


            <BookingHistory bookingList={bookingList}/>
        </div>
    );
};

export default CustomerBookings;
