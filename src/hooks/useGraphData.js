import { useState, useCallback, useMemo } from "react";

export const useGraphData = () => {
  const [cities, setCities] = useState([
    { id: "Cali", name: "Cali" },
    { id: "Medellín", name: "Medellín" },
    { id: "Bogotá", name: "Bogotá" },
  ]);

  const [greenZones, setGreenZones] = useState([
    { id: "1", name: "Parque del Perro", cityId: "Cali", parentId: null },
    { id: "2", name: "Zona A", cityId: "Cali", parentId: "1" },
    { id: "3", name: "Zona B", cityId: "Cali", parentId: "1" },
    { id: "4", name: "Subzona A1", cityId: "Cali", parentId: "2" },
    { id: "5", name: "Parque Norte", cityId: "Medellín", parentId: null },
    { id: "6", name: "Parque Salitre", cityId: "Bogotá", parentId: null },
  ]);

  const addCity = useCallback((cityName) => {
    const trimmedName = cityName.trim();
    if (!trimmedName) {
      alert("Escribe un nombre de ciudad.");
      return false;
    }

    const cityExists = cities.some(
      (c) => c.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (cityExists) {
      alert("La ciudad ya existe.");
      return false;
    }

    setCities((prev) => [...prev, { id: trimmedName, name: trimmedName }]);
    return true;
  }, [cities]);

  const deleteCity = useCallback((cityId) => {
    if (!cityId) return false;

    setGreenZones((prev) => prev.filter((zone) => zone.cityId !== cityId));
    setCities((prev) => prev.filter((city) => city.id !== cityId));
    return true;
  }, []);

  const addGreenZone = useCallback((zoneName, cityId, parentId = null) => {
    const trimmedName = zoneName.trim();
    if (!trimmedName) {
      alert("Escribe un nombre para la zona verde.");
      return false;
    }

    if (!cityId) {
      alert("Selecciona una ciudad.");
      return false;
    }

    if (parentId) {
      const parent = greenZones.find((z) => z.id === parentId);
      if (!parent || parent.cityId !== cityId) {
        alert("La zona padre no es válida.");
        return false;
      }
    }

    const newZone = {
      id: Date.now().toString(),
      name: trimmedName,
      cityId,
      parentId,
    };

    setGreenZones((prev) => [...prev, newZone]);
    return true;
  }, [greenZones]);

  const editGreenZone = useCallback((zoneId, newName, newParentId = null) => {
    const trimmedName = newName.trim();
    if (!trimmedName) {
      alert("Escribe un nombre para la zona verde.");
      return false;
    }

    setGreenZones((prev) =>
      prev.map((zone) => {
        if (zone.id === zoneId) {
          if (newParentId && isDescendant(zoneId, newParentId, prev)) {
            alert("No puedes establecer un descendiente como padre.");
            return zone;
          }
          return { ...zone, name: trimmedName, parentId: newParentId };
        }
        return zone;
      })
    );
    return true;
  }, []);

  const isDescendant = (zoneId, targetId, zones) => {
    const target = zones.find((z) => z.id === targetId);
    if (!target) return false;
    if (target.parentId === zoneId) return true;
    if (target.parentId === null) return false;
    return isDescendant(zoneId, target.parentId, zones);
  };

  const getGreenZonesByCity = useCallback((cityId) => {
    return greenZones.filter((zone) => zone.cityId === cityId);
  }, [greenZones]);

  const calculateMaxHeight = useCallback((cityId) => {
    const cityZones = greenZones.filter((zone) => zone.cityId === cityId);
    if (cityZones.length === 0) return 0;

    const getHeight = (zoneId, zones) => {
      const children = zones.filter((z) => z.parentId === zoneId);
      if (children.length === 0) return 1;
      return 1 + Math.max(...children.map((child) => getHeight(child.id, zones)));
    };

    const rootZones = cityZones.filter((zone) => zone.parentId === null);
    if (rootZones.length === 0) return 0;

    return Math.max(...rootZones.map((root) => getHeight(root.id, cityZones)));
  }, [greenZones]);

  const calculateTotalZones = useCallback((cityId) => {
    return greenZones.filter((zone) => zone.cityId === cityId).length;
  }, [greenZones]);

  const graphData = useMemo(() => {
    const nodes = [
      ...cities.map((c) => ({ 
        id: c.id, 
        type: "city",
        color: "lightblue" 
      })),
      ...greenZones.map((zone) => ({ 
        id: `zone-${zone.id}`, 
        label: zone.name,
        type: "greenzone",
        color: "lightgreen" 
      })),
    ];

    const links = greenZones.map((zone) => ({
      source: `zone-${zone.id}`,
      target: zone.parentId ? `zone-${zone.parentId}` : zone.cityId,
    }));

    return { nodes, links };
  }, [cities, greenZones]);

  return {
    cities,
    greenZones,
    addCity,
    deleteCity,
    addGreenZone,
    editGreenZone,
    getGreenZonesByCity,
    calculateMaxHeight,
    calculateTotalZones,
    graphData,
  };
};
