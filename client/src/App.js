import "./App.css";
import Discover from "./Components/Discov/Discover.tsx";
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
import NavBar from "./Components/NavBar/NavBar.tsx";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
const clerkPublicApi =
  "pk_test_bG92aW5nLW1hbW1hbC03LmNsZXJrLmFjY291bnRzLmRldiQ";
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider publishableKey={clerkPublicApi}>
          <SignedIn>
            {/* <Hello /> */}
            <PostForm />
            <ProfilePage />
          </SignedIn>
          <SignedOut>
            <NavBar>
              <SignInButton />
            </NavBar>
            <Discover />
          </SignedOut>
        </ClerkProvider>
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
