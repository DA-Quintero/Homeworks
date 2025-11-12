import React, { memo } from "react";

const PeopleList = memo(({ selectedCity, peopleInCity }) => {
  if (!selectedCity) return null;

  return (
    <div className="list-container">
      <h3>Personas que viven en {selectedCity}:</h3>
      {peopleInCity.length > 0 ? (
        <ul>
          {peopleInCity.map((person) => (
            <li key={person.id}>
              {person.name} ({person.age} años)
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay registro de personas en esta ciudad</p>
      )}
    </div>
  );
});

PeopleList.displayName = "PeopleList";

export default PeopleList;
