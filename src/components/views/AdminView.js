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
} from "@mui/material";
import AdminBookingCardView from "./AdminBookingCardView";

const AdminView = () => {
  const [bookings, setBookings] = useState(null);
  const [cleaners, setCleaners] = useState(null);
  const [customers, setCustomers] = useState(null);
  const [bookingView, setBookingView] = useState(false);
  const [currentViewBooking, setCurrentViewBooking] = useState(null);

  // useEffect(() => {
  //   if (!bookings) {
  //     fetch("http://localhost:8080/admin/booking", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + localStorage.getItem("token"),
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setBookings(data);
  //       });
  //   }
  //   if (!cleaners) {
  //     fetch("http://localhost:8080/admin/cleaner", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + localStorage.getItem("token"),
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setCleaners(data);
  //       });
  //   }
  //   if (!customers) {
  //     fetch("http://localhost:8080/admin/customer", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + localStorage.getItem("token"),
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setCustomers(data);
  //       });
  //   }
  // }, [bookings, cleaners, customers]);

  useEffect(() => {
    if (!cleaners) {
      fetch("http://localhost:8080/admin/cleaner", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCleaners(data);
        });
    }
  }, [cleaners]);

  useEffect(() => {
    if (!customers) {
      fetch("http://localhost:8080/admin/customer", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCustomers(data);
        });
    }
  }, [customers]);

  const handleCheckBox = (e, b) => {
    const bookingsCopy = [...bookings];
    bookingsCopy.forEach((booking) => {
      if (booking.bookingId === b.bookingId && e.target.checked) {
        booking.status = "confirmed";
      }
    });
    setBookings(bookingsCopy);
  };

  const handleChange = (e, b) => {
    const bookingsCopy = [...bookings];
    bookingsCopy.forEach((booking) => {
      if (booking.bookingId === b.bookingId) {
        booking.cleanerId = e.target.value;
      }
    });
    setBookings(bookingsCopy);
  };

  const handleClick = (booking) => {
    fetch(`http://localhost:8080/booking/${booking.bookingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
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

  const findAvailableCleaners = (b) => {
    return cleaners.filter((cleaner) => {
      let isAvailable = true;
      bookings.forEach((booking) => {
        if (cleaner.id === booking.cleanerId && booking.date === b.date) {
          // check time ?  && (booking.time === b.time || diff between booking.time and b.time is less than 2h)
          isAvailable = false;
        }
      });

      if (isAvailable) {
        return cleaner;
      } else {
        return null;
      }
    });
  };

  return (
    <div>
      {bookingView ? (
        <AdminBookingCardView
          booking={currentViewBooking.booking}
          cleaner={currentViewBooking.cleaner}
          cleaners={cleaners}
          bookings={bookings}
          setBookings={setBookings}
          setBookingView={setBookingView}
        />
      ) : null}
      {cleaners && customers && bookings
        ? bookings.map((booking, index) => {
            return (
              <ListItem key={booking.bookingId}>
                <ListItemButton>
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
            Customer: ${
              customers.find((c) => c.id === booking.customerId)?.name
            } * 
            Adress: ${booking.address} *
            Date: ${booking.date} *
            Time: ${booking.time} *
            Description: ${booking.description} *
            Feedback: ${booking.service} *
            ${booking.workingTime} hr/hrs *
            ${booking.status} status
           
            `}
                  />

                  <div>
                    {booking.status === "Unconfirmed" ||
                    booking.status === "UnConfirmed" ? (
                      <div>
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
                            {findAvailableCleaners(booking).map((cleaner) => (
                              <MenuItem key={cleaner.id} value={cleaner.id}>
                                {cleaner.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <Checkbox
                          onChange={(e) => handleCheckBox(e, booking)}
                          inputProps={{ "aria-label": "controlled" }}
                          checked={false}
                        />
                      </div>
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
