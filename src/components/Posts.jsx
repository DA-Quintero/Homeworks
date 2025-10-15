import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, deletePost } from "../store/slices/postsSlice";
import { pushNotification } from "../store/slices/notificationsSlice";
import { savePostsToFirebase } from "../store/thunks/postsThunk";
import { saveNotificationsToFirebase } from "../store/thunks/notificationsThunk";

export const Posts = () => {
  const [newPost, setNewPost] = useState("");
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const user = useSelector((state) => state.auth.user);

  const handleAddPost = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      dispatch(
        addPost({
          content: newPost,
          author: user?.displayName || user?.email,
        })
      );
      
      dispatch(
        pushNotification({
          message: `Nuevo post publicado: "${newPost.substring(0, 30)}..."`,
          type: "success",
        })
      );
      
      setNewPost("");
    }
  };

  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId));
    dispatch(
      pushNotification({
        message: "Post eliminado correctamente",
        type: "info",
      })
    );
  };

  useEffect(() => {
    if (user?.uid && posts.length > 0) {
      dispatch(savePostsToFirebase(user.uid));
      dispatch(saveNotificationsToFirebase(user.uid));
    }
  }, [posts, dispatch, user]);

  return (
    <div className="posts-container">
      <div className="section-header">
        <h2>Posts</h2>
      </div>

      <form onSubmit={handleAddPost} className="post-form">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Crea un nuevo post..."
          className="post-textarea"
          rows="3"
        />
        <button type="submit" className="btn btn-primary">
          Publicar
        </button>
      </form>

      <div className="posts-list">
        {posts.length === 0 ? (
          <div className="empty-state">
            <p>No hay posts todavía.</p>
          </div>
        ) : (
          posts.map((post, index) => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <div className="post-author">
                  <strong>{post.author}</strong>
                  <span className="post-number">Post #{index + 1}</span>
                </div>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="btn-delete"
                  title="Eliminar post"
                >
                  Eliminar
                </button>
              </div>
              <p className="post-content">{post.content}</p>
              <div className="post-footer">
                <span className="post-time">
                  {new Date(post.timestamp).toLocaleString("es-CO")}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
