import React, { useState } from "react";

function App() {
  const [stack, setStack] = useState([
    {
      name: "El Quijote",
      isbn: "978-84-376-0494-7",
      author: "Miguel de Cervantes",
      editorial: "Planeta"
    },
    {
      name: "Cien años de soledad",
      isbn: "978-0-06-088328-7",
      author: "Gabriel García Márquez",
      editorial: "Sudamericana"
    },
    {
      name: "1984",
      isbn: "978-0-452-28423-4",
      author: "George Orwell",
      editorial: "Secker & Warburg"
    }
  ]);
  
  const [bookForm, setBookForm] = useState({
    name: "",
    isbn: "",
    author: "",
    editorial: ""
  });

  const push = (book) => {
    if (!book.name || !book.isbn || !book.author || !book.editorial) return;
    setStack([...stack, book]);
    setBookForm({ name: "", isbn: "", author: "", editorial: "" });
  };

  const pop = () => {
    if (stack.length === 0) {
      alert("La pila está vacía");
      return;
    }
    const element = stack[stack.length - 1];
    alert("Se sacó: " + element.name);
    setStack(stack.slice(0, -1));
  };

  const peek = () => {
    if (stack.length === 0) {
      alert("La pila está vacía");
      return;
    }
    const topBook = stack[stack.length - 1];
    alert("Libro en el TOP: " + topBook.name);
  };

  const size = () => stack.length;

  const isEmpty = () => stack.length === 0;

  const handleInputChange = (field, value) => {
    setBookForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddBook = () => {
    push(bookForm);
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Pila de Libros</h1>

      <div style={{ marginBottom: 20, padding: 15, border: "1px solid #ccc", borderRadius: 5 }}>
        <h3>Agregar Nuevo Libro</h3>
        <div style={{ display: "grid", gap: 10, maxWidth: 400 }}>
          <input
            type="text"
            placeholder="Nombre del libro"
            value={bookForm.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
          <input
            type="text"
            placeholder="ISBN"
            value={bookForm.isbn}
            onChange={(e) => handleInputChange('isbn', e.target.value)}
          />
          <input
            type="text"
            placeholder="Autor"
            value={bookForm.author}
            onChange={(e) => handleInputChange('author', e.target.value)}
          />
          <input
            type="text"
            placeholder="Editorial"
            value={bookForm.editorial}
            onChange={(e) => handleInputChange('editorial', e.target.value)}
          />
          <button onClick={handleAddBook}>Agregar Libro</button>
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <button onClick={pop} style={{ marginRight: 10 }}>Pop</button>
        <button onClick={peek}>Peek</button>
      </div>

      <p>Tamaño de la pila: {size()}</p>
      <p>{isEmpty() ? "La pila está vacía" : "La pila tiene elementos"}</p>

      <h3>Pila de Libros (TOP → BOTTOM)</h3>
      <div style={{ maxWidth: 600 }}>
        {[...stack].reverse().map((book, i) => (
          <div key={i} style={{ 
            border: "1px solid #ddd", 
            margin: "10px 0", 
            padding: 15, 
            borderRadius: 5,
            backgroundColor: i === 0 ? "#f0f8ff" : "#fff"
          }}>
            <h4 style={{ margin: "0 0 10px 0", color: "#333" }}>{book.name}</h4>
            <p style={{ margin: "5px 0", fontSize: "14px" }}><strong>ISBN:</strong> {book.isbn}</p>
            <p style={{ margin: "5px 0", fontSize: "14px" }}><strong>Autor:</strong> {book.author}</p>
            <p style={{ margin: "5px 0", fontSize: "14px" }}><strong>Editorial:</strong> {book.editorial}</p>
            {i === 0 && <span style={{ 
              backgroundColor: "#007bff", 
              color: "white", 
              padding: "2px 8px", 
              borderRadius: 3, 
              fontSize: "12px" 
            }}>TOP</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
