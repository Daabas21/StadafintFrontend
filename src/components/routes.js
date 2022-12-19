import { Routes, Route } from "react-router-dom";
import CleanerView from "./views/CleanerView";
import CustomerView from "./views/CustomerView";
import RegisterUser from "./views/RegisterUser";
import AdminPage from "./views/AdminPage";
import RegisterBooking from "./views/RegisterBooking";
import Home from "./views/Home";

function AppRouter() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
      <Route path="/cleaner" element={<CleanerView />} />
      <Route path="/customer" element={<CustomerView />} />
      <Route path="/registeruser" element={<RegisterUser />} />
      <Route path="/adminpage" element={<AdminPage />} />
      <Route path="/login" element={<CustomerView />} />
      <Route path="/booking" element={<RegisterBooking />} />
      <Route path="/logout" element={<CustomerView />} />
      {/* Add log in component here Hassan */}
    </Routes>
  );
}

export default AppRouter;
