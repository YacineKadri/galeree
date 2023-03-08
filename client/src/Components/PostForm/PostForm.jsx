import React from "react";
import {useAuth, useUser} from "@clerk/clerk-react"
import './PostForm.css';
import { Button, ButtonGroup, Input } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'


function PostForm(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {userId} = useAuth()
  function useGetUserName() {
    const { isSignedIn, user } = useUser();
    if (!isSignedIn) {
      return null;
    }
    return user.username;
  }

  const userName = useGetUserName();
  const handleSubmit = (event) => {
    event.preventDefault();
   
    console.log(userId)
    const formData = new FormData();
    formData.append("picture", event.target[0].files[0]);
    formData.append("description", event.target[1].value);
    formData.append("userId", userId)
    formData.append("author", userName)
    console.log("submit");
    fetch("http://localhost:4000/create", {
      method: "POST",
      //headers: { "Content-Type": "multipart/form-data" },
      body: formData, 
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
      }).catch((e) => console.log(e));
  };

  return (
    <>
    
    <Button onClick={onOpen}>Post an Artwork</Button>

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Post an Artwork</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <form onSubmit={handleSubmit}>
      <input type="file" accept="image/png, image/jpeg" name="picture" />
       <Input name="description" id=""  size='md' placeholder="Enter a description..."></Input>
      <Button type="submit" colorScheme={"purple"} onClick={onClose}>Post Artwork</Button>
    </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  </>
   
  );
}

export default PostForm;

