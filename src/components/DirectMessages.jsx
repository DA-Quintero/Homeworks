import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enqueueMessage, dequeueMessage, removeMessage, clearMessages } from "../store/slices/messagesSlice";
import { pushNotification } from "../store/slices/notificationsSlice";
import { saveMessagesToFirebase } from "../store/thunks/messagesThunk";
import { saveNotificationsToFirebase } from "../store/thunks/notificationsThunk";

export const DirectMessages = () => {
  const [recipient, setRecipient] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.queue);
  const user = useSelector((state) => state.auth.user);

  const handleEnqueue = (e) => {
    e.preventDefault();
    if (recipient.trim() && messageContent.trim()) {
      dispatch(
        enqueueMessage({
          to: recipient,
          content: messageContent,
          from: user?.displayName || user?.email,
        })
      );
      
      dispatch(
        pushNotification({
          message: `Mensaje agregado a la cola para ${recipient}`,
          type: "success",
        })
      );
      
      setRecipient("");
      setMessageContent("");
    }
  };

  const handleDequeue = () => {
    if (messages.length > 0) {
      const firstMessage = messages[0];
      dispatch(dequeueMessage());
      dispatch(
        pushNotification({
          message: `Mensaje enviado a ${firstMessage.to}`,
          type: "success",
        })
      );
    }
  };

  const handleRemove = (messageId) => {
    dispatch(removeMessage(messageId));
    dispatch(
      pushNotification({
        message: "Mensaje eliminado de la cola",
        type: "info",
      })
    );
  };

  const handleClearAll = () => {
    if (window.confirm("¿Deseas eliminar todos los mensajes pendientes?")) {
      dispatch(clearMessages());
    }
  };


  useEffect(() => {
    if (user?.uid) {
      dispatch(saveMessagesToFirebase(user.uid));
      dispatch(saveNotificationsToFirebase(user.uid));
    }
  }, [messages, dispatch, user]);

  return (
    <div className="messages-container">
      <div className="section-header">
        <h2>Mensajes Directos</h2>
      </div>

      <form onSubmit={handleEnqueue} className="message-form">
        <div className="form-row">
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Destinatario"
            className="message-input"
          />
          <input
            type="text"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="message-input flex-grow"
          />
          <button type="submit" className="btn btn-primary">
            Agregar a la cola
          </button>
        </div>
      </form>

      <div className="messages-actions">
        <button
          onClick={handleDequeue}
          className="btn btn-success"
          disabled={messages.length === 0}
        >
          Dequeue (Enviar siguiente)
        </button>
        <button
          onClick={handleClearAll}
          className="btn btn-secondary"
          disabled={messages.length === 0}
        >
          Limpiar todos
        </button>
        <div className="messages-count">
          Pendientes: <strong>{messages.length}</strong> mensajes
        </div>
      </div>

      <div className="messages-queue">
        {messages.length === 0 ? (
          <div className="empty-state">
            <p>No hay mensajes en cola</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div key={message.id} className="message-card">
              <div className="message-header">
                <div className="message-info">
                  <span className="message-position">
                    {index === 0 ? "Próximo en enviarse" : `Posición ${index + 1} en la cola`}
                  </span>
                  <span className="message-from">De: {message.from}</span>
                  <span className="message-to">Para: {message.to}</span>
                </div>
                <button
                  onClick={() => handleRemove(message.id)}
                  className="btn-delete"
                >
                  Eliminar
                </button>
              </div>
              <p className="message-content">{message.content}</p>
              <div className="message-footer">
                <span className="message-status">
                  Estado: <strong>{message.status === "pending" ? "Pendiente" : "Enviado"}</strong>
                </span>
                <span className="message-time">
                  {new Date(message.timestamp).toLocaleString("es-CO")}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
