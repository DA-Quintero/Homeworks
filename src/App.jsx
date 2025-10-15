import './App.css'
import { Registro } from './components/register'
import { Login } from './components/login'
import { Crud } from './components/fbCrud'
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/register" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/crud" element={<Crud />} />
        <Route path="/" element={<Navigate to="/register" replace />} />
      </Routes>
    </div>
  )
}

export default App
