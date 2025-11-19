import React, { memo } from "react";

const CitySelector = memo(({ cities, selectedCity, onChangeCity, onDeleteCity }) => {
  const handleDelete = () => {
    if (selectedCity) {
      const cityName = cities.find(c => c.id === selectedCity)?.name || selectedCity;
      if (window.confirm(`¿Estás seguro de que deseas eliminar la ciudad "${cityName}" y todas sus zonas verdes?`)) {
        onDeleteCity(selectedCity);
        onChangeCity("");
      }
    }
  };

  return (
    <div className="selector-container">
      <label>
        <b>Selecciona una ciudad:</b>
        <div className="city-selector-wrapper">
          <select
            value={selectedCity}
            onChange={(e) => onChangeCity(e.target.value)}
            className="city-select"
          >
            <option value="">Elegir</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          <button 
            onClick={handleDelete}
            disabled={!selectedCity}
            className={`delete-city-btn ${!selectedCity ? 'disabled' : ''}`}
          >
            <span className="delete-icon">✕</span>
            <span className="delete-text">Eliminar</span>
          </button>
        </div>
      </label>
    </div>
  );
});

CitySelector.displayName = "CitySelector";

export default CitySelector;
