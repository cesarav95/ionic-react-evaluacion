import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import ApplicationContext from '../context/ApplicationContext';
import { RouteHocProps } from '../models/routeHocProps.model';

const PublicRouteHoc: React.FC<RouteHocProps> = ({
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
          <Redirect to="/home" />
        ) : (
          <Component />
        )
      }
    />
  );
};

export default PublicRouteHoc;
