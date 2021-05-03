import Editor from "./Components/Editor";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Login from "./Components/Login";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <Editor /> */}
        <Login />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
