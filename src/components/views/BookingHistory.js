import {
    Button,
    Card,
    CardActions,
    CardContent, Collapse,
    Grid,
    List,
    ListItemButton, ListItemIcon, ListItemText,
    ListSubheader,
    Typography
} from "@mui/material";
import {useState} from "react";

const BookingHistory = ({ bookingList, setBookingList }) => {


    const [openApproved, setOpenApproved] = useState(true);

    const handleClickApproved = () => {
        setOpenApproved(!openApproved);
    };


    let bookings = [...bookingList]

    // console.log(bookings)
    //
    // const map = (bookings) => {
    //     bookings
    //         .filter(booking => booking.status == "Approved")
    //         .map((booking) => console.log(booking.status))
    // }
    //
    // map(bookings);
    return(
        <div>
            <Typography
                id="title"
                component="h1"
                variant="h5"
                marginTop={2}
                marginBottom={2}
            >
                Booking History
            </Typography>
            {/*<Grid container spacing={2} wrap={"wrap"} justifyContent={"center"}>*/}
            {/*    /!*SHOULD BE PERFORMED (but we don't have anything at the moment*!/*/}
            {/*    {bookings.filter(booking => booking.status === "Approved")*/}
            {/*        .map((booking, index) => {*/}
            {/*        return (*/}
            {/*            <Grid item key={booking.bookingId}>*/}
            {/*                <Card*/}
            {/*                    key={booking.id}*/}
            {/*                    sx={{ minWidth: 250, marginTop: 2, textAlign: "center" }}*/}
            {/*                >*/}
            {/*                    <CardContent>*/}
            {/*                        <Typography*/}
            {/*                            sx={{ fontSize: 14 }}*/}
            {/*                            color="text.secondary"*/}
            {/*                            gutterBottom*/}
            {/*                        >*/}
            {/*                            {booking.date}*/}
            {/*                        </Typography>*/}
            {/*                        <Typography variant="h5" component="div">*/}
            {/*                            {booking.address}*/}
            {/*                        </Typography>*/}
            {/*                        <Typography sx={{ mb: 1.5 }} color="text.secondary">*/}
            {/*                            {booking.time}*/}
            {/*                        </Typography>*/}
            {/*                        <Typography variant="body2">*/}
            {/*                            Service: {booking.service ? booking.service : "none"}*/}
            {/*                            <br />*/}
            {/*                            Status: {booking.status}*/}
            {/*                            /!*<br/>*!/*/}
            {/*                            /!*Description: {booking.description ? booking.description : "none"}*!/*/}
            {/*                        </Typography>*/}
            {/*                    </CardContent>*/}
            {/*                    /!*<CardActions sx={{ justifyContent: "center" }}>*!/*/}
            {/*                    /!*    <Button*!/*/}
            {/*                    /!*        variant="outlined"*!/*/}
            {/*                    /!*        color="error"*!/*/}
            {/*                    /!*        onClick={() => handleDelete(booking.bookingId)}*!/*/}
            {/*                    /!*    >*!/*/}
            {/*                    /!*        Unbook*!/*/}
            {/*                    /!*    </Button>*!/*/}
            {/*                    /!*</CardActions>*!/*/}
            {/*                </Card>*/}
            {/*            </Grid> );*/}
            {/*    })}*/}
            {/*    </Grid>*/}

            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                // subheader={
                //     <ListSubheader component="div" id="nested-list-subheader">
                //         Bookings History
                //     </ListSubheader>
                // }
            >

                <ListItemButton>
                    <ListItemIcon>
                        {/*<SendIcon />*/}
                    </ListItemIcon>
                    <ListItemText primary="Sent mail" />
                </ListItemButton>
                {/*<Collapse in={open} timeout="auto" unmountOnExit>*/}
                {/*    <List component="div" disablePadding>*/}
                {/*        {bookings.filter(booking => booking.status === "Approved")*/}
                {/*            .map((booking, index) => {*/}
                {/*                return (*/}
                {/*                    <Grid item key={booking.bookingId}>*/}
                {/*                        <Card*/}
                {/*                            key={booking.id}*/}
                {/*                            sx={{ minWidth: 250, marginTop: 2, textAlign: "center" }}*/}
                {/*                        >*/}
                {/*                            <CardContent>*/}
                {/*                                <Typography*/}
                {/*                                    sx={{ fontSize: 14 }}*/}
                {/*                                    color="text.secondary"*/}
                {/*                                    gutterBottom*/}
                {/*                                >*/}
                {/*                                    {booking.date}*/}
                {/*                                </Typography>*/}
                {/*                                <Typography variant="h5" component="div">*/}
                {/*                                    {booking.address}*/}
                {/*                                </Typography>*/}
                {/*                                <Typography sx={{ mb: 1.5 }} color="text.secondary">*/}
                {/*                                    {booking.time}*/}
                {/*                                </Typography>*/}
                {/*                                <Typography variant="body2">*/}
                {/*                                    Service: {booking.service ? booking.service : "none"}*/}
                {/*                                    <br />*/}
                {/*                                    Status: {booking.status}*/}
                {/*                                    /!*<br/>*!/*/}
                {/*                                    /!*Description: {booking.description ? booking.description : "none"}*!/*/}
                {/*                                </Typography>*/}
                {/*                            </CardContent>*/}
                {/*                            /!*<CardActions sx={{ justifyContent: "center" }}>*!/*/}
                {/*                            /!*    <Button*!/*/}
                {/*                            /!*        variant="outlined"*!/*/}
                {/*                            /!*        color="error"*!/*/}
                {/*                            /!*        onClick={() => handleDelete(booking.bookingId)}*!/*/}
                {/*                            /!*    >*!/*/}
                {/*                            /!*        Unbook*!/*/}
                {/*                            /!*    </Button>*!/*/}
                {/*                            /!*</CardActions>*!/*/}
                {/*                        </Card>*/}
                {/*                    </Grid> );*/}
                {/*            })}*/}


                {/*        <ListItemButton sx={{ pl: 4 }}>*/}
                {/*            <ListItemIcon>*/}
                {/*                /!*<StarBorder />*!/*/}
                {/*            </ListItemIcon>*/}
                {/*            <ListItemText primary="Starred" />*/}
                {/*        </ListItemButton>*/}
                {/*    </List>*/}
                {/*</Collapse>*/}

                <ListItemButton>
                    <ListItemIcon>
                        {/*<DraftsIcon />*/}
                    </ListItemIcon>
                    <ListItemText primary="Drafts" />
                </ListItemButton>
                <ListItemButton onClick={handleClickApproved}>
                    <ListItemIcon>
                        {/*<InboxIcon />*/}
                    </ListItemIcon>
                    <ListItemText primary="Approved" />
                    {/*{open ? <ExpandLess /> : <ExpandMore />}*/}
                </ListItemButton>
                <Collapse in={openApproved} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {bookings.filter(booking => booking.status === "Approved")
                            .map((booking, index) => {
                                return (
                                    <Grid item key={booking.bookingId}>
                                        <Card
                                            key={booking.id}
                                            sx={{ minWidth: 250, marginTop: 2, textAlign: "center" }}
                                        >
                                            <CardContent>
                                                <Typography
                                                    sx={{ fontSize: 14 }}
                                                    color="text.secondary"
                                                    gutterBottom
                                                >
                                                    {booking.date}
                                                </Typography>
                                                <Typography variant="h5" component="div">
                                                    {booking.address}
                                                </Typography>
                                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                    {booking.time}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Service: {booking.service ? booking.service : "none"}
                                                    <br />
                                                    Status: {booking.status}
                                                    {/*<br/>*/}
                                                    {/*Description: {booking.description ? booking.description : "none"}*/}
                                                </Typography>
                                            </CardContent>
                                            {/*<CardActions sx={{ justifyContent: "center" }}>*/}
                                            {/*    <Button*/}
                                            {/*        variant="outlined"*/}
                                            {/*        color="error"*/}
                                            {/*        onClick={() => handleDelete(booking.bookingId)}*/}
                                            {/*    >*/}
                                            {/*        Unbook*/}
                                            {/*    </Button>*/}
                                            {/*</CardActions>*/}
                                        </Card>
                                    </Grid> );
                            })}


                        {/*<ListItemButton sx={{ pl: 4 }}>*/}
                        {/*    <ListItemIcon>*/}
                        {/*        /!*<StarBorder />*!/*/}
                        {/*    </ListItemIcon>*/}
                        {/*    <ListItemText primary="Starred" />*/}
                        {/*</ListItemButton>*/}
                    </List>
                </Collapse>
            </List>


                </div>
    )
}

export default BookingHistory;