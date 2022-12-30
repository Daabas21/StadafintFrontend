import { useState, useEffect } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Typography,
} from "@mui/material";
import SearchBar from "../../common/SearchBar";
import AdminCustomerCard from "./AdminCustomerCard";

const AdminCustomerView = () => {
  const [customers, setCustomers] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [bookingView, setBookingView] = useState(false);
  const [currentViewBooking, setCurrentViewBooking] = useState(null);

  useEffect(() => {
    setFilteredData(customers);

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
          console.log(data);
        });
    }
  }, [customers]);

  const toggleBookingView = (customer) => {
    console.log("IS CLICKED", customer);
    setBookingView(true);
    setCurrentViewBooking({
      customer: customer,
    });
  };

  return (
    <div>
      <Typography id="modal-modal-title" variant="h4" align="center">
        Customer
      </Typography>
      <SearchBar
        users={customers}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
      />
      {bookingView ? (
        <AdminCustomerCard
          customer={currentViewBooking.customer}
          customers={customers}
          setCustomers={setCustomers}
          setBookingView={setBookingView}
        />
      ) : null}
      {filteredData
        ? filteredData.map((customer) => {
            return (
              <ListItem key={customer.id}>
                <ListItemButton>
                  <ListItemText
                    primary={
                      <Button onClick={() => toggleBookingView(customer)}>
                        <Typography variant="h6" style={{ color: "#1976d2" }}>
                          Customer: {customer.name}
                        </Typography>
                      </Button>
                    }
                    secondary={`ID: ${customer.id} * Adress: ${customer.address} * Email: ${customer.email} * Phonenumber: ${customer.telnum} *
        
           
            `}
                  />
                </ListItemButton>
              </ListItem>
            );
          })
        : null}
    </div>
  );
};

export default AdminCustomerView;
