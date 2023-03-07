import "./App.css";
import Discover from "./Components/Discov/Discover";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
  useUser,
  SignInButton,
  useAuth,
} from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostForm from "./Components/PostForm/PostForm";
import NavBar from "./Components/NavBar/NavBar";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import AvatarChat from "./Components/AvatarChat/AvatarChat.tsx";
import Dashboard from "./Components/Dashboard/Dashboard";
import { ParallaxProvider } from "react-scroll-parallax";
import { Routes, Route, useLocation } from "react-router-dom";
import UserGaleree from "./Components/UserGaleree/UserGaleree";
import ParallaxEffect from "./Components/ParallaxEffect/ParallaxEffect";

const clerkPublicApi =
  "pk_test_bG92aW5nLW1hbW1hbC03LmNsZXJrLmFjY291bnRzLmRldiQ";
const queryClient = new QueryClient();
function App() {
  const location = useLocation();
  return (
    <>
   
      <QueryClientProvider client={queryClient}>
        <ParallaxProvider>
          <ClerkProvider publishableKey={clerkPublicApi}>
            <Dashboard>
              <SignedIn>
                <AvatarChat />
                {/* <Hello /> */}
                <PostForm />
                <ProfilePage />
              </SignedIn>
              <SignedOut>
                <NavBar/>

                {/* {location === "/galeree/:author" ? <UserGaleree/> : null} */}
                {/* <Discover /> */}
              </SignedOut>
            </Dashboard>
         
          </ClerkProvider>
        </ParallaxProvider>
      </QueryClientProvider>
    </>
  );
}

function Hello() {
  // Get the user's first name
  const { user } = useUser();

  return (
    <div className="App-header">
      {/* Mount the UserButton component */}
      <UserButton />
      {user ? <h1>Hello, {user.username}!</h1> : null}
    </div>
  );
}

export default App;
