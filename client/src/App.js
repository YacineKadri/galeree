import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./Components/Discov/Discover.tsx";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
  useUser
} from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const clerkPublicApi =
  "pk_test_bG92aW5nLW1hbW1hbC03LmNsZXJrLmFjY291bnRzLmRldiQ";
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <ClerkProvider publishableKey={clerkPublicApi}>
        <SignedIn>
          <QueryClientProvider client={queryClient} contextSharing={true}>
            <Dashboard />
            <Hello />
          </QueryClientProvider>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </ClerkProvider>
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
