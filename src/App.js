import Table from "./Table";
import "./App.css"; 
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products?limit=100`);
      const res = await response.json();
      setData(res?.products);
    }
    catch (error) {
      setData({});
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <Table data={data} />
    </div>
  );
}

export default App;
