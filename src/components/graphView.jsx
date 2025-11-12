import React, { memo, useEffect, useState } from "react";
import { Graph } from "react-d3-graph";

const GraphView = memo(({ graphData }) => {
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateDimensions = () => {
      const container = document.querySelector('.right-column');
      if (container) {
        setDimensions({
          width: container.clientWidth - 60,
          height: container.clientHeight - 60,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const config = {
    automaticRearrangeAfterDropNode: true,
    nodeHighlightBehavior: true,
    height: dimensions.height,
    width: dimensions.width,
    node: {
      color: "lightgreen",
      size: 400,
      highlightStrokeColor: "#4db8ff",
      labelProperty: "id",
      fontSize: 14,
      fontWeight: "bold",
      fontColor: "#e0e0e0",
    },
    link: {
      highlightColor: "#4db8ff",
      strokeWidth: 3,
      color: "#00d4ff",
    },
    directed: false,
    d3: {
      gravity: -250,
      linkLength: 200,
      alphaTarget: 0.05,
    },
  };

  if (!graphData.nodes.length) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "#a0a0a0" }}>
        <p>No hay datos para mostrar en el grafo</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Graph id="graph" data={graphData} config={config} />
    </div>
  );
});

GraphView.displayName = "GraphView";

export default GraphView;
