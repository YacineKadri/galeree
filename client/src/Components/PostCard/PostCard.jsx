import React from "react";
import "./PostCard.css";
import { useAuth, useUser } from "@clerk/clerk-react";
import CommentSection from "../CommentSection/CommentSection";
import { useState, useEffect } from "react";

function PostCard({ post }) {
  const { userId } = useAuth();
  function useGetUserName() {
    const { isSignedIn, user } = useUser();
    if (!isSignedIn) {
      return null;
    }
    return user.username;
  }

  const userName = useGetUserName();
  const [comments, setComments] = useState([]);
  function postComment(event) {
    console.log(userName);
    event.preventDefault();
    console.log("comment posted");
    fetch(`http://localhost:4000/comments/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: event.target[0].value,
        postId: post.id,
        author: userName,
      }),
    });
  }
  useEffect(() => {
    getComments();
  }, []);
  function getComments() {
    fetch(`http://localhost:4000/comments/${post.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((comments) => {
        console.log("comments in getComments", comments);
        setComments(comments);
      });
  }

  function likePost() {
    fetch(`http://localhost:4000/like/${post.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        postId: post.id,
      }),

    });
  }

  console.log(comments);

  console.log(post);
  return (
    <div className="postcard">
      <img src={post.picture} alt="" />
      <form onSubmit={postComment}>
        <input type="text" />
      
        <button type="submit">Comment</button>
      </form>
      <button onClick={likePost} className="likebtn">Like</button>
      <CommentSection comments={comments} />
    
    </div>
  );
}
export default PostCard;
