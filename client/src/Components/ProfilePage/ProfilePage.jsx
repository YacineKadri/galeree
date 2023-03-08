import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../PostCard/PostCard.jsx";
import "./ProfilePage.css";
import { UserButton } from "@clerk/clerk-react";
import Rodal from "rodal";
import ReadyPlayerMe from "../ReadyPlayerMe/ReadyPlayerMe.jsx";
import PostForm from "../PostForm/PostForm.jsx";

function ProfilePage() {
  const [mouseDownAt, setMouseDownAt] = useState(null);
  const [prevPercentage, setPrevPercentage] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [details, setDetails] = useState(false);
  const [image, setImage] = useState(null);
  const { userId } = useAuth();
  const { isLoading, error, data } = useQuery(["pics", userId], () =>
    fetchUserPics(userId)
  );

  function handleOnDown(e) {
    setMouseDownAt(e.clientX);
  }

  function handleOnUp() {
    setMouseDownAt(null);
    setPrevPercentage(percentage);
  }

  // function handleOnMove(e) {
  //   if (!mouseDownAt) return;
  //   const mouseDelta = parseFloat(mouseDownAt) - e.clientX;
  //   const maxDelta = window.innerWidth / 2;
  //   const percentage = (mouseDelta / maxDelta) * -100;
  //   const nextPercentageUnconstrained =
  //     parseFloat(prevPercentage) + percentage;
  //   const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  //   setPercentage(nextPercentage);

  // window.requestAnimationFrame(() => {
  //   for (const image of document.getElementsByClassName("image")) {
  //   return        image.style.transform = `translate(${nextPercentage}%, -50%)`;
  //   // image.animate({objectPosition: `${100 + nextPercentage}% center`},
  //   // {duration: 1200, fill: `forwards`})

  //   }
  // });
  //

  function handleOnMove(e) {
    window.requestAnimationFrame(() => {
      const track = document.getElementById("image-track");

      if (track.dataset.mouseDownAt === "0") return;

      const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

      const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained =
          parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(
          Math.min(nextPercentageUnconstrained, 0),
          -100
        );

      track.dataset.percentage = nextPercentage;

      track.animate(
        {
          transform: `translate(${nextPercentage}%, -50%)`,
        },
        { duration: 1200, fill: "forwards" }
      );

      for (const image of track.getElementsByClassName("image")) {
        image.animate(
          {
            objectPosition: `${100 + nextPercentage}% center`,
          },
          { duration: 1200, fill: "forwards" }
        );
      }
    });
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
    console.log(post);
    setImage(post);
    setDetails(true);
  }

  return (
    <>
      <div className="profile-header">
          <PostForm />
          <ReadyPlayerMe />
        </div>
      <div className="profile-page">
      
        <div
          className="image-track"
          onMouseDown={handleOnDown}
          onTouchStart={(e) => handleOnDown(e.touches[0])}
          onMouseUp={handleOnUp}
          // onScroll={handleOnMove}
          onTouchEnd={(e) => handleOnUp(e.touches[0])}
          onMouseMove={handleOnMove}
          // onTouchMove={(e) => handleOnMove(e.touches[0])}
          data-prev-percentage={prevPercentage}
          data-percentage={percentage}
        >
          {data.map((img) => (
            <img
              className="image"
              src={img.picture}
              key={img.id}
              onClick={() => handleModal(img)}
            />
          ))}
        </div>
        {image && (
          <PostCard post={image} details={details} setImage={setImage} />
        )}
      </div>
    </>
  );
}

export default ProfilePage;
