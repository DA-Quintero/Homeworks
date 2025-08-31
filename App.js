import { useState } from "react";
import Child from "./Child";

function App() {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const handleAddCategory = () => {
    if (category.trim().length === 0) return;

    // agregar a la lista
    setCategories([...categories, category]);

    // limpiar input
    setCategory("");
  };

  return (
    <div>
      <h1>Challenge 04</h1>

      {/* Input controlado */}
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Escribe una categoría"
      />

      {/* Botón para añadir */}
      <button onClick={handleAddCategory}>Agregar</button>

      {/* Paso de props al hijo */}
      <Child categories={categories} />
    </div>
  );
}

export default App;
