import React from "react";
import { Route, Redirect } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { useData } from "../../context/datacontext";
import Navbar from "../navbar/navbar";

type PrivateRouteType = {
  path: string;
  Element: React.ComponentType<any>;
};

const PrivateRoute = ({ path, Element, ...props }: PrivateRouteType) => {
  const { profile, loading } = useData();
  if (!loading) {
    return profile ? (
      <Route {...props} path={path} component={Element} />
    ) : (
      <Redirect to={ROUTES.ROUTE_ACCOUNT} />
    );
  } else {
    return (
      <div className="min-h-screen bg-gray-800">
        <Navbar />
        <div className="mx-auto mt-4 animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }
};

export default PrivateRoute;
