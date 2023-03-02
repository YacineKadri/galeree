import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Pics } from "../../../types";


function fetchRandomPics() {
    return fetch("https://api.unsplash.com/photos/random", {   headers: {
        "Content-Type": "application/json",
        'Authorization': 'Client-ID mIvqyGlZEQE3iJS0c8sVucET3KL8I3R9vyDVxAusjIQ'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },}).then((res) => {
        console.log(res);
        return res.json();
      });
    }


function Discover() {
  const { isLoading, error, data, isFetching}= useQuery(["pics"], fetchRandomPics);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <>
   
    <img src={data.urls.small} alt="" />
    </>
  );
}

export default Discover;
