import React from "react";
import { Route, Redirect } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { useData } from "../../context/datacontext";

type PrivateRouteType = {
  path: string;
  Element: React.ComponentType<any>;
};

const PrivateRoute = ({ path, Element, ...props }: PrivateRouteType) => {
  const { profile } = useData();
  return profile ? (
    <Route {...props} path={path} component={Element} />
  ) : (
    <Redirect to={ROUTES.ROUTE_ACCOUNT} />
  );
};

export default PrivateRoute;
