import React, { useState } from "react";
import "./App.scss";
import AddCityForm from "./components/addCityForm";
import GreenZoneManager from "./components/greenZoneManager";
import CitySelector from "./components/citySelector";
import GreenZoneList from "./components/greenZoneList";
import GraphView from "./components/graphView";
import { useGraphData } from "./hooks/useGraphData";

const App = () => {
  const { 
    cities,
    greenZones,
    addCity,
    deleteCity,
    addGreenZone,
    editGreenZone,
    calculateMaxHeight,
    calculateTotalZones,
    graphData 
  } = useGraphData();

  const [selectedCity, setSelectedCity] = useState("");

  const maxHeight = selectedCity ? calculateMaxHeight(selectedCity) : 0;
  const totalZones = selectedCity ? calculateTotalZones(selectedCity) : 0;

  return (
    <div className="app-container">
      <div className="left-column">
        <h1>Red de Ciudades Interconectadas</h1>

        <div className="section">
          <div className="section-header">
            <h2>Gestión de Ciudades</h2>
          </div>
          <AddCityForm onAddCity={addCity} />
          <CitySelector
            cities={cities}
            selectedCity={selectedCity}
            onChangeCity={setSelectedCity}
            onDeleteCity={deleteCity}
          />
        </div>

        <div className="section">
          <div className="section-header">
            <h2>Gestión de Zonas Verdes</h2>
          </div>
          <GreenZoneManager
            selectedCity={selectedCity}
            greenZones={greenZones}
            onAddGreenZone={addGreenZone}
            onEditGreenZone={editGreenZone}
          />
        </div>

        <div className="section">
          <div className="section-header">
            <h2>Información y Estadísticas</h2>
          </div>
          <GreenZoneList 
            selectedCity={selectedCity} 
            greenZones={greenZones}
            maxHeight={maxHeight}
            totalZones={totalZones}
          />
        </div>
      </div>

      <div className="right-column">
        <div className="graph-section">
          <div className="section-header">
            <h2>Visualización de Red</h2>
          </div>
          <GraphView graphData={graphData} />
        </div>
      </div>
    </div>
  );
};

export default App;