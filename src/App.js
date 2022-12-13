import { useEffect, useState } from "react";
import "./App.css";
import RegisterUser from "./components/views/RegisterUser";

function App() {
  const [cleanerData, setCleanerData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/cleaner")
      .then((res) => res.json())
      .then((data) => setCleanerData(data));
  }, []);

  console.log(cleanerData);

  return (
    <div className="App">
      {cleanerData ? cleanerData.map((cleaner) => <p>{cleaner.name}</p>) : null}
      <RegisterUser />
    </div>
  );
}

export default App;
