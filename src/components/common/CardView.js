import React from "react";
import {
  ListItemText,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";

const CardView = (props) => {
  const { user, users, setBookingView, setUsers, usertype } = props;

  const handleChange = (e, c) => {
    c[e.target.name] = e.target.value;

    let userCopy = [...users];

    userCopy[userCopy.findIndex((cl) => cl.id === c.id)] = { ...c };

    setUsers(userCopy);
  };

  const handleClick = (user) => {
    fetch(`http://localhost:8080/admin/${usertype}/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: user.name,
        address: user.address,
        telnum: user.telnum,
        email: user.email,
        password: user.password,
      }),
    }).catch((e) => console.log(e));

    setBookingView(false);
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <ListItemText
          primary={
            <Typography variant="h6" style={{ color: "#1976d2" }}>
              ID:{user.id} - {user.name.toUpperCase()}
            </Typography>
          }
        />
        <ListItemText
          secondary={
            <Typography style={{ color: "#1976d2" }}>
              Email: {user.email}
            </Typography>
          }
        />
        <ListItemText
          secondary={
            <Typography style={{ color: "#1976d2" }}>
              Role: {user.roles}
            </Typography>
          }
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 200,
            gap: 12,
            marginTop: 15,
          }}
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            label={user.address}
            defaultValue={user.address}
            name="address"
            onChange={(e) => handleChange(e, user)}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            label={user.telnum}
            defaultValue={user.telnum}
            name="telnum"
            onChange={(e) => handleChange(e, user)}
          />
        </div>
      </CardContent>
      <CardActions>
        <Button
          sx={{ marginLeft: 1 }}
          type={"submit"}
          color={"primary"}
          variant={"contained"}
          onClick={() => handleClick(user)}
        >
          Save
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardView;
