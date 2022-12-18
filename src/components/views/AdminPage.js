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
} from "@mui/material";

const AdminPage = () => {
  const [bookings, setBookings] = useState([]);
  const [cleaners, setCleaners] = useState([]);

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

  return (
    <div>
      {bookings.map((booking, index) => {
        return (
          <ListItem key={booking.bookingId}>
            <ListItemButton>
              <ListItemText
                primary={`${index + 1}: Booking Id: ${booking.bookingId} 
            Cleaner: ${booking.cleanerId} 
            Customer: ${booking.customerId}  
            Date: ${booking.date} 
            Time: ${booking.time}
            Adress: ${booking.address}
            Description: ${booking.description}
            Service: ${booking.service}
            Work hour/s: ${booking.workingTime} 
            
            `}
              />

              <InputLabel id="demo-simple-select-label">Cleaners</InputLabel>
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
      })}
    </div>
  );
};

export default AdminPage;
