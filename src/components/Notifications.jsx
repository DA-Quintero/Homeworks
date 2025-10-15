import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { popNotification, markAllAsRead, clearNotifications } from "../store/slices/notificationsSlice";
import { saveNotificationsToFirebase } from "../store/thunks/notificationsThunk";

export const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.notifications);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(markAllAsRead());
  }, [dispatch]);

  const handlePop = () => {
    if (notifications.length > 0) {
      dispatch(popNotification());
    }
  };

  const handleClearAll = () => {
    if (window.confirm("¿Deseas eliminar todas las notificaciones?")) {
      dispatch(clearNotifications());
    }
  };

  useEffect(() => {
    if (user?.uid) {
      dispatch(saveNotificationsToFirebase(user.uid));
    }
  }, [notifications, dispatch, user]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      default:
        return "ℹ️";
    }
  };

  return (
    <div className="notifications-container">
      <div className="section-header">
        <h2>Notificaciones</h2>
      </div>

      <div className="notifications-actions">
        <button
          onClick={handlePop}
          className="btn btn-primary"
          disabled={notifications.length === 0}
        >
          Pop (Eliminar del tope)
        </button>
        <button
          onClick={handleClearAll}
          className="btn btn-secondary"
          disabled={notifications.length === 0}
        >
          Limpiar todas
        </button>
        <div className="notifications-count">
          Total: <strong>{notifications.length}</strong> notificaciones
        </div>
      </div>

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="empty-state">
            <p>No hay notificaciones</p>
          </div>
        ) : (
          notifications.map((notification, index) => (
            <div
              key={notification.id}
              className={`notification-card ${notification.read ? "read" : "unread"} ${notification.type}`}
            >
              <div className="notification-header">
                <span className="notification-icon">
                  {getNotificationIcon(notification.type)}
                </span>
                <span className="notification-position">
                  {index === 0 ? "Tope" : `Posición ${index + 1}`}
                </span>
              </div>
              <p className="notification-message">{notification.message}</p>
              <div className="notification-footer">
                <span className="notification-time">
                  {new Date(notification.timestamp).toLocaleString("es-CO")}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
