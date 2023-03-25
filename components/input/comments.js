import { useEffect, useState, useContext } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments({ eventId }) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      const setCommentsAsync = async () => {
        const res = await fetch(`/api/comments/${eventId}`);
        const data = await res.json();
        setComments(data.comments);
        setIsFetchingComments(false);
      };
      setCommentsAsync();
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    showNotification({
      title: 'Sending comment',
      message: 'Your comment is currently being stored into a database',
      status: 'pending',
    });
    // send data to API
    fetch(`/api/comments/${eventId}`, {
      method: 'post',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          res.json().then((data) => {
            throw new Error(data.message);
          });
        }
        return res.json();
      })
      .then(() => {
        showNotification({
          title: 'Success!',
          message: 'Your  comment was saved!',
          status: 'success',
        });
      })
      .catch((err) => {
        showNotification({
          title: 'Error!',
          message: err.message || 'Somethong went wrong!',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && (
        <CommentList comments={comments} />
      )}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
