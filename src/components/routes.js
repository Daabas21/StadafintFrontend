import { Routes, Route } from "react-router-dom";
import CleanerView from "./views/CleanerView";
import CustomerView from "./views/CustomerView";
import RegisterUser from "./views/RegisterUser";
import AdminPage from "./views/AdminPage";
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
      <Route path="/adminpage" element={<AdminPage />} />
      <Route path="/register-booking" element={<RegisterBooking />} />
        <Route path="/bookings" element={<CustomerBookings />} />
      <Route path="/logout" element={<CustomerView />} />
      {/* Add log in component here Hassan */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default AppRouter;
