import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Homepage from "./components/Homepage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import FormDataPage from "./components/FormDataPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path:"/data",
    element:<FormDataPage/>
  }
]);

const client = new QueryClient();
function App() {
  return <QueryClientProvider client={client}>
    <RouterProvider router={router} />;
  </QueryClientProvider>
}

export default App;
