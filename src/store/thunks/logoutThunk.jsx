import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { logout } from "../slices/authSlice";
import { clearPosts } from "../slices/postsSlice";
import { clearNotifications } from "../slices/notificationsSlice";
import { clearMessages } from "../slices/messagesSlice";

export const logoutThunk = () => {
  return async (dispatch) => {
    try {
      await signOut(auth);
      dispatch(logout());
      dispatch(clearPosts());
      dispatch(clearNotifications());
      dispatch(clearMessages());
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };
};