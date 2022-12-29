import { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";

const SearchBar = (props) => {
  const { cleaners, setFilteredData } = props;

  const handleChange = (e) => {
    const searchInput = e.target.value;
    console.log(searchInput);

    const newFilter = cleaners.filter((c) => {
      return c.name.toLowerCase().includes(searchInput.toLowerCase());
    });

    setFilteredData(newFilter);
  };
  return (
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
        type="search"
        id="outlined-basic"
        label="Search By Name"
        variant="outlined"
        onChange={handleChange}
        //   value={searchInput}
      />
    </Box>
  );
};

export default SearchBar;
