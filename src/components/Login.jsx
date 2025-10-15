import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginThunk } from "../store/thunks/loginThunk";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(loginThunk({ email, password }));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <img 
            src="https://www.uao.edu.co/wp-content/uploads/2024/12/UAO-LOGO-NUEVO_Mesa-de-trabajo-1-1-1-1.png" 
            alt="UAO Logo" 
            className="auth-logo"
          />
          <h1>Red Social</h1>
          <p>Inicia sesión en tu cuenta</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@uao.edu.co"
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            ¿No tienes cuenta?{" "}
            <button onClick={() => navigate("/register")} className="link-button">
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
