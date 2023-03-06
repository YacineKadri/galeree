import './NavBar.css';
import React from "react";
import { SignInButton, SignOutButton, useAuth } from '@clerk/clerk-react';

function NavBar() {
  const {userId} = useAuth();
  return (

    <div className="container-fluid">
      {userId === null ? <SignInButton /> : <SignOutButton />}
      <h1 className='galeree'>Galeree</h1>
        </div>
       
  );
}

export default NavBar;
