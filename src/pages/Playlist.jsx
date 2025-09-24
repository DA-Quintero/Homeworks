
import React, { useState, useEffect } from "react";
import LinkedList from "../LinkedList";

const Playlist = () => {
  const [list] = useState(new LinkedList());
  const [song, setSong] = useState("");

  useEffect(() => {
    list.append("Canción 1");
    list.append("Canción 2");
    list.append("Canción 3");
    list.append("Canción 4");
    list.append("Canción 5");
    setSong(list.getCurrent());
  }, [list]);

  const handleNext = () => {
    setSong(list.nextSong());
  };

  const handleReset = () => {
    setSong(list.reset());
  };

  return (
    <div className="page-container">
      <h2> Reproductor de Música</h2>
      <div className="current-info">
        <p> Reproduciendo: <strong>{song}</strong></p>
      </div>
      <div className="action-buttons">
        <button onClick={handleNext}> Siguiente</button>
        <button onClick={handleReset}> Reiniciar</button>
      </div>
    </div>
  );
};

export default Playlist;