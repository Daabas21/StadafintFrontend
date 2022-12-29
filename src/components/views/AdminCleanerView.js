import { useState, useEffect } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Typography,
  //   TextField,
  //   Box,
} from "@mui/material";
import SearchBar from "../common/SearchBar";
import AdminCleanerCard from "./AdminCleanerCard";

const AdminCleanerView = () => {
  const [cleaners, setCleaners] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [bookingView, setBookingView] = useState(false);
  const [currentViewBooking, setCurrentViewBooking] = useState(null);

  useEffect(() => {
    setFilteredData(cleaners);

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
          console.log(data);
        });
    }
  }, [cleaners]);

  //   const handleChange = (e) => {
  //     const searchInput = e.target.value;
  //     console.log(searchInput);
  //     const newFilter = cleaners.filter((c) => {
  //       return c.name.toLowerCase().includes(searchInput.toLowerCase());
  //     });

  //     setFilteredData(newFilter);

  //     // if (searchInput === "") {
  //     //   setFilteredData([]);
  //     // } else {
  //     //   setFilteredData(newFilter);
  //     // }
  //   };

  const toggleBookingView = (cleaner) => {
    console.log("IS CLICKED", cleaner);
    setBookingView(true);
    setCurrentViewBooking({
      cleaner: cleaner,
    });
  };

  return (
    <div>
      <Typography id="modal-modal-title" variant="h4" align="center">
        Cleaners
      </Typography>
      {/* <Box
        sx={{
          minwidth: 400,
          display: "flex",
          justifyContent: "center",
          gap: 2,
          margin: 4,
        }}
      >
        <TextField
          type="search"
          id="outlined-basic"
          label="Search By Name"
          variant="outlined"
          onChange={handleChange}
          //   value={searchInput}
        />
      </Box> */}
      <SearchBar
        cleaners={cleaners}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
      />
      {bookingView ? (
        <AdminCleanerCard
          cleaner={currentViewBooking.cleaner}
          cleaners={cleaners}
          setCleaners={setCleaners}
          setBookingView={setBookingView}
        />
      ) : null}
      {filteredData
        ? filteredData.map((cleaner) => {
            return (
              <ListItem key={cleaner.id}>
                <ListItemButton>
                  <ListItemText
                    primary={
                      <Button onClick={() => toggleBookingView(cleaner)}>
                        <Typography variant="h6" style={{ color: "#1976d2" }}>
                          Cleaner: {cleaner.name}
                        </Typography>
                      </Button>
                    }
                    secondary={`ID: ${cleaner.id} * Adress: ${cleaner.address} * Email: ${cleaner.email} * Phonenumber: ${cleaner.telnum} *   Role: ${cleaner.roles} *  
        
           
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

export default AdminCleanerView;
