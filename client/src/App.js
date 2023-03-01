import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
function App() {
 
  return (
    <>
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Dashboard />
    </QueryClientProvider>
    </>
  );
}

export default App;
