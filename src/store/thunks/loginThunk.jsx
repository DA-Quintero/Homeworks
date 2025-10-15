import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { setUser, setLoading, setError } from "../slices/authSlice";

export const loginThunk = ({ email, password }) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const response = await signInWithEmailAndPassword(auth, email, password);
      const { uid, displayName, photoURL } = response.user;
      
      dispatch(setUser({
        uid, 
        email, 
        displayName, 
        photoURL 
      }));
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      let errorMessage = 'Error al iniciar sesión';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'Usuario no encontrado';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Contraseña incorrecta';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email inválido';
      }
      
      dispatch(setError(errorMessage));
      dispatch(setLoading(false));
    }
  };
};