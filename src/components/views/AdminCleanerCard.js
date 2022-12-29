import * as React from "react";
import {
  ListItemText,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";

const AdminCleanerCard = ({
  cleaner,
  cleaners,
  setBookingView,
  setCleaners,
}) => {
  const handleChange = (e, c) => {
    c[e.target.name] = e.target.value;

    let cleanerCopy = [...cleaners];

    cleanerCopy[cleanerCopy.findIndex((cl) => cl.id === c.id)] = { ...c };

    setCleaners(cleanerCopy);
    console.log(cleanerCopy);
  };

  const handleClick = (cleaner) => {
    fetch(`http://localhost:8080/admin/${cleaner.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(cleaners),
    });

    setBookingView(false);
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <ListItemText
          primary={
            <Typography variant="h6" style={{ color: "#1976d2" }}>
              ID:{cleaner.id} - {cleaner.name.toUpperCase()}
            </Typography>
          }
        />
        <ListItemText
          secondary={
            <Typography style={{ color: "#1976d2" }}>
              Email: {cleaner.email}
            </Typography>
          }
        />
        <ListItemText
          secondary={
            <Typography style={{ color: "#1976d2" }}>
              Role: {cleaner.roles}
            </Typography>
          }
        />
        <ListItemText
          sx={{ marginTop: 2 }}
          secondary={
            <TextField
              id="outlined-basic"
              variant="outlined"
              label={cleaner.address}
              defaultValue={cleaner.address}
              name="address"
              onChange={(e) => handleChange(e, cleaner)}
            />
          }
        />
        <ListItemText
          sx={{ marginTop: 2 }}
          secondary={
            <TextField
              id="outlined-basic"
              variant="outlined"
              label={cleaner.telnum}
              defaultValue={cleaner.telnum}
              name="telnum"
              onChange={(e) => handleChange(e, cleaner)}
            />
          }
        />
      </CardContent>
      <CardActions>
        <Button
          sx={{ marginLeft: 1 }}
          type={"submit"}
          color={"primary"}
          variant={"outlined"}
          onClick={() => handleClick(cleaner)}
        >
          Save
        </Button>
      </CardActions>
    </Card>
  );
};

export default AdminCleanerCard;
