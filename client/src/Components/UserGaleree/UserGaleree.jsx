import React from 'react';
import { Navigate, useParams} from 'react-router';
import PostCard from '../PostCard/PostCard';
import { useQuery } from "@tanstack/react-query";
import { useState } from 'react';
import "./UserGaleree.css";


const UserGaleree = () => {
    const {author} = useParams();
    console.log(author)
    const [details, setDetails] = useState(false)
    const [image, setImage] = useState(null);
    const { isLoading, error, data } = useQuery(["pics", author], () =>
    fetchUserPics(author)
  );

  console.log(data)
  

    function handleModal(post) {
        console.log(post)
        setImage(post)
        setDetails(true)
      }

    function fetchUserPics(author) {
        return fetch(`http://localhost:4000/galeree-posts/${author}`, {
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());
      }

        if (error || !data) return <div>Something went wrong...</div>;
    return (
        < div className="user-galeree">
       
            <h1>{author}'s Galeree</h1>
            
        <div
        className="image-track"
        // onMouseDown={handleOnDown}
        // onTouchStart={(e) => handleOnDown(e.touches[0])}
        // onMouseUp={handleOnUp}
        // // onScroll={handleOnMove}
        // onTouchEnd={(e) => handleOnUp(e.touches[0])}
        // onMouseMove={handleOnMove}
        // // onTouchMove={(e) => handleOnMove(e.touches[0])}
        // data-prev-percentage={prevPercentage}
        // data-percentage={percentage}
      >
        {data.map((img) => (
          <img className="image" src={img.picture} key={img.id} onClick={() => handleModal(img)}  />
        ))}
      
      {image && <PostCard post={image} details={details} setImage={setImage} />}
      </div>
      </div>
    );
}

export default UserGaleree;
