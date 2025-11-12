import { useState, useCallback, useMemo } from "react";

export const useGraphData = () => {
  const [cities, setCities] = useState([
    { id: "Cali", name: "Cali" },
    { id: "Medellín", name: "Medellín" },
    { id: "Cartagena", name: "Cartagena" },
  ]);

  const [people, setPeople] = useState([
    { id: "1", name: "Diego", age: 32, cityId: "Cali" },
    { id: "2", name: "Ana", age: 27, cityId: "Medellín" },
    { id: "3", name: "Carlos", age: 45, cityId: "Cali" },
    { id: "4", name: "María", age: 38, cityId: "Cartagena" },
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

  const addPerson = useCallback((name, age, cityName) => {
    const trimmedName = name.trim();
    const trimmedCity = cityName.trim();

    if (!trimmedName || !age || !trimmedCity) {
      alert("Completa todos los campos.");
      return false;
    }

    const personExists = people.some(
      (p) => p.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (personExists) {
      alert("Esa persona ya existe.");
      return false;
    }

    setCities((prev) => {
      const cityExists = prev.some(
        (c) => c.name.toLowerCase() === trimmedCity.toLowerCase()
      );
      if (!cityExists) {
        return [...prev, { id: trimmedCity, name: trimmedCity }];
      }
      return prev;
    });

    const newPerson = {
      id: Date.now().toString(),
      name: trimmedName,
      age: parseInt(age, 10),
      cityId: trimmedCity,
    };

    setPeople((prev) => [...prev, newPerson]);
    return true;
  }, [people]);

  const getPeopleByCity = useCallback((cityId) => {
    return people.filter((p) => p.cityId === cityId);
  }, [people]);

  const graphData = useMemo(() => {
    const nodes = [
      ...cities.map((c) => ({ 
        id: c.id, 
        type: "city",
        color: "lightblue" 
      })),
      ...people.map((p) => ({ 
        id: `${p.name} (${p.age})`, 
        type: "person",
        color: "orange" 
      })),
    ];

    const links = people.map((p) => ({
      source: `${p.name} (${p.age})`,
      target: p.cityId,
    }));

    return { nodes, links };
  }, [cities, people]);

  return {
    cities,
    people,
    addCity,
    addPerson,
    getPeopleByCity,
    graphData,
  };
};
