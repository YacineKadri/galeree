import './NavBar.css';
import React from "react";
import { SignInButton } from '@clerk/clerk-react';

function NavBar() {
  return (
    <div className="container-fluid">
      <SignInButton />
      <h1 className='galeree'>Galeree</h1>
        </div>
       
  );
}

export default NavBar;
