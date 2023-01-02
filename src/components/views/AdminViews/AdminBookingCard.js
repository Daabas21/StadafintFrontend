import * as React from "react";
import {
  ListItemText,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  InputLabel,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const AdminBookingCard = (props) => {
  const { booking, cleaner, cleaners, bookings, setBookings, setBookingView } =
    props;

  const handleChange = (e, b, handleDateTime, componentName) => {
    if (handleDateTime) {
      b[componentName] =
        componentName === "date"
          ? e.$d.toLocaleDateString("en-CA")
          : `${e.$d.toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}:00`;
    } else {
      b[e.target.name] = e.target.value;
    }

    let bookingsCopy = [...bookings];

    bookingsCopy[
      bookingsCopy.findIndex((bk1) => bk1.bookingId === b.bookingId)
    ] = { ...b };

    setBookings(bookingsCopy);
  };
  const handleClick = (e) => {
    fetch(`http://localhost:8080/admin/booking/${booking.bookingId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => setBookingView(false));
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <ListItemText
          primary={
            <Typography variant="h6" style={{ color: "#1976d2" }}>
              BOOKING ID: {booking.bookingId}
            </Typography>
          }
        />
        <FormControl sx={{ minWidth: 110 }}>
          <InputLabel id="demo-simple-select-label">Cleaner</InputLabel>
          <Select
            sx={{ minWidth: 140 }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="cleanerId"
            label="Cleaner"
            defaultValue={cleaner.name}
            onChange={(e) => handleChange(e, booking)}
          >
            {cleaners.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          id="outlined-basic"
          variant="outlined"
          label={booking.address}
          defaultValue={booking.address}
          name="address"
          onChange={(e) => handleChange(e, booking)}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={booking.date}
            value={booking.date}
            onChange={(value) => handleChange(value, booking, true, "date")}
            renderInput={(props) => (
              <TextField {...props} helperText={"mm/dd/yy"} />
            )}
            closeOnSelect
          />

          <TimePicker
            label={`${booking.date}T${booking.time}`}
            value={`${booking.date}T${booking.time}`}
            ampm={false}
            inputFormat="HH:mm:ss"
            onChange={(value) => handleChange(value, booking, true, "time")}
            renderInput={(params) => (
              <TextField {...params} helperText={"HH:mm:ss"} />
            )}
            closeOnSelect
          />
        </LocalizationProvider>
      </CardContent>
      <CardActions>
        <Button
          type={"submit"}
          color={"primary"}
          variant={"contained"}
          onClick={handleClick}
          margin="normal"
        >
          Save
        </Button>
      </CardActions>
    </Card>
  );
};

export default AdminBookingCard;
