import React from "react";
import "./PostCard.css";



function PostCard({ post }) {

  console.log(post)
  return (
    <div className="postcard">
      <img src={post.picture} alt="" />
      <h2>{post.description}</h2>
    </div>
  );
}

export default PostCard;
