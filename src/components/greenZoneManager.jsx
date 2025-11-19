import React, { useState, memo, useCallback } from "react";

const GreenZoneManager = memo(({ 
  selectedCity, 
  greenZones,
  onAddGreenZone, 
  onEditGreenZone 
}) => {
  const [mode, setMode] = useState("add");
  const [zoneName, setZoneName] = useState("");
  const [parentZoneId, setParentZoneId] = useState("");
  const [selectedZoneId, setSelectedZoneId] = useState("");

  const cityZones = greenZones.filter(zone => zone.cityId === selectedCity);

  const handleAddZone = useCallback(() => {
    if (onAddGreenZone(zoneName, selectedCity, parentZoneId || null)) {
      setZoneName("");
      setParentZoneId("");
    }
  }, [zoneName, selectedCity, parentZoneId, onAddGreenZone]);

  const handleEditZone = useCallback(() => {
    if (selectedZoneId && onEditGreenZone(selectedZoneId, zoneName, parentZoneId || null)) {
      setZoneName("");
      setParentZoneId("");
      setSelectedZoneId("");
    }
  }, [selectedZoneId, zoneName, parentZoneId, onEditGreenZone]);

  const handleZoneSelection = useCallback((zoneId) => {
    setSelectedZoneId(zoneId);
    const zone = greenZones.find(z => z.id === zoneId);
    if (zone) {
      setZoneName(zone.name);
      setParentZoneId(zone.parentId || "");
    }
  }, [greenZones]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === "Enter") {
      mode === "add" ? handleAddZone() : handleEditZone();
    }
  }, [mode, handleAddZone, handleEditZone]);

  if (!selectedCity) {
    return (
      <div className="form-container">
        <p style={{ textAlign: "center", color: "#a0a0a0", margin: "20px 0" }}>
          Selecciona una ciudad primero para gestionar sus zonas verdes
        </p>
      </div>
    );
  }

  const availableParentZones = mode === "edit" 
    ? cityZones.filter(z => z.id !== selectedZoneId)
    : cityZones;

  return (
    <div className="form-container green-zone-form">
      
      <div className="mode-selector">
        <label className={`mode-option ${mode === "add" ? "active" : ""}`}>
          <input
            type="radio"
            value="add"
            checked={mode === "add"}
            onChange={() => {
              setMode("add");
              setZoneName("");
              setParentZoneId("");
              setSelectedZoneId("");
            }}
          />
          <span className="mode-text">Agregar Nueva</span>
        </label>
        <label className={`mode-option ${mode === "edit" ? "active" : ""}`}>
          <input
            type="radio"
            value="edit"
            checked={mode === "edit"}
            onChange={() => {
              setMode("edit");
              setZoneName("");
              setParentZoneId("");
              setSelectedZoneId("");
            }}
          />
          <span className="mode-text">Editar Existente</span>
        </label>
      </div>

      {mode === "edit" && (
        <div className="input-group">
          <label className="input-label">
            Zona a editar
          </label>
          <select
            value={selectedZoneId}
            onChange={(e) => handleZoneSelection(e.target.value)}
            className="styled-select"
          >
            <option value="">Seleccionar zona a editar</option>
            {cityZones.map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="input-group">
        <label className="input-label">
          Nombre de la zona verde
        </label>
        <input
          type="text"
          placeholder="Ej: Parque Central, Jardín Botánico..."
          value={zoneName}
          onChange={(e) => setZoneName(e.target.value)}
          onKeyPress={handleKeyPress}
          className="styled-input"
        />
      </div>

      <div className="input-group">
        <label className="input-label">
          Zona padre (opcional)
        </label>
        <select
          value={parentZoneId}
          onChange={(e) => setParentZoneId(e.target.value)}
          className="styled-select"
        >
          <option value="">Sin zona padre (raíz)</option>
          {availableParentZones.map((zone) => (
            <option key={zone.id} value={zone.id}>
              {zone.name}
            </option>
          ))}
        </select>
      </div>

      <button 
        onClick={mode === "add" ? handleAddZone : handleEditZone}
        className="submit-button"
      >
        {mode === "add" ? "Agregar Zona Verde" : "Guardar Cambios"}
      </button>
    </div>
  );
});

GreenZoneManager.displayName = "GreenZoneManager";

export default GreenZoneManager;
