import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";
import { register } from "../slices/authSlice";

export const registerAuth = (email, password, displayName) => {
  return async (dispatch) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)

      await updateProfile(auth.currentUser, { displayName })

      const { uid, photoURL } = auth.currentUser;
      dispatch(register({ uid, email, displayName, photoURL }))
    } catch (error) {
      console.error("Error en el registro:", error.message)
    }
  }
}