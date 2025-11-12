import { ref, push, onValue } from "firebase/database";
import { db } from "../../firebase/config";
import { setMessages } from "../slices/chatSlice";

export const listenMessages = () => {
  return (dispatch) => {
  const messagesRef = ref(db, "messages/");
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val() || {};
      const messages = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      dispatch(setMessages(messages));
    });
  };
};

export const sendMessage = (text, user) => {
  return async () => {
  const messagesRef = ref(db, "messages/");
    const newMessage = {
      text,
      user,
      timestamp: Date.now(),
    };
    await push(messagesRef, newMessage);
  };
};