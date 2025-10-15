import { ref, set, get } from "firebase/database";
import { db } from "../../firebase/config";
import { setNotifications, setLoading, setError } from "../slices/notificationsSlice";

export const saveNotificationsToFirebase = (userId) => {
  return async (dispatch, getState) => {
    try {
      const { notifications } = getState().notifications;
      const notificationsRef = ref(db, `users/${userId}/notifications`);
      await set(notificationsRef, notifications);
    } catch (error) {
      dispatch(setError(error.message));
      console.error("Error guardando notificaciones:", error);
    }
  };
};

export const loadNotificationsFromFirebase = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const notificationsRef = ref(db, `users/${userId}/notifications`);
      const snapshot = await get(notificationsRef);
      
      if (snapshot.exists()) {
        dispatch(setNotifications(snapshot.val()));
      } else {
        dispatch(setNotifications([]));
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      console.error("Error cargando notificaciones:", error);
    }
  };
};
