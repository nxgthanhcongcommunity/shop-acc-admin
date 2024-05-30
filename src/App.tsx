import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import {
  AccountPage,
  BannerPage,
  CategoryPage,
  HomePage,
  ProductPage,
  SignupPage,
} from "./pages";
import { Layout } from "./containers";

const router = createBrowserRouter(
  [
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
        {
          path: "categories",
          element: <CategoryPage />,
        },
        {
          path: "products",
          element: <ProductPage />,
        },
        {
          path: "accounts",
          element: <AccountPage />,
        },
      ],
    },
  ],
  {
    basename: "/admin",
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
