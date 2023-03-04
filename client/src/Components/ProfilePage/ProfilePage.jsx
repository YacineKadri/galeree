// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useAuth } from "@clerk/clerk-react";
// import "./ProfilePage.css";
// import PostCard from "../PostCard/PostCard.jsx";

// function ProfilePage() {


//   async function adobeTools() {
//     try {
//       const response = await fetch('/api/adobe');
//       const data = await response.json();
//       console.log(data);
//       return data;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   function fetchUserPics(userId) {
//     return fetch(`http://localhost:4000/create/${userId}`, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }).then((res) => res.json());
//   }
//   const { userId } = useAuth();
//   const { isLoading, error, data } = useQuery(["pics", userId], () =>
//     fetchUserPics(userId)
//   );
//   if (isLoading) return "Loading...";
//   if (error) return "An error has occurred: " + error.message;

//   return (

//     <div className="image-track">
//           {/* {adobeTools()} */}
//       {data.map((img) => (
//         // <PostCard key={post.id} post={post} />
//         <img  className="image"   src={img.picture} />
//       ))}
//     </div>
//   );
// }

// export default ProfilePage;


import React, { useState } from 'react';
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../PostCard/PostCard.jsx";
import "./ProfilePage.css";
import { UserButton } from '@clerk/clerk-react';
import Rodal from 'rodal';

function ProfilePage() {
  const [mouseDownAt, setMouseDownAt] = useState(null);
  const [prevPercentage, setPrevPercentage] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const { userId } = useAuth();
  const { isLoading, error, data } = useQuery(["pics", userId], () =>
    fetchUserPics(userId)
  );

  function handleOnDown(e) {
    setMouseDownAt(e.clientX);
    console.log(e.clientX)
  }

  function handleOnUp() {
    setMouseDownAt(null);
    setPrevPercentage(percentage);
  }

  function handleOnMove(e) {
    if (!mouseDownAt) return;

    const mouseDelta = parseFloat(mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    console.log(percentage)
    const nextPercentageUnconstrained =
      parseFloat(prevPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    setPercentage(nextPercentage);

    for (const image of document.getElementsByClassName("image")) {
      image.style.transform = `translate(${nextPercentage}%, -50%)`;
      image.animate({objectPosition: `${100 + nextPercentage}% center`},
      {duration: 1000, fill: `forwards`})
    }
  }

  function fetchUserPics(userId) {
    return fetch(`http://localhost:4000/create/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  function handleImageClick() {
    setModalVisible(true);
  }

  function handleModal(post) {
    return (
      <Rodal visible={isModalVisible} onClose={() => setModalVisible(false)}>
        <PostCard key={post.id} post={post} />
      </Rodal>
    );
  }

  return (
   

    
    <div
      className="image-track"
      onMouseDown={handleOnDown}
      onTouchStart={(e) => handleOnDown(e.touches[0])}
      onMouseUp={handleOnUp}
      onTouchEnd={(e) => handleOnUp(e.touches[0])}
      onMouseMove={handleOnMove}
      onTouchMove={(e) => handleOnMove(e.touches[0])}
      data-prev-percentage={prevPercentage}
      data-percentage={percentage}
    >
      {data.map((img) => (
        <img className="image" src={img.picture} key={img.id} onClick={() => handleModal} />
      ))}
    </div>
    
  );
}

export default ProfilePage;
