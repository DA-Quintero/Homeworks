import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { loginWithEmailAndPassword } from "../store/thunks/loginThunk";
import { loginWithGoogle } from "../store/thunks/loginGoogleThunk";
import { logoutAuth } from "../store/thunks/logoutThunk";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, displayName } = useSelector((state) => state.auth);

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formState;

  const onInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginWithEmailAndPassword(email, password));
  };

  const onGoogleLogin = () => {
    dispatch(loginWithGoogle());
  };

  const onLogout = () => {
    dispatch(logoutAuth());
  };

  return (
    <>
      {status === "authenticated" ? (
        <>
          <h1>Bienvenido, {displayName}!</h1>
          <button onClick={() => navigate('/crud')}>Ir al CRUD</button>
          <button onClick={onLogout}>Cerrar sesión</button>
        </>
      ) : (
        <>
          <h1>Iniciar sesión</h1>
          <hr />
          <form onSubmit={onLoginSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Correo"
              value={email}
              onChange={onInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={password}
              onChange={onInputChange}
            />
            <button type="submit">Entrar</button>
          </form>

          <button onClick={onGoogleLogin}>Iniciar con Google</button>

          <p>
            O crea una cuenta{" "}
            <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
              aquí.
            </Link>
          </p>
        </>
      )}
    </>
  );
};