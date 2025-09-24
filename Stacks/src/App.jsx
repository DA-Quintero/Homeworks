import React, { useState } from "react";
import './App.css';

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
    <div className="app-container">
      <h1 className="app-title">Pila de Libros</h1>

      <div className="book-form-container">
        <h3 className="book-form-title">Agregar Nuevo Libro</h3>
        <div className="book-form-grid">
          <input
            type="text"
            placeholder="Nombre del libro"
            value={bookForm.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="book-input"
          />
          <input
            type="text"
            placeholder="ISBN"
            value={bookForm.isbn}
            onChange={(e) => handleInputChange('isbn', e.target.value)}
            className="book-input"
          />
          <input
            type="text"
            placeholder="Autor"
            value={bookForm.author}
            onChange={(e) => handleInputChange('author', e.target.value)}
            className="book-input"
          />
          <input
            type="text"
            placeholder="Editorial"
            value={bookForm.editorial}
            onChange={(e) => handleInputChange('editorial', e.target.value)}
            className="book-input"
          />
          <button onClick={handleAddBook} className="add-book-btn">
            Agregar Libro
          </button>
        </div>
      </div>

      <div className="stack-controls">
        <button onClick={pop} className="stack-btn">Pop</button>
        <button onClick={peek} className="stack-btn">Peek</button>
      </div>

      <p className="stack-info">Tamaño de la pila: {size()}</p>
      <p className="stack-info">
        {isEmpty() ? "La pila está vacía" : "La pila tiene elementos"}
      </p>

      <h3 className="stack-title">Pila de Libros (TOP → BOTTOM)</h3>
      <div className="books-container">
        {[...stack].reverse().map((book, i) => (
          <div key={i} className={`book-card ${i === 0 ? 'top-book' : ''}`}>
            <h4 className="book-title">{book.name}</h4>
            <p className="book-detail"><strong>ISBN:</strong> {book.isbn}</p>
            <p className="book-detail"><strong>Autor:</strong> {book.author}</p>
            <p className="book-detail"><strong>Editorial:</strong> {book.editorial}</p>
            {i === 0 && <span className="top-badge">TOP</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
