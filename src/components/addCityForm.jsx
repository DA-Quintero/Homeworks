import React, { useState, memo, useCallback } from "react";

const AddCityForm = memo(({ onAddCity }) => {
  const [cityName, setCityName] = useState("");

  const handleSubmit = useCallback(() => {
    if (onAddCity(cityName)) {
      setCityName("");
    }
  }, [cityName, onAddCity]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }, [handleSubmit]);

  return (
    <div className="form-container">
      <h3>Agregar Ciudad</h3>
      <input
        type="text"
        placeholder="Nombre de la ciudad"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSubmit}>Agregar Ciudad</button>
    </div>
  );
});

AddCityForm.displayName = "AddCityForm";

export default AddCityForm;

