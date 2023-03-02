import React from "react";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../PostCard/PostCard.tsx";
import "./Discover.css";

function Discover() {
  function fetchRandomPics() {
    return fetch("http://localhost:4000/create", {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }
  const { isLoading, error, data } = useQuery(["pics"], fetchRandomPics);
  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="discover">
    {data.map((post) => ( 
      <PostCard key={post.id} post={post} />
    ))}
    </div>
   
   
    
  );
}

export default Discover;
