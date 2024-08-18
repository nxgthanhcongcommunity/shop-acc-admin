import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import {
  AccountPage,
  CategoryPage,
  InvoiceDetailsPage,
  InvoicePage,
  LoginPage,
  ProductPage,
  SendMailPage,
  TransactionPage,
} from "./pages";
import { Layout } from "./containers";
import PrivateElement from "./containers/privateElement";

const router = createBrowserRouter(
  [
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          path: "categories",
          element: (
            <PrivateElement>
              <CategoryPage />
            </PrivateElement>
          ),
        },
        {
          path: "products",
          element: (
            <PrivateElement>
              <ProductPage />
            </PrivateElement>
          ),
        },
        {
          path: "accounts",
          element: (
            <PrivateElement>
              <AccountPage />
            </PrivateElement>
          ),
        },
        {
          path: "invoices",
          element: (
            <PrivateElement>
              <InvoicePage />
            </PrivateElement>
          ),
        },
        {
          path: "invoice-details",
          element: (
            <PrivateElement>
              <InvoiceDetailsPage />
            </PrivateElement>
          ),
        },
        {
          path: "sendmails",
          element: (
            <PrivateElement>
              <SendMailPage />
            </PrivateElement>
          ),
        },
        {
          path: "transactions",
          element: (
            <PrivateElement>
              <TransactionPage />
            </PrivateElement>
          ),
        },
      ],
    },
  ]
  // {
  //   basename: "",
  // }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
