import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import {
  setItems,
  addItem,
  updateItemLocal,
  deleteItemLocal,
  setError,
  setLoading,
} from "../slices/firebaseSlice";

export const getItems = (collectionName) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const items = [];
      querySnapshot.forEach((docu) => {
        items.push({ id: docu.id, ...docu.data() });
      });
      dispatch(setItems(items));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const addNewItem = (collectionName, newData) => {
  return async (dispatch) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), newData);
      dispatch(addItem({ id: docRef.id, ...newData }));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};

export const updateItem = (collectionName, id, newData) => {
  return async (dispatch) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, newData);
      dispatch(updateItemLocal({ id, data: newData }));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};

export const deleteItem = (collectionName, id) => {
  return async (dispatch) => {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      dispatch(deleteItemLocal(id));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};
