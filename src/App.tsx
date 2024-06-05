import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import {
  AccountPage,
  BalancePage,
  CategoryPage,
  InvoiceDetailsPage,
  InvoicePage,
  ProductPage,
  QuantityPage,
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
          path: "balances",
          element: <BalancePage />,
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
          path: "quantities",
          element: <QuantityPage />,
        },
        {
          path: "sendmails",
          element: <SendMailPage />,
        },
        {
          path: "transactions",
          element: <TransactionPage />,
        },
        //TransactionPage
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
