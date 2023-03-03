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
  useAuth
} from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostForm from "./Components/PostForm/PostForm";
import NavBar from "./Components/NavBar/NavBar.tsx";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
const clerkPublicApi =
  "pk_test_bG92aW5nLW1hbW1hbC03LmNsZXJrLmFjY291bnRzLmRldiQ";
const queryClient = new QueryClient();
function App() {

  async function adobeTools() {
    try {
      const response = await fetch(
        "https://image.adobe.io/pie/psdService/hello",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE2Nzc3OTU1MzM2MDdfOGJlM2JiZGQtOGY3NS00NzViLTk0MGYtZDdjNGExMGQxMzJlX3VlMSIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiJkZWU5OWZjN2YwYTM0MDM4YmIxZTI2ZDY2YTI5MDQzOSIsInVzZXJfaWQiOiI0RkVBMjUxRDYzRjdDMjg1MEE0OTVDODFAdGVjaGFjY3QuYWRvYmUuY29tIiwiYXMiOiJpbXMtbmExIiwiYWFfaWQiOiI0RkVBMjUxRDYzRjdDMjg1MEE0OTVDODFAdGVjaGFjY3QuYWRvYmUuY29tIiwiY3RwIjozLCJmZyI6IlhIWEZWTUpXRlBGNVlQNEtHTVFWWkhRQVJVPT09PT09IiwibW9pIjoiYmEwYTZmYiIsImV4cGlyZXNfaW4iOiI4NjQwMDAwMCIsImNyZWF0ZWRfYXQiOiIxNjc3Nzk1NTMzNjA3Iiwic2NvcGUiOiJvcGVuaWQsQWRvYmVJRCxyZWFkX29yZ2FuaXphdGlvbnMifQ.PUiX1QEy56IfkYgSWgF6ZpIFzHpDjOzWQNs1-xqYnnUOAFqPG4RywR5tJa5u54TXKFgI42NUa1iB87rqPXAFV7cPSawkWLiAgwTP7hIprLx6eewBHTPz9jXSybjjOgb5EG7luDw9rSfob2BlrOkPBsz7HKjLRK-SetC4TTgAu1yZt25KWws2YDFhx8bQ1k9Ucm7BV4Vi3wcrKnOr8ZA7HecKwQk7f5UGCWVSCQmaPriUm6iqitFeEaKPJeKAJc-qlWhr0DEk9DVSVgm3eFkJrIN6pF0SpD0e_gBZ-xZD_phbGOv8ScBEZ7DGnVqe74g0QsagSR-W0xQgN1vL4rAA5Q",
            "x-api-key": "dee99fc7f0a34038bb1e26d66a290439",
            "Content-Type": "application/json"
          },
        }
      );
      const data = await response.json();
      JSON.stringify(data)
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
 
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider publishableKey={clerkPublicApi}>
          <SignedIn >
            {console.log(adobeTools().then((res) => console.log(res)))}
            <Hello />
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
