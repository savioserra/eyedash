import React from "react";
import { useObserver } from "mobx-react";
import { Redirect } from "react-router-dom";
import { useStores } from "../../hooks";

function protectRoute<T>(Component: React.FC<T>): React.FC<T> {
  const ProtectedComponent: React.FC<T> = props => {
    const { auth } = useStores();

    return useObserver(() =>
      auth.authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    );
  };

  return ProtectedComponent;
}

export default protectRoute;
