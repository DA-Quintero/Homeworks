import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DoublyLinkedList from "../DoublyLinkedList";

const Browser = () => {
  const { page } = useParams();
  const navigate = useNavigate();

  const history = useMemo(() => {
    const list = new DoublyLinkedList();
    list.append("inicio");
    list.append("pagina1");
    list.append("pagina2");
    list.append("pagina3");
    list.append("pagina4");
    list.append("pagina5");
    return list;
  }, []);

  const [current, setCurrent] = useState("");

  useEffect(() => {
    if (!page) {
      navigate("/history/inicio", { replace: true });
      return;
    }

    let temp = history.head;
    while (temp) {
      if (temp.value === page) {
        history.current = temp;
        setCurrent(temp.value);
        return;
      }
      temp = temp.next;
    }

    navigate("/history/inicio", { replace: true });
  }, [page, navigate, history]);

  const handleForward = () => {
    const nextPage = history.forward();
    if (nextPage) navigate(`/history/${nextPage}`);
  };

  const handleBack = () => {
    const prevPage = history.back();
    if (prevPage) navigate(`/history/${prevPage}`);
  };

  return (
    <div className="page-container">
      <h2> Historial de Navegación</h2>
      <div className="current-info">
        <p> Página actual: <strong>{current}</strong></p>
      </div>
      <div className="action-buttons">
        <button onClick={handleBack} disabled={!history.current?.prev}>
           Atrás
        </button>
        <button onClick={handleForward} disabled={!history.current?.next}>
           Adelante
        </button>
      </div>
    </div>
  );
};

export default Browser;