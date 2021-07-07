import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import ApplicationContext from '../context/ApplicationContext';
import { RouteHocProps } from '../models/routeHocProps.model';

const PrivateRouteHoc: React.FC<RouteHocProps> = ({
  component: Component,
  path,
}) => {
  const applicationContext = useContext(ApplicationContext);

  return (
    <Route
      exact
      path={path}
      render={() =>
        applicationContext.isAuthenticated ? (
          <Component />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRouteHoc;
