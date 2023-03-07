import './NavBar.css';
import React from "react";
import { SignInButton, SignOutButton, useAuth, UserButton } from '@clerk/clerk-react';
import {Text} from '@chakra-ui/react'

function NavBar() {
  const {userId} = useAuth();

  function redirect() {
    window.location.href = "/";
  }

  return (

    <div className="container-fluid">
      {userId === null ? <SignInButton /> : <SignOutButton />}
      {userId !== null ? <UserButton/> : null}
      <Text onClick={() => redirect}className='galeree'>Galeree</Text>
        </div>
       
  );
}

export default NavBar;
