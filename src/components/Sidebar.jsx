import React from "react";
import MenuItem from "./MenuItem";
import menuTree from "../data/menuTree";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar-container">
      <h2 style={{ 
        fontWeight: "bold", 
        fontSize: "1.5rem", 
        marginBottom: "1.5rem",
        color: "#111827",
        borderBottom: "2px solid #e5e7eb",
        paddingBottom: "0.75rem"
      }}>
        Menú
      </h2>
      <div>
        {menuTree.map((node, index) => (
          <MenuItem key={index} node={node} level={0} />
        ))}
      </div>
    </div>
  );
}