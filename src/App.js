import { useEffect, useState } from "react";
import "./App.css";
import RegisterUser from "./components/views/RegisterUser";
import CustomerView from "./components/views/CustomerView";

function App() {
  const [cleanerData, setCleanerData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/cleaner/1")
      .then((res) => res.json())
      .then((data) => setCleanerData(data))
      .catch((e) => console.log(e));
  }, []);

  console.log(cleanerData);

  return (
    <div className="App">
      <p>Cleaner name: {cleanerData.name}</p>
        <RegisterUser />
        <CustomerView />
    </div>
  );
}

export default App;
