import React, { useState } from "react";
import "./App.css";

const MOCK = [
  { name: "Maria García", amount: 150000, timestamp: new Date(2025, 6, 24, 14, 30, 15) },
  { name: "David Rodríguez", amount: 80000, timestamp: new Date(2025, 7, 24, 9, 45, 30) },
  { name: "Wilson Manyoma", amount: 320000, timestamp: new Date(2025, 8, 24, 16, 20, 45) },
];

export default function App() {
  const [queue, setQueue] = useState(MOCK);
  
  // Función para obtener datetime-local en formato correcto
  const getCurrentDateTimeLocal = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const [form, setForm] = useState({ 
    name: "", 
    amount: "", 
    datetime: getCurrentDateTimeLocal()
  });

  const formatDateTime = (date) => {
    return date.toLocaleString('es-ES');
  };

  const onAdd = (e) => {
    e.preventDefault();
    const amountNum = Number(form.amount);
    
    const timestamp = new Date(form.datetime);
    
    const newPerson = {
      name: form.name.trim(),
      amount: amountNum,
      timestamp: timestamp
    };
    
    setQueue((prev) => {
      const newQueue = [...prev, newPerson];
      return newQueue.sort((a, b) => a.timestamp - b.timestamp);
    });
    
    setForm({ 
      name: "", 
      amount: "", 
      datetime: getCurrentDateTimeLocal()
    });
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Queue in ATM</h1>

      <div className="main-content">
        <div className="form-section">
          <form onSubmit={onAdd} className="form-container">
            <h2 className="form-title">Agregar Persona a la Cola</h2>

            <label className="form-label">
              <span className="label-text">Nombre Completo</span>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="ej. Juan Pérez"
                className="form-input"
              />
            </label>

            <label className="form-label">
              <span className="label-text">Monto a Retirar</span>
              <input
                type="number"
                min="1"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                placeholder="ej. 250000"
                className="form-input"
              />
            </label>

            <label className="form-label">
              <span className="label-text">Fecha y Hora de Ingreso</span>
              <input
                type="datetime-local"
                step="1"
                value={form.datetime}
                onChange={(e) => setForm({ ...form, datetime: e.target.value })}
                className="form-input"
              />
            </label>

            <button type="submit" className="submit-button">
              Agregar a la Cola
            </button>
          </form>
        </div>

        <section className="queue-section">
          <h2 className="section-title">Cola del Cajero</h2>
          {queue.length === 0 ? (
            <div className="empty-queue">No hay personas en la cola</div>
          ) : (
            <ul className="queue-list">
              {queue.map((person, index) => (
                <li key={`${person.name}-${index}`} className="queue-item">
                  <div className="person-info">
                    <div className="person-name">{person.name}</div>
                    <div className="person-amount">Retiro: ${person.amount.toLocaleString()}</div>
                    <div className="person-datetime">
                     {formatDateTime(person.timestamp)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
