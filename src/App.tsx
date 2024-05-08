
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { BannerPage, HomePage, SignupPage } from "./pages";
import { Layout } from "./containers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "banners",
        element: <BannerPage />,
      },
    ],
  },
], {
  basename: "/shop-acc-admin"
});

function App() {
  return <RouterProvider router={router} />
}

export default App;
