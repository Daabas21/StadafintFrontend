import * as React from "react";
import {
  ListItemText,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  ListItem,
} from "@mui/material";
import CardView from "../../common/CardView";

const AdminCustomerCard = ({
  customer,
  customers,
  setBookingView,
  setCustomers,
}) => {
  const usertype = "customer";

  //   const handleChange = (e, c) => {
  //     c[e.target.name] = e.target.value;

  //     let customerCopy = [...customers];

  //     customerCopy[customerCopy.findIndex((cl) => cl.id === c.id)] = { ...c };

  //     setCustomers(customerCopy);
  //     console.log(customerCopy);
  //   };

  //   const handleClick = (customer) => {
  //     fetch(`http://localhost:8080/admin/customer/${customer.id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: "Bearer " + localStorage.getItem("token"),
  //       },
  //       body: JSON.stringify(customer),
  //     }).catch((e) => console.log(e));

  //     setBookingView(false);
  //   };

  return (
    <CardView
      user={customer}
      users={customers}
      setBookingView={setBookingView}
      setUsers={setCustomers}
      usertype={usertype}
    />
    // <Card sx={{ minWidth: 275 }}>
    //   <CardContent>
    //     <ListItemText
    //       primary={
    //         <Typography variant="h6" style={{ color: "#1976d2" }}>
    //           ID:{customer.id} - {customer.name.toUpperCase()}
    //         </Typography>
    //       }
    //     />
    //     <ListItemText
    //       secondary={
    //         <Typography style={{ color: "#1976d2" }}>
    //           Email: {customer.email}
    //         </Typography>
    //       }
    //     />
    //     <ListItemText
    //       secondary={
    //         <Typography style={{ color: "#1976d2" }}>
    //           Role: {customer.roles}
    //         </Typography>
    //       }
    //     />
    //     <div
    //       style={{
    //         display: "flex",
    //         flexDirection: "column",
    //         width: 200,
    //         gap: 12,
    //         marginTop: 15,
    //       }}
    //     >
    //       <TextField
    //         id="outlined-basic"
    //         variant="outlined"
    //         label={customer.address}
    //         defaultValue={customer.address}
    //         name="address"
    //         onChange={(e) => handleChange(e, customer)}
    //       />
    //       <TextField
    //         id="outlined-basic"
    //         variant="outlined"
    //         label={customer.telnum}
    //         defaultValue={customer.telnum}
    //         name="telnum"
    //         onChange={(e) => handleChange(e, customer)}
    //       />
    //     </div>
    //   </CardContent>
    //   <CardActions>
    //     <Button
    //       sx={{ marginLeft: 1 }}
    //       type={"submit"}
    //       color={"primary"}
    //       variant={"outlined"}
    //       onClick={() => handleClick(customer)}
    //     >
    //       Save
    //     </Button>
    //   </CardActions>
    // </Card>
  );
};

export default AdminCustomerCard;
