import { Route, Routes } from 'react-router-dom';
import './App.css';
import CleanerView from './components/views/CleanerView';
import CustomerView from './components/views/CustomerView';
import RegisterUser from './components/views/RegisterUser';

function App() {

  return (
    <div>
    <Routes>
      <Route path='/cleaner' element={<CleanerView />} />
      <Route path='/customer' element={<CustomerView />} />
      <Route path='/user' element={<RegisterUser />} />
    </Routes>
    </div>
  );
}

export default App;
