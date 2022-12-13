import { Route, Routes } from 'react-router-dom';
import './App.css';
import CleanerView from './components/views/CleanerView';
import View from './components/views/View';

function App() {

  return (
    <div>
    <Routes>
      <Route path='/cleaner' element={<CleanerView />} />
      <Route path='/' element={<View />} />
    </Routes>
    </div>
  );
}

export default App;
