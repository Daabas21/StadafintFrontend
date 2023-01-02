import {useEffect, useState} from "react";
import { IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {DataGrid} from '@mui/x-data-grid';

import BookingHistory from "./BookingHistory";


const CustomerBookings = () => {
    const [bookingList, setBookingList] = useState([]);
    const [customerId, setCustomerId] = useState(0);

    useEffect(() => {
        fetch("http://localhost:8080/customer/1", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setCustomerId(data.id);
            });
        getData().then((r) => r);
    }, [customerId]);

    const getData = async () => {
        let res = await fetch(
            `http://localhost:8080/customer/${customerId}/booking`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        );
        let data = await res.json();

        setBookingList(data);
    };

    const handleDelete = async (id) => {
        const choice = window.confirm(
            "Are you sure you want to delete this booking? This action can not be undone."
        );
        if (choice) {
            await fetch(`http://localhost:8080/customer/booking/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            await getData();
        }
    };

    const onClick = (e, row) => {
        e.stopPropagation();
        handleDelete(row.bookingId)
    };

    const columns = [
        { field: 'address', headerName: 'Address', width: 200 },
        { field: 'date', headerName: 'Date', width: 200 },
        { field: 'time', headerName: 'Time', width: 200 },
        { field: 'service', headerName: 'Service', width: 180 },
        { field: 'status', headerName: 'Status', width: 200 },
        { field: 'actions', headerName: 'Unbook', width: 200,
            renderCell: (params) => {
                return (
                    <IconButton
                        variant="outlined"
                        color="error"
                        onClick={(e) => onClick(e, params.row)}
                    >
                        <CloseIcon/>
                    </IconButton>
                );
            }
        }
    ];

    return (
        <div
            style={{
                margin: 20,
                textAlign: "center"
            }}
        >
            <Typography
                id="title"
                component="h1"
                variant="h5"
                marginTop={2}
                marginBottom={2}
            >
                Bookings
            </Typography>

            <div style={{height: 400, width: '100%'}}>
                <DataGrid
                    rows={bookingList.filter(booking => booking.status !== "Performed")}
                    getRowId={(row) => row?.bookingId}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>

            <BookingHistory bookingList={bookingList}/>

        </div>
    );
};

export default CustomerBookings;
