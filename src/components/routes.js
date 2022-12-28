import { Routes, Route } from "react-router-dom";
import CleanerView from "./views/CleanerView";
import CustomerView from "./views/CustomerView";
import RegisterUser from "./views/RegisterUser";
import AdminView from "./views/AdminView";
import RegisterBooking from "./views/RegisterBooking";
import Login from "./views/Login";
import Home from "./views/Home";
import CustomerBookings from "./views/CustomerBookings";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cleaner" element={<CleanerView />} />
      <Route path="/customer" element={<CustomerView />} />
      <Route path="/registeruser" element={<RegisterUser />} />
      <Route path="/admin" element={<AdminView />} />
      <Route path="/booking" element={<RegisterBooking />} />
      <Route path="/my-bookings" element={<CustomerBookings />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Login logout={true} />} />
    </Routes>
  );
}

export default AppRouter;
