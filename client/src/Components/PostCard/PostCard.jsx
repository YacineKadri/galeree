import React from "react";
import "./PostCard.css";
import { useAuth, useUser } from "@clerk/clerk-react";
import CommentSection from "../CommentSection/CommentSection";
import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, StarIcon } from "@chakra-ui/icons";

function PostCard({ post, details, setImage }) {
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

  function deletePost() {
    fetch(`http://localhost:4000/delete/${post.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
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
          <button type="submit">Edit Description</button>
        </form>
      </div>
    );
  }

  function editPost(event) {
  

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

  function deleteButton() {
    return (
      <div>
        <button onClick={deletePost}>Delete Post</button>
      </div>
    );
  }

  console.log(comments);

  console.log(post);
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
    {/* <Button onClick={onOpen}>Open Modal</Button> */}
      <Modal isOpen={details} onClose={() => setImage(false)} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{post.author}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="postcard">
              {userId === post.userId ? deleteButton() : null}
              <img src={post.picture} alt="" />
              <p>{post.description}</p>
              <h3>{post.author}</h3>
              <form onSubmit={postComment}>
                <input className='comment-input'type="text" required={true} />
                <Button type="submit">Comment</Button>
              </form>
              {userId === post.userId ? (
                <div>
                  <form onSubmit={editPost}>
                    <input type="text" required={true} />
                    <IconButton type="submit" icon={<EditIcon/>}/>
                  </form>
                </div>
              ) : null}
              <IconButton onClick={likePost} className="likebtn" icon={<StarIcon/>}/>
                
              
              <CommentSection comments={comments} />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PostCard;

// Modal Approach
//import React, { useState } from "react";
// import "./PostCard.css";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import CommentSection from "../CommentSection/CommentSection";
// import { Modal, Button } from "react-bootstrap";

// function PostCard({ post }) {
//   const { userId } = useAuth();
//   function useGetUserName() {
//     const { isSignedIn, user } = useUser();
//     if (!isSignedIn) {
//       return null;
//     }
//     return user.username;
//   }

//   const userName = useGetUserName();
//   const [comments, setComments] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const handleClose = () => setShowModal(false);
//   const handleShow = () => setShowModal(true);

//   function postComment(event) {
//     event.preventDefault();
//     console.log("comment posted");
//     fetch(`http://localhost:4000/comments/${userId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         message: event.target[0].value,
//         postId: post.id,
//         author: userName,
//       }),
//     });
//   }
//   function getComments() {
//     fetch(`http://localhost:4000/comments/${post.id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((comments) => {
//         setComments(comments);
//       });
//   }

//   function deletePost() {
//     fetch(`http://localhost:4000/delete/${post.id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }

//   function likePost() {
//     fetch(`http://localhost:4000/like/${post.id}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         userId: userId,
//         postId: post.id,
//       }),
//     });
//   }

//   function editPost(event) {
//     event.preventDefault();

//     console.log(`http://localhost:4000/edit/${post.id}`);
//     fetch(`http://localhost:4000/edit/${post.id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         description: event.target[0].value,
//         postId: post.id,
//       }),
//     })
//       .then((res) => {
//         console.log(res);
//         return res.json();
//       })
//       .then((data) => {
//         console.log(data);
//         return data;
//       });
//   }

//   console.log(comments);

//   console.log(post);
//   return (
//     <>
//       <div className="postcard">
//         {userId === post.userId ? (
//           <Button variant="danger" onClick={deletePost}>
//             Delete Post
//           </Button>
//         ) : null}
//         <img src={post.picture} alt="" />
//         <p>{post.description}</p>
//         <Button variant="primary" onClick={handleShow}>
//           Edit Description
//         </Button>
//         <button onClick={likePost} className="likebtn">
//           Like
//         </button>
//         <CommentSection comments={comments} />
//       </div>
//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Post Description</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form onSubmit={editPost}>
//             <input type="text" required="true" />
//             <button type="submit">Edit Description</button>
//           </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }
