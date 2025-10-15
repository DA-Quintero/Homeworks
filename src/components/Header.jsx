import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutThunk } from "../store/thunks/logoutThunk";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const notifications = useSelector((state) => state.notifications.notifications);
  
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    dispatch(logoutThunk());
    navigate("/login");
  };

  const currentPath = location.pathname;

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <img 
            src="https://www.uao.edu.co/wp-content/uploads/2024/12/UAO-LOGO-NUEVO_Mesa-de-trabajo-1-1-1-1.png" 
            alt="UAO Logo" 
            className="header-logo-img"
          />
        </div>

        <nav className="header-nav">
          <button
            className={`nav-button ${currentPath === "/posts" ? "active" : ""}`}
            onClick={() => navigate("/posts")}
          >
            Posts
          </button>
          <button
            className={`nav-button ${currentPath === "/notifications" ? "active" : ""}`}
            onClick={() => navigate("/notifications")}
          >
            Notificaciones
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>
          <button
            className={`nav-button ${currentPath === "/messages" ? "active" : ""}`}
            onClick={() => navigate("/messages")}
          >
            Mensajes
          </button>
        </nav>

        <div className="header-right">
          <span className="user-name">{user?.displayName || user?.email}</span>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
};
