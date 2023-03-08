import "./NavBar.css";
import React from "react";
import {
  SignInButton,
  SignOutButton,
  useAuth,
  UserButton,
} from "@clerk/clerk-react";
import { Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

function NavBar() {
  const { userId } = useAuth();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  

useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    return fetch("http://localhost:4000/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const filteredUsers = users.filter((user) => {
    return user.author.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="container-fluid">
      {/* {userId === null ? <SignInButton /> : <SignOutButton />} */}
      {userId !== null ? <UserButton /> : <SignInButton />}
      <Text className="galeree">Galeree</Text>
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="search"
      />
      <div className="users">
        { searchQuery && filteredUsers.map((user) => {
          return (
            <div className="user" key={user.id}>
              <a href={`/galeree/${user.author}`}>{user.author}</a> 
              </div>)} )}
    </div>
    </div>
  );
}

export default NavBar;

