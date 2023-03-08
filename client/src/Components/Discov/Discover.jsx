import React from "react";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../PostCard/PostCard.jsx";
import "./Discover.css";
import {Rodal} from "rodal";

function Discover() {
  function fetchRandomPics() {
    return fetch("http://localhost:4000/create", {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }
  const { isLoading, error, data } = useQuery(["pics"], fetchRandomPics);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <h1 className="title">Welcome to Galeree</h1>
      <div className="discover-feed">
        {data.map((post) => (
          <img className="image" src={post.picture} />
        ))}
      </div>
    </>
  );
}

export default Discover;
