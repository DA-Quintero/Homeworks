import React, { useState, useEffect } from 'react';
import Imagen from './Image';
import './App.css';

function App() {
  const [imagenes, setImagenes] = useState([
    { id: 10, titulo: 'Lago' },
    { id: 58, titulo: 'Faro' },
    { id: 36, titulo: 'Cámara desarmada' },
  ]);

  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevoId, setNuevoId] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [imagenesMostradas, setImagenesMostradas] = useState(imagenes);

  useEffect(() => {
    const resultados = imagenes.filter(imagen =>
      imagen.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );
    setImagenesMostradas(resultados);
  }, [imagenes, busqueda]);

  const handleAddImage = (e) => {
    e.preventDefault();
    const nuevaImagen = {
      id: parseInt(nuevoId, 10),
      titulo: nuevoTitulo
    };
    setImagenes(imagenesAnt => [nuevaImagen, ...imagenesAnt]);
    setNuevoTitulo('');
    setNuevoId('');
  };

  return (
    <div className="app-content">
    <div className="form-content">
      <h2>Agregar nueva imagen</h2>
  <form onSubmit={handleAddImage} className="add-image-form">
          <input
            type="text"
            value={nuevoTitulo}
            onChange={(e) => setNuevoTitulo(e.target.value)}
            placeholder="Título de la imagen"
            className="form-input"
            required
          />
          <input
            type="number"
            value={nuevoId}
            onChange={(e) => setNuevoId(e.target.value)}
            placeholder="ID de la imagen (número)"
            className="form-input"
            required
          />
          <button type="submit" className="form-button">Agregar imagen</button>
        </form>
      </div>

      <div className="filter-content">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="search-input"
        />
      </div>

      <main className="image-grid">
        {imagenesMostradas.length > 0 ? (
          imagenesMostradas.map(imagen => (
            <Imagen
              key={imagen.id}
              id={imagen.id}
              title={imagen.titulo}
            />
          ))
        ) : (
          <p>No se encontraron imágenes.</p>
        )}
      </main>
    </div>
  );
}

export default App;