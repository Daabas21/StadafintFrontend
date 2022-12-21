import { Routes, Route } from "react-router-dom";
import CleanerView from "./views/CleanerView";
import CustomerView from "./views/CustomerView";
import RegisterUser from "./views/RegisterUser";
import AdminView from "./views/AdminView";
import RegisterBooking from "./views/RegisterBooking";
import Login from "./views/Login";
import Home from "./views/Home";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cleaner" element={<CleanerView />} />
      <Route path="/customer" element={<CustomerView />} />
      <Route path="/registeruser" element={<RegisterUser />} />
      <Route path="/admin" element={<AdminView />} />
      <Route path="/booking" element={<RegisterBooking />} />
      <Route path="/logout" element={<CustomerView />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default AppRouter;
