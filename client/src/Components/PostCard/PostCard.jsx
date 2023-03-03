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

  
  function editButton() {
    return (
      <div>
        <form onSubmit={editPost}>
          <input type="text" visibility="hidden" />
          <button  type="submit">
            Edit Description
          </button>
        </form>
      </div>
    );
  }

  function editPost(event) {
    event.preventDefault();

    console.log(`http://localhost:4000/edit/${post.id}`);
    fetch(`http://localhost:4000/edit/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: event.target[0].value,
        postId: post.id,
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        return data;
      });
  }

  console.log(comments);

  console.log(post);
  return (
    <div className="postcard">
      <img src={post.picture} alt="" />
      <p>{post.description}</p>
      <form onSubmit={postComment}>
        <input type="text" required="true"/>

        <button type="submit">Comment</button>
      </form>
        {userId === post.userId 
        ? (
        <div>
        <form onSubmit={editPost}>
          <input type="text" required="true" />
          <button  type="submit">
            Edit Description
          </button>
        </form>
      </div>
      ) 
      : null
      }
      <button onClick={likePost} className="likebtn">
        Like
      </button>
      <CommentSection comments={comments} />
    </div>
  );
}
export default PostCard;
