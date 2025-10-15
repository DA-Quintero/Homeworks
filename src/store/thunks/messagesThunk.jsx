import { ref, set, get } from "firebase/database";
import { db } from "../../firebase/config";
import { setMessages, setLoading, setError } from "../slices/messagesSlice";

export const saveMessagesToFirebase = (userId) => {
  return async (dispatch, getState) => {
    try {
      const { queue } = getState().messages;
      const messagesRef = ref(db, `users/${userId}/messages`);
      await set(messagesRef, queue);
    } catch (error) {
      dispatch(setError(error.message));
      console.error("Error guardando mensajes:", error);
    }
  };
};

export const loadMessagesFromFirebase = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const messagesRef = ref(db, `users/${userId}/messages`);
      const snapshot = await get(messagesRef);
      
      if (snapshot.exists()) {
        dispatch(setMessages(snapshot.val()));
      } else {
        dispatch(setMessages([]));
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      console.error("Error cargando mensajes:", error);
    }
  };
};
