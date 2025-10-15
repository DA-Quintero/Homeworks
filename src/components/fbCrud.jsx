import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItems, addNewItem, updateItem, deleteItem } from "../store/thunks/firebaseThunk";

export const Crud = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.firebaseData);

  const [newUser, setNewUser] = useState({ name: "", email: "" });

  useEffect(() => {
    dispatch(getItems("users"));
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return alert("Completa todos los campos");
    dispatch(addNewItem("users", newUser));
    setNewUser({ name: "", email: "" });
  };

  const handleUpdate = (id) => {
    const newName = prompt("Nuevo nombre:");
    if (newName) dispatch(updateItem("users", id, { name: newName }));
  };

  const handleDelete = (id) => {
    if (confirm("¿Seguro que quieres eliminar este registro?")) {
      dispatch(deleteItem("users", id));
    }
  };

  return (
    <div style={{ margin: "40px" }}>
      <h2>Usuarios (Firestore CRUD)</h2>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleAdd} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nombre"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          style={{ marginRight: "10px" }}
        />
        <input
          type="email"
          placeholder="Correo"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          style={{ marginRight: "10px" }}
        />
        <button type="submit">Agregar usuario</button>
      </form>
      
      <ul>
        {items.map((user) => (
          <li key={user.id} style={{ marginBottom: "10px" }}>
            <strong>{user.name}</strong> - {user.email}
            <button onClick={() => handleUpdate(user.id)} style={{ marginLeft: "10px" }}>
              Editar
            </button>
            <button onClick={() => handleDelete(user.id)} style={{ marginLeft: "5px", color: "red" }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
