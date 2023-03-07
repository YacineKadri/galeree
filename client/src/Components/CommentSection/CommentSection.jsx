import React from "react";
import "./CommentSection.css";

const CommentSection = ({ comments }) => {

    console.log(comments)
  return (
    <div>
      {comments && comments.length >= 1 && comments.map((comment) => {
        console.log(comment);
        return (<div className="comment">
          <p>{comment.message}</p>
          <p>{comment.author}</p>
        </div>);
      })}
    </div>
  );
};

export default CommentSection;
