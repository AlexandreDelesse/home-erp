import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { QueryClient, QueryClientProvider } from "react-query";

import RewardPage from "./components/pages/RewardPage";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RewardPage />
    </QueryClientProvider>
  );
}

export default App;
