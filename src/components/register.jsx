import { useDispatch } from "react-redux";
import { registerAuth } from "../store/thunks/registerThunk";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Registro = () => {
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    displayName: "",
  });

  const { email, password, displayName } = formState;

  const onInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(registerAuth(email, password, displayName));
  };

  return (
    <div>
      <h1>Crear cuenta</h1>
      <hr />
      <form onSubmit={onSubmit}>
        <input
          name="displayName"
          type="text"
          placeholder="Nombre completo"
          onChange={onInputChange}
          value={displayName}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          onChange={onInputChange}
          value={email}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña (mínimo 6 caracteres)"
          onChange={onInputChange}
          value={password}
          required
          minLength="6"
        />
        <button type="submit">Registrarse</button>
      </form>

      <p>
        ¿Ya tienes cuenta?{" "}
        <Link to="/login">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
};