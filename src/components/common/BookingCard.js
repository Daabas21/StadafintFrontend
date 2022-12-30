import {Card, CardContent, Grid, Typography} from "@mui/material";

const BookingCard = ({ booking }) => {
    return(
            <Grid item key={booking.bookingId}>
                <Card
                    key={booking.id}
                    sx={{ minWidth: 250, marginTop: 2, textAlign: "center" }}
                >
                    <CardContent>
                        <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                        >
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
            </Grid>

    )
}

export default BookingCard;