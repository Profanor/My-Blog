import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments }) => {
  return (
    <div>
      {comments.map((comment, index) => (
        <Comment key={index} commenter={comment.commenter} content={comment.content} timestamp={comment.timestamp} />
      ))}
    </div>
  );
};

export default CommentList;
