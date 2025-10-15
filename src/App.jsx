import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Header } from './components/Header';
import { Posts } from './components/Posts';
import { Notifications } from './components/Notifications';
import { DirectMessages } from './components/DirectMessages';
import { loadPostsFromFirebase } from './store/thunks/postsThunk';
import { loadNotificationsFromFirebase } from './store/thunks/notificationsThunk';
import { loadMessagesFromFirebase } from './store/thunks/messagesThunk';

function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.auth.user);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function PublicRoute({ children }) {
  const user = useSelector((state) => state.auth.user);
  
  if (user) {
    return <Navigate to="/posts" replace />;
  }
  
  return children;
}

function ProtectedLayout({ children }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.uid) {
      dispatch(loadPostsFromFirebase(user.uid));
      dispatch(loadNotificationsFromFirebase(user.uid));
      dispatch(loadMessagesFromFirebase(user.uid));
    }
  }, [user, dispatch]);

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } 
      />

      {/* Rutas protegidas */}
      <Route 
        path="/posts" 
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <Posts />
            </ProtectedLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/notifications" 
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <Notifications />
            </ProtectedLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/messages" 
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <DirectMessages />
            </ProtectedLayout>
          </ProtectedRoute>
        } 
      />

      {/* Ruta por defecto */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
