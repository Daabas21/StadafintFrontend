import * as React from "react";
import CardView from "../../common/CardView";

const AdminCustomerCard = ({
  customer,
  customers,
  setBookingView,
  setCustomers,
}) => {
  const usertype = "customer";

  return (
    <CardView
      user={customer}
      users={customers}
      setBookingView={setBookingView}
      setUsers={setCustomers}
      usertype={usertype}
    />
  );
};

export default AdminCustomerCard;
