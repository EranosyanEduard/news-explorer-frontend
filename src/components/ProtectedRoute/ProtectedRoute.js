import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, path, ...componentProps }) => (
  <Route exact path={path}>
    {componentProps.loggedIn ? <Component {...componentProps} /> : <Redirect to="/" />}
  </Route>
);

export default ProtectedRoute;
