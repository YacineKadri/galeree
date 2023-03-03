import React from "react";
import {useAuth} from "@clerk/clerk-react"


function PostForm(props) {
  const {userId} = useAuth()
  const handleSubmit = (event) => {
    event.preventDefault();
   
    console.log(userId)
    const formData = new FormData();
    formData.append("picture", event.target[0].files[0]);
    formData.append("description", event.target[1].value);
    formData.append("userId", userId)
    console.log("submit");
    console.log(formData);
    fetch("http://localhost:4000/create", {
      method: "POST",
      // headers: { "Content-Type": "multipart/form-data" },
      body: formData, 
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/png, image/jpeg" name="picture"/>
      <textarea name="description" id="" cols={30} rows={10}></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}

export default PostForm;

