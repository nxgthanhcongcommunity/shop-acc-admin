import { Navigate, useLocation } from "react-router-dom";

const PrivateElement = (props: any) => {
  const { children } = props;
  const isHasToken = localStorage.getItem("JWT");

  const location = useLocation();

  if (!isHasToken) {
    const to = `/login?redirect-from=${location.pathname}${location.search}`;
    return <Navigate to={to} />;
  }

  return children;
};

export default PrivateElement;
