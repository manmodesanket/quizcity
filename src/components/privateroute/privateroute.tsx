import React from "react";
import { Route, Redirect } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const PrivateRoute = (Componenet: any) => {
  const currentUser = window.firebase.auth().currentUser;
  return (
    <Route
      render={(routeProps) =>
        currentUser ? (
          <Componenet {...routeProps} />
        ) : (
          <Redirect to={ROUTES.ROUTE_ACCOUNT} />
        )
      }
    />
  );
};

export default PrivateRoute;
