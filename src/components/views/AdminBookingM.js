import * as React from "react";
import {
  Box,
  ListItemText,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const AdminBookingM = (props) => {
  const { booking, customer, cleaner, cleaners } = props;

  const handleChange = () => {
    console.log("handel on change");
  };

  console.log(booking, cleaners);
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
        <FormControl sx={{ m: 1, minWidth: 110 }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cleaner.name}
            label="Cleaners Name"
            onChange={handleChange}
          >
            {cleaners.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* <TextField
          id="cleanername"
          label="Cleaners Name"
          variant="standard"
          value={cleaner.name}
          name="name"
          onChange={handleChange}
        />
        <TextField
          id="cleanername"
          label="Cleaners Name"
          variant="standard"
          value={cleaner.name}
          name="name"
          onChange={handleChange}
        /> */}
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {booking.address}
        </Typography>
        <Typography variant="h5" component="div">
          {customer?.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {cleaner?.name}
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default AdminBookingM;
