import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
// import { Form } from "./components/villains_form";

export default function App() {
  const [villainsData, setVillainsData] = useState([]);

  useEffect(() => {
    fetchVillains();
  }, []);

  async function fetchVillains() {
    const result = await fetch("http://localhost:8080/villains");
    const resultData = await result.json(result.rows);
    setVillainsData(resultData);
    console.log(villainsData);
  }

  return (
    <div>
      {villainsData.map((villain) => {
        return (
          <div>
            <p> Name:{villain.name}</p>
            {/* <p> First Appearance:{villain.first_appearance}</p> */}
            {/* <p> Powers: {villain.powers}</p> */}
            {/* <p> Home World:{villain.home_world} </p>; */}
            {/* <p> Picture: {villain.img_url}</p>; */}
            <p>Beaten by: {villain.companions}</p>
          </div>
        );
      })}
    </div>
  );
}
