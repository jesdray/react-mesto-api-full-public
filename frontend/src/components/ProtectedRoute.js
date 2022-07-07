import React from "react";
import { Route, Redirect } from "react-router-dom";
import { loggedInContext } from '../contexts/loggedInContext'

function ProtectedRoute({ component: Component, ...props }) {
  const loggedIn = React.useContext(loggedInContext)

  return (
    <Route>
      {() =>
        loggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />
      }
    </Route>
  );
};

export default ProtectedRoute;