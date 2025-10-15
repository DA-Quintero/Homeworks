import { ref, set, get } from "firebase/database";
import { db } from "../../firebase/config";
import { setPosts, setLoading, setError } from "../slices/postsSlice";

export const savePostsToFirebase = (userId) => {
  return async (dispatch, getState) => {
    try {
      const { posts } = getState().posts;
      const postsRef = ref(db, `users/${userId}/posts`);
      await set(postsRef, posts);
    } catch (error) {
      dispatch(setError(error.message));
      console.error("Error guardando posts:", error);
    }
  };
};

export const loadPostsFromFirebase = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const postsRef = ref(db, `users/${userId}/posts`);
      const snapshot = await get(postsRef);
      
      if (snapshot.exists()) {
        dispatch(setPosts(snapshot.val()));
      } else {
        dispatch(setPosts([]));
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      console.error("Error cargando posts:", error);
    }
  };
};
