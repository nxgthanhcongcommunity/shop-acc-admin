import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import {
  AccountPage,
  CategoryPage,
  InvoiceDetailsPage,
  InvoicePage,
  ProductPage,
  SendMailPage,
  TransactionPage,
} from "./pages";
import { Layout } from "./containers";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
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
        {
          path: "invoices",
          element: <InvoicePage />
        },
        {
          path: "invoice-details",
          element: <InvoiceDetailsPage />,
        },
        {
          path: "sendmails",
          element: <SendMailPage />,
        },
        {
          path: "transactions",
          element: <TransactionPage />,
        },
      ],
    },
  ],
  {
    basename: "/",
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
