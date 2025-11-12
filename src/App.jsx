import React, { useState } from "react";
import "./App.css";
import AddPersonForm from "./components/addPersonForm";
import CitySelector from "./components/citySelector";
import PeopleList from "./components/peopleList";
import GraphView from "./components/graphView";
import { useGraphData } from "./hooks/useGraphData";

const App = () => {
  const { 
    cities, 
    addPerson, 
    getPeopleByCity, 
    graphData 
  } = useGraphData();

  const [selectedCity, setSelectedCity] = useState("");

  const peopleInCity = getPeopleByCity(selectedCity);

  return (
    <div className="app-container">
      <div className="left-column">
        <h1>Grafo de Personas y Ciudades</h1>

        <AddPersonForm onAddPerson={addPerson} />
        <CitySelector
          cities={cities}
          selectedCity={selectedCity}
          onChangeCity={setSelectedCity}
        />
        <PeopleList selectedCity={selectedCity} peopleInCity={peopleInCity} />
      </div>

      <div className="right-column">
        <GraphView graphData={graphData} />
      </div>
    </div>
  );
};

export default App;