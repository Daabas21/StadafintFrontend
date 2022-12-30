import * as React from "react";
import CardView from "../../common/CardView";

const AdminCleanerCard = ({
  cleaner,
  cleaners,
  setBookingView,
  setCleaners,
}) => {
  const usertype = "cleaner";

  return (
    <CardView
      user={cleaner}
      users={cleaners}
      setBookingView={setBookingView}
      setUsers={setCleaners}
      usertype={usertype}
    />
  );
};

export default AdminCleanerCard;
