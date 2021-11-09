import React from "react";
import { Redirect, Route } from "react-router-dom";
import BottomNav from "./BottomNav";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const accessToken = window.localStorage.getItem("accessToken");
  console.log("this", accessToken);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        accessToken ? (
          <>
            <Component {...props} /> <BottomNav />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default ProtectedRoute;
