import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Auth from './Auth';

export const ProtectedRoute = ({loggedIn, component:Component, ...rest}) => {
    console.log(loggedIn);
    return (
      <Route 
      {...rest}
      render = {(props) => Auth.isAuthenticated() ? (<Component {...props}/>) : (<Redirect to="/"/>)}
      />
    )
  }