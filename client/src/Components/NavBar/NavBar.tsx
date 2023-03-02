import { RedirectToSignIn } from "@clerk/clerk-react";
import React from "react";

function NavBar() {
  return (
    <>
      <button
        onClick={() => {
          console.log("test");
          return <RedirectToSignIn />;
        }}
      >
        Sign In
      </button>
    </>
  );
}

export default NavBar;
