import { Navigate, useLocation } from "react-router-dom";

const PrivateElement = (props: any) => {
  const { children } = props;

  const user = {
    isLogged: true,
  };
  const location = useLocation();

  if (user.isLogged === false) {
    const to = `login?redirect-from=${location.pathname}${location.search}`;
    return <Navigate to={to} />;
  }

  return children;
};

export default PrivateElement;
