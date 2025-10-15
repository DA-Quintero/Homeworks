import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerThunk } from "../store/thunks/registerThunk";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (email && password && displayName) {
      dispatch(registerThunk({ email, password, displayName }));
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
          <p>Crea tu cuenta</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Nombre completo</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Juan Pérez"
              required
            />
          </div>

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
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label>Confirmar contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              required
              minLength="6"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            ¿Ya tienes cuenta?{" "}
            <button onClick={() => navigate("/login")} className="link-button">
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
