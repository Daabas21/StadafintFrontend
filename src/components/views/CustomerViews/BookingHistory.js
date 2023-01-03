import { Grid, Typography } from "@mui/material";
import BookingCard from "../../common/BookingCard";

const BookingHistory = ({ bookingList }) => {
  let bookings = [...bookingList];

  let filteredBookings = bookings.filter(
    (booking) => booking.status === "Performed"
  );

  return (
    <div>
      <Typography
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
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking, index) => {
            return <BookingCard booking={booking} key={booking.bookingId} />;
          })
        ) : (
          <div style={{ marginTop: 10 }}>
            Performed bookings will be shown here.
          </div>
        )}
      </Grid>
    </div>
  );
};

export default BookingHistory;
