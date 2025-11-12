import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listenMessages, sendMessage } from "../store/thunks/chatThunk";
import { logoutAuth } from "../store/thunks/logoutThunk"; 

export const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { messages } = useSelector((state) => state.chat);
  const { displayName, email } = useSelector((state) => state.auth);

  const [text, setText] = useState("");
  const messagesEndRef = useRef(null); 

  useEffect(() => {
    dispatch(listenMessages());
  }, [dispatch]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    const user = displayName || email;
    dispatch(sendMessage(text, user));
    setText("");
  };

  const handleLogout = () => {
    dispatch(logoutAuth());
    navigate("/login");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat en Tiempo Real</h2>
        <button className="danger" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => {
          const isOwnMessage = msg.user === (displayName || email);
          return (
            <div
              key={msg.id}
              className={`message ${isOwnMessage ? 'own-message' : 'other-message'}`}
            >
              <div className="message-user">{msg.user}</div>
              <div className="message-bubble">
                <p>{msg.text}</p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="chat-input-form">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
