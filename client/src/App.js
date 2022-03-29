import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { QueryClient, QueryClientProvider } from "react-query";

import Rewards from "./components/pages/Rewards";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Rewards />
    </QueryClientProvider>
  );
}

export default App;
