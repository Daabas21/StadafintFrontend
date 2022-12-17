import { Routes, Route } from "react-router-dom";
import CleanerView from "./views/CleanerView";
import CustomerView from "./views/CustomerView";
import RegisterUser from "./views/RegisterUser";
import RegisterBooking from "./views/RegisterBooking";

function AppRouter() {
  return (
    <Routes>
      <Route path="/cleaner" element={<CleanerView />} />
      <Route path="/customer/1" element={<CustomerView />} />
      <Route path="/user" element={<RegisterUser />} />
        <Route path="/booking" element={<RegisterBooking />} />
        <Route path="/login" element={<CustomerView />} />
        {/* Add log in component here Hassan */}
    </Routes>
  );
}

export default AppRouter;
