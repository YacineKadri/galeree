import React from "react";

function PostForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    let description = event.target[1].value
    let picture = event.target[0].value
    console.log("submit");
    console.log(description, picture)
    fetch("http://localhost:4000/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({description: description, picture: picture}),
    }).then((res) => {
      console.log(res);
      return res.json();
    });
  };

  return (
    <form onSubmit={handleSubmit} method="post">
      <input type="file" accept="image/png, image/jpeg" />
      <textarea name="" id="" cols={30} rows={10}></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}

export default PostForm;
