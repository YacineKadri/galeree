import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import PostCard from "../PostCard/PostCard.jsx";

function ProfilePage() {


  async function adobeTools() {
    try {
      const response = await fetch('/api/adobe');
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  function fetchUserPics(userId) {
    return fetch(`http://localhost:4000/create/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }
  const { userId } = useAuth();
  const { isLoading, error, data } = useQuery(["pics", userId], () =>
    fetchUserPics(userId)
  );
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (

    <div>
          {adobeTools()}
      {data.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default ProfilePage;
