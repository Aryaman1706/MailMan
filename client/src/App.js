import Editor from "./Components/Editor";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Editor />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
