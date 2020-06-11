import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Auth from './Auth';

export const ProtectedRoute = ({component:Component, ...rest}) => {
    return (
      <Route 
      {...rest}
      render = {(props) => Auth.isAuthenticated() ? (<Component {...props}/>) : (<Redirect to="/"/>)}
      />
    )
  }