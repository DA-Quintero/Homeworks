function Child({ categories }) {
  return (
    <div>
      <h2>Lista de Categorías</h2>
      <ul>
        {categories.map((cat, index) => (
          <li key={index}>{cat}</li>
        ))}
      </ul>
    </div>
  );
}

export default Child;
