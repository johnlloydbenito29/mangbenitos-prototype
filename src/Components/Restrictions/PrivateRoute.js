import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../Contex/AuthenticationContext';

function PrivateRoute({ component: Component, ...rest }) {
   const { currentUser } = useAuth();

   return (
      <Route
         {...rest} render={props => {
            return currentUser ? <Component {...props} /> : <Redirect to="/Login" />;
         }}
      ></Route>
   );
}

export default PrivateRoute;
