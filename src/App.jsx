import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";

import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Services from "./components/pages/Services";
import News from "./components/pages/News";
import Projects from "./components/pages/Projects";
import Settings from "./components/pages/Settings";
import Security from "./components/pages/Security";
import Activity from "./components/pages/Activity";
import Contact from "./components/pages/Contact";
import FAQ from "./components/pages/FAQ";

import { dfs, bfs } from "./TreeNode.js";
import menuTree from "./data/menuTree";

function App() {
  useEffect(() => {
    console.log("=== Árbol N-ario de Menús ===");
    console.log("\n=== DFS Traversal (Depth First Search) ===");
    
    menuTree.forEach(node => {
      const nodoRaiz = {
        valor: { title: node.title, link: node.link },
        hijos: node.children ? node.children.map(child => ({
          valor: { title: child.title, link: child.link },
          hijos: []
        })) : []
      };
      
      dfs(nodoRaiz, (valor) => {
        console.log(`📍 ${valor.title} -> ${valor.link}`);
      });
    });

    console.log("\n=== BFS Traversal (Breadth First Search) ===");
    menuTree.forEach(node => {
      const nodoRaiz = {
        valor: { title: node.title, link: node.link },
        hijos: node.children ? node.children.map(child => ({
          valor: { title: child.title, link: child.link },
          hijos: []
        })) : []
      };
      
      bfs(nodoRaiz, (valor) => {
        console.log(`📍 ${valor.title} -> ${valor.link}`);
      });
    });
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/home/about" element={<About />} />
              <Route path="/home/services" element={<Services />} />
              <Route path="/home/news" element={<News />} />
              <Route path="/home/projects" element={<Projects />} />
              <Route path="/profile" element={<Settings />} />
              <Route path="/profile/settings" element={<Settings />} />
              <Route path="/profile/security" element={<Security />} />
              <Route path="/profile/activity" element={<Activity />} />
              <Route path="/help" element={<Contact />} />
              <Route path="/help/contact" element={<Contact />} />
              <Route path="/help/faq" element={<FAQ />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
