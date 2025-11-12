import React, { useState, memo, useCallback } from "react";

const AddPersonForm = memo(({ onAddPerson }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    city: "",
  });

  const handleChange = useCallback((field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (onAddPerson(formData.name, formData.age, formData.city)) {
      setFormData({ name: "", age: "", city: "" });
    }
  }, [formData, onAddPerson]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }, [handleSubmit]);

  return (
    <div className="form-container">
      <h3>Agregar Persona</h3>
      <input
        type="text"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange("name")}
        onKeyPress={handleKeyPress}
      />
      <input
        type="number"
        placeholder="Edad"
        value={formData.age}
        onChange={handleChange("age")}
        onKeyPress={handleKeyPress}
        min="1"
        max="120"
      />
      <input
        type="text"
        placeholder="Ciudad"
        value={formData.city}
        onChange={handleChange("city")}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSubmit}>Agregar Persona</button>
    </div>
  );
});

AddPersonForm.displayName = "AddPersonForm";

export default AddPersonForm;

