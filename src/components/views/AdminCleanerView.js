import { useState, useEffect } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Typography,
  TextField,
  Box,
} from "@mui/material";

const AdminCleanerView = () => {
  const [cleaners, setCleaners] = useState(null);
  const [searchInput, setSearchInput] = useState("");

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
          console.log(data);
        });
    }
  }, [cleaners]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    console.log(searchInput);
  };

  const handleClick = () => {
    console.log("clicked");

    if (searchInput.length > 0) {
      cleaners.filter((c) => {
        return c.name.match(searchInput);
      });
    }
  };

  return (
    <div>
      <Typography id="modal-modal-title" variant="h4" align="center">
        Cleaners
      </Typography>
      <Box
        sx={{
          minwidth: 400,
          display: "flex",
          justifyContent: "center",
          gap: 2,
          margin: 4,
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search By Name"
          variant="outlined"
          onChange={handleChange}
          value={searchInput}
        />
        <Button
          color={"primary"}
          variant={"outlined"}
          onClick={handleClick}
          margin="normal"
        >
          Search
        </Button>
      </Box>

      {cleaners != null
        ? cleaners.map((cleaner) => {
            return (
              <ListItem key={cleaner.id}>
                <ListItemButton>
                  <ListItemText
                    primary={
                      <Button onClick={handleClick}>
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
