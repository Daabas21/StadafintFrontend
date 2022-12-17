import { Routes, Route } from "react-router-dom";
import CleanerView from "./views/CleanerView";
import CustomerView from "./views/CustomerView";
import RegisterUser from "./views/RegisterUser";
import AdminPage from "./views/AdminPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/cleaner" element={<CleanerView />} />
      <Route path="/customer" element={<CustomerView />} />
      <Route path="/RegisterUser" element={<RegisterUser />} />
      <Route path="/AdminPage" element={<AdminPage />} />
      <Route path="/login" element={<CustomerView />} />
      <Route path="/logout" element={<CustomerView />} />
      {/* Add log in component here Hassan */}
    </Routes>
  );
}

export default AppRouter;
