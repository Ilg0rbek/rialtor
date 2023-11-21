import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const PrivateRoute = () => {
  const { data } = useAppSelector((state) => state.user);

  return data ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
