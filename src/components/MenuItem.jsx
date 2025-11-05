import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function MenuItem({ node, level }) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const handleClick = () => {
    if (hasChildren) setExpanded(!expanded);
  };

  return (
    <div style={{ marginBottom: "4px" }}>
      <div
        onClick={handleClick}
        style={{
          display: "flex",
          alignItems: "center",
          cursor: hasChildren ? "pointer" : "default",
          padding: "8px 12px",
          paddingLeft: `${12 + level * 20}px`,
          borderRadius: "6px",
          transition: "all 0.2s ease",
          backgroundColor: expanded ? "#f3f4f6" : "transparent",
          fontWeight: hasChildren ? "500" : "400",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#f3f4f6";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = expanded ? "#f3f4f6" : "transparent";
        }}
      >
        {hasChildren && (
          <span
            style={{
              display: "inline-block",
              width: "16px",
              textAlign: "center",
              color: "#6b7280",
              fontSize: "0.7rem",
              transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
              marginRight: "8px",
            }}
          >
            ▶
          </span>
        )}
        {!hasChildren && <span style={{ width: "24px", display: "inline-block" }}></span>}
        {hasChildren ? (
          <span style={{ userSelect: "none", color: "#111827" }}>{node.title}</span>
        ) : (
          <Link
            to={node.link}
            style={{
              textDecoration: "none",
              color: "#374151",
              flex: 1,
              fontSize: "0.95rem",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#111827";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#374151";
            }}
          >
            {node.title}
          </Link>
        )}
      </div>

      {expanded && hasChildren && (
        <div style={{ marginTop: "2px" }}>
          {node.children.map((child, i) => (
            <MenuItem key={i} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
