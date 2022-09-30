import { observer } from "mobx-react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { getAccessToken } from "../../utils/accessToken";

const ProtectedRoute = (props: RouteProps) => {
  const accessToken = getAccessToken();
  if (accessToken === undefined) return <Redirect to="/login" />;
  return <Route {...props} />;
};

export default observer(ProtectedRoute);
