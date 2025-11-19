import React, { memo } from "react";

const GreenZoneList = memo(({ 
  selectedCity, 
  greenZones, 
  maxHeight, 
  totalZones 
}) => {
  if (!selectedCity) return null;

  const cityZones = greenZones.filter(zone => zone.cityId === selectedCity);

  const buildTree = (parentId = null, level = 0) => {
    const children = cityZones.filter(zone => zone.parentId === parentId);
    return children.map(zone => (
      <div key={zone.id} style={{ marginLeft: `${level * 20}px` }}>
        <li>
          {level > 0 && ""}
          <strong>{zone.name}</strong>
          {zone.parentId === null && " (Raíz)"}
        </li>
        {buildTree(zone.id, level + 1)}
      </div>
    ));
  };

  return (
    <div className="list-container">
      
      <div style={{ 
        backgroundColor: "#2a2a2a", 
        padding: "15px", 
        marginBottom: "15px",
        borderRadius: "8px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "15px"
      }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: "0.9rem", color: "#a0a0a0" }}>Altura Máxima</p>
          <p style={{ margin: "5px 0 0 0", fontSize: "1.8rem", fontWeight: "bold", color: "#4db8ff" }}>{maxHeight}</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: "0.9rem", color: "#a0a0a0" }}>Total de Zonas</p>
          <p style={{ margin: "5px 0 0 0", fontSize: "1.8rem", fontWeight: "bold", color: "#4db8ff" }}>{totalZones}</p>
        </div>
      </div>

      {cityZones.length > 0 ? (
        <div>
          <h4 style={{ color: "#4db8ff", marginBottom: "15px", fontSize: "1.1rem" }}>
            Jerarquía de Zonas Verdes:
          </h4>
          <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
            {buildTree()}
          </ul>
        </div>
      ) : (
        <p style={{ textAlign: "center", padding: "30px", color: "#a0a0a0", fontStyle: "italic" }}>
          No hay zonas verdes registradas en esta ciudad
        </p>
      )}
    </div>
  );
});

GreenZoneList.displayName = "GreenZoneList";

export default GreenZoneList;
