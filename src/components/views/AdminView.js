import * as React from "react";
import { useEffect, useState } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
  Button,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  FormControl,
  TextField,
} from "@mui/material";
import AdminBookingM from "./AdminBookingM";

const AdminView = () => {
  const [bookings, setBookings] = useState([]);
  const [cleaners, setCleaners] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [bookingView, setBookingView] = useState(false);
  const [currentViewBooking, setCurrentViewBooking] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/booking")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBookings(data);
        // console.log(data[1].bookingId);
      });
    fetch("http://localhost:8080/cleaner")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCleaners(data);
      });
    fetch("http://localhost:8080/customer")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCustomers(data);
      });
  }, []);

  const handleCheckBox = (e, b) => {
    console.log(b, e.target.checked);

    const bookingsCopy = [...bookings];
    bookingsCopy.forEach((booking) => {
      if (booking.bookingId === b.bookingId && e.target.checked) {
        booking.status = "confirmed";
      }
    });
    setBookings(bookingsCopy);
  };

  const handleChange = (e, b) => {
    console.log(b, e.target.value);

    const bookingsCopy = [...bookings];
    bookingsCopy.forEach((booking) => {
      if (booking.bookingId === b.bookingId) {
        booking.cleanerId = e.target.value;
      }
    });
    setBookings(bookingsCopy);
  };

  const handleClick = (booking) => {
    console.log("Saved Changes");
    console.log(booking);

    fetch(`http://localhost:8080/booking/${booking.bookingId}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const toggleBookingView = (booking, customer, cleaner) => {
    setBookingView(true);
    setCurrentViewBooking({
      customer: customer,
      cleaner: cleaner,
      booking: booking,
    });
  };

  return (
    <div>
      {bookingView ? (
        <AdminBookingM
          booking={currentViewBooking.booking}
          cleaner={currentViewBooking.cleaner}
          customer={currentViewBooking.customer}
          cleaners={cleaners}
        />
      ) : null}
      {cleaners && customers && bookings
        ? bookings.map((booking, index) => {
            return (
              <ListItem key={booking.bookingId}>
                <ListItemButton>
                  {/* <ListItemText
                primary={
                  <Typography variant="h6" style={{ color: "#1976d2" }}>
                    Booking Id: {booking.bookingId}
                  </Typography>
                }
              />

              <ListItemText primary={`Customer: ${booking.customerId}`} />
              <ListItemText primary={`Date: ${booking.date}`} />
              <ListItemText primary={`Time: ${booking.time}`} />
              <ListItemText primary={`Adress: ${booking.address}`} />
              <ListItemText primary={`Description: ${booking.description}`} />
              <ListItemText primary={`Service: ${booking.service}`} />
              <ListItemText
                primary={`Work hour/s: ${booking.workingTime} 
            `}
              /> */}
                  <ListItemText
                    primary={
                      <Button
                        onClick={() =>
                          toggleBookingView(
                            booking,
                            customers.find((c) => c.id === booking.customerId),
                            cleaners.find((c) => c.id === booking.cleanerId)
                          )
                        }
                      >
                        <Typography variant="h6" style={{ color: "#1976d2" }}>
                          Booking Id: {booking.bookingId}
                        </Typography>
                      </Button>
                    }
                    secondary={`Cleaner ${booking.cleanerId}: ${
                      cleaners.find((c) => c.id === booking.cleanerId)?.name
                    } * 
            Customer ${booking.customerId}: ${
                      customers.find((c) => c.id === booking.customerId)?.name
                    } * 
            Date: ${booking.date} *
            Time: ${booking.time} *
            Description: ${booking.description} *
           
            `}
                  />
                  <ListItemText
                    secondary={
                      booking.service === null
                        ? ""
                        : `Feedback: ${booking.service} `
                    }
                  />
                  <ListItemText
                    secondary={
                      booking.workingTime <= 0
                        ? ""
                        : ` ${booking.workingTime} hr/hrs `
                    }
                  />

                  <TextField
                    id="address"
                    label="Address"
                    variant="standard"
                    value={booking.address}
                    name="address"
                    onChange={handleChange}
                  />

                  <FormControl sx={{ m: 1, minWidth: 110 }}>
                    <InputLabel id="demo-simple-select-label">
                      Cleaners
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={""}
                      label="Cleaner"
                      onChange={(e) => handleChange(e, booking)}
                    >
                      {cleaners.map((cleaner) => (
                        <MenuItem key={cleaner.id} value={cleaner.id}>
                          {cleaner.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <div>
                    {booking.status === "Unconfirmed" ||
                    booking.status === "UnConfirmed" ? (
                      <Checkbox
                        onChange={(e) => handleCheckBox(e, booking)}
                        inputProps={{ "aria-label": "controlled" }}
                        checked={false}
                      />
                    ) : (
                      <Checkbox disabled checked />
                    )}
                  </div>
                  <Button
                    type={"submit"}
                    color={"primary"}
                    variant={"outlined"}
                    onClick={() => handleClick(booking)}
                    margin="normal"
                  >
                    Save
                  </Button>
                </ListItemButton>
              </ListItem>
            );
          })
        : null}
    </div>
  );
};

export default AdminView;
