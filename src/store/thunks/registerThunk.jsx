import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";
import { setUser, setLoading, setError } from "../slices/authSlice";

export const registerThunk = ({ email, password, displayName }) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(response.user, { displayName });

      const { uid, photoURL } = response.user;
      
      dispatch(setUser({ 
        uid, 
        email, 
        displayName, 
        photoURL 
      }));
    } catch (error) {
      console.error("Error en el registro:", error.message);
      let errorMessage = 'Error al registrarse';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Este email ya está registrado';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email inválido';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'La contraseña debe tener al menos 6 caracteres';
      }
      
      dispatch(setError(errorMessage));
      dispatch(setLoading(false));
    }
  };
};