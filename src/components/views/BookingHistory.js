import {
    Grid,
    Typography
} from "@mui/material";
import BookingCard from "../common/BookingCard";

const BookingHistory = ({ bookingList }) => {

    let bookings = [...bookingList]

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
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
            <Grid container spacing={2} wrap={"wrap"} justifyContent={"center"}>
                {/*SHOULD BE PERFORMED (but we don't have any performed bookings at the moment*/}
                {bookings.filter(booking => booking.status === "confirmed")
                    .map((booking, index) => {
                        return (
                            <BookingCard booking={booking} key={booking.bookingId}/>
                        );
                    })}
            </Grid>

        </div>
    )
}

export default BookingHistory;