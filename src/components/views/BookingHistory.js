import {
    Accordion, AccordionDetails, AccordionSummary,
    Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BookingCard from "../common/BookingCard";

const BookingHistory = ({ bookingList }) => {

    let bookings = [...bookingList]

    return (
        <div style={{
            // display: "flex",
            // flexDirection: "column",
            // alignItems: "center",
            // justifyContent: "center",
            margin: 20,
        }}
        >
            < Typography
                id="title"
                component="h1"
                variant="h5"
                marginTop={4}
                marginBottom={2}
                textAlign={"center"}
            >
                Booking History
            </Typography>
            {/*<Grid container spacing={2} wrap={"wrap"} justifyContent={"center"}>*/}
            {/*    /!*SHOULD BE PERFORMED (but we don't have any performed bookings at the moment*!/*/}
            {/*    {bookings.filter(booking => booking.status === "confirmed")*/}
            {/*        .map((booking, index) => {*/}
            {/*            return (*/}
            {/*                <BookingCard booking={booking} key={booking.bookingId}/>*/}
            {/*            );*/}
            {/*        })}*/}
            {/*</Grid>*/}

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Performed</Typography>
                </AccordionSummary>
                <AccordionDetails>
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
                                {bookings.filter(booking => booking.status === "confirmed")
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

                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
            {/*<Accordion>*/}
            {/*    <AccordionSummary*/}
            {/*        expandIcon={<ExpandMoreIcon />}*/}
            {/*        aria-controls="panel2a-content"*/}
            {/*        id="panel2a-header"*/}
            {/*    >*/}
            {/*        <Typography>Under Construction</Typography>*/}
            {/*    </AccordionSummary>*/}
            {/*    <AccordionDetails>*/}
            {/*        <Grid container spacing={2} wrap={"wrap"} justifyContent={"center"}>*/}
            {/*            /!*SHOULD BE PERFORMED (but we don't have any performed bookings at the moment*!/*/}
            {/*            {bookings.filter(booking => booking.status === "Under construction")*/}
            {/*                .map((booking, index) => {*/}
            {/*                    return (*/}
            {/*                        <BookingCard booking={booking} key={booking.bookingId}/>*/}
            {/*                    );*/}
            {/*                })}*/}
            {/*        </Grid>*/}
            {/*    </AccordionDetails>*/}
            {/*</Accordion>*/}


        </div>
    )
}

export default BookingHistory;