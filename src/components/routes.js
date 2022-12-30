import { Routes, Route } from "react-router-dom";
import CleanerView from "./views/CleanerView";
import CustomerView from "./views/CustomerView";
import RegisterUser from "./views/RegisterUser";
import AdminView from "./views/AdminViews/AdminView";
import AdminCleanerView from "./views/AdminViews/AdminCleanerView";
import AdminCustomerView from "./views/AdminViews/AdminCustomerView";
import RegisterBooking from "./views/RegisterBooking";
import Login from "./views/Login";
import Home from "./views/Home";
import CustomerBookings from "./views/CustomerBookings";
import CleanerViewBookings from "./views/CleanerViewBookings";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cleaner" element={<CleanerView />} />
      <Route path="/cleanerbookings" element={<CleanerViewBookings />} />
      <Route path="/customer" element={<CustomerView />} />
      <Route path="/registeruser" element={<RegisterUser />} />
      <Route path="/admin" element={<AdminView />} />
      <Route path="/admincleaners" element={<AdminCleanerView />} />
      <Route path="/admincustomers" element={<AdminCustomerView />} />
      <Route path="/booking" element={<RegisterBooking />} />
      <Route path="/my-bookings" element={<CustomerBookings />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Login logout={true} />} />
    </Routes>
  );
}

export default AppRouter;
