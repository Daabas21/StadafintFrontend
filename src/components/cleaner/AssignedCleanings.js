import React, {useEffect, useState} from 'react'
import {IconButton, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import DoneIcon from '@mui/icons-material/Done';


const AssignedCleanings = () => {

    const [myBooking, setMyBooking] = useState([])

    useEffect(() => {

        const getBookings = () => {
            fetch(`http://localhost:8080/cleaner/1/booking`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
                .then(res => res.json())
                .then(data => data.sort((a, b) => Date.parse(a.date) - Date.parse(b.date)))
                .then(booking => setMyBooking(booking))
        }

        getBookings();

    }, [])


    const handleDone = (id) => {

        fetch(`http://localhost:8080/cleaner/${id}/booking`, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => res.json())

        setTimeout(() => {

            fetch(`http://localhost:8080/cleaner/1/booking`, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
                .then(res => res.json())
                .then(data => data.sort((a, b) => Date.parse(a.date) - Date.parse(b.date)))
                .then(booking => setMyBooking(booking))
        }, [500])


    }

    const onClick = (e, row) => {
        e.stopPropagation();
        handleDone(row.bookingId)
    };


    const columns = [
            {field: 'address', headerName: 'Address', width: 200},
            {field: 'date', headerName: 'Date', width: 200},
            {field: 'time', headerName: 'Time', width: 200},
            {field: 'service', headerName: 'Service', width: 180},
            {field: 'status', headerName: 'Status', width: 200},
            {field: 'workingTime', headerName: 'Working hours',type: 'number', width: 200,
                headerAlign: 'left',
                align: 'left'
            },
            {
                field: 'actions', headerName: 'Mark as Done', width: 200,
                renderCell: (params) => {
                    if (params.row.status === "confirmed" || params.row.status === "Under construction") {
                        return <IconButton
                            color="success"
                            onClick={(e) => onClick(e, params.row)}
                        >
                            <DoneIcon/>
                        </IconButton>
                    } else
                        return <IconButton disabled>
                            <DoneIcon/>
                        </IconButton>
                }
            }
    ];

    return (
        <div style={{
            textAlign: "center",
            margin: 20
        }}>
            <Typography
                id="title"
                component="h1"
                variant="h5"
                marginTop={2}
                marginBottom={2}
            >
                Assigned Cleanings
            </Typography>
            <div style={{height: 400, width: '100%'}}>
                <DataGrid
                    rows={myBooking}
                    getRowId={(row) => row?.bookingId}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </div>
    )
}

export default AssignedCleanings