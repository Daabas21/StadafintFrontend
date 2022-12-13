import { useEffect, useState } from 'react';
import './App.css';
import CustomerView from "./components/views/CustomerView";

function App() {

  const[cleanerData, setCleanerData] = useState([])

    useEffect(() => {
    fetch('http://localhost:8080/cleaner/1')
      .then(res => res.json())
      .then(data => setCleanerData(data))
  },[])

    console.log(cleanerData)

  return (
    <div className="App">
      <p>Cleaner name: {cleanerData.name}</p>
      <CustomerView />
    </div>
  );
}

export default App;
