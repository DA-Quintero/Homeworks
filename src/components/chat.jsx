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
    <div style={{ width: "400px", margin: "auto", marginTop: "30px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h2>Chat en Tiempo Real</h2>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          Cerrar sesión
        </button>
      </div>

      <div
        style={{
          border: "2px solid #000",
          height: "300px",
          overflowY: "scroll",
          padding: "10px",
          backgroundColor: "#fafafa",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              textAlign: msg.user === (displayName || email) ? "right" : "left",
              marginBottom: "8px",
            }}
          >
            <small>{msg.user}</small>
            <p
              style={{
                display: "inline-block",
                backgroundColor: "#800020", // vinotinto
                color: "#ffffff",
                padding: "6px 10px",
                borderRadius: "10px",
                maxWidth: "70%",
              }}
            >
              {msg.text}
            </p>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} style={{ marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: "75%", padding: "5px" }}
        />
        <button type="submit" style={{ width: "23%", marginLeft: "2%" }}>
          Enviar
        </button>
      </form>
    </div>
  );
};
