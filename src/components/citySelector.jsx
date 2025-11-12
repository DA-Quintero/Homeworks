import React, { memo } from "react";

const CitySelector = memo(({ cities, selectedCity, onChangeCity }) => (
  <div className="selector-container">
    <label>
      <b>Selecciona una ciudad:</b>
      <select
        value={selectedCity}
        onChange={(e) => onChangeCity(e.target.value)}
      >
        <option value="">Elegir</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
    </label>
  </div>
));

CitySelector.displayName = "CitySelector";

export default CitySelector;
