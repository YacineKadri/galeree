import React from "react";
import "./PostCard.css";



function PostCard({ post }) {

  console.log(post)
  return (
    <div className="postcard">
      <img src={post.picture} alt="" />
    </div>
  );
}

export default PostCard;
