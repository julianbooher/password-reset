import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginPage from '../LoginPage/LoginPage';
import UserPage from '../UserPage/UserPage';
import mapStoreToProps from '../../redux/mapStoreToProps';



const AdminRoute = (props) => {
  // Using destructuring, this takes ComponentToProtect from component
  // prop and grabs all other props to pass them along to Route
  const {
    // Alias prop 'component' as 'ComponentToProtect'
    component: ComponentToProtect,
    // redirect path to be used if the user is authorized
    authRedirect,
    adminRedirect,
    store,
    ...otherProps
  } = props;

  let ComponentToShow;

  if (store.user.admin) {
    // if user is logged in and is an admin, show them the component
    ComponentToShow = ComponentToProtect;
  } else if (!store.user.admin && store.user.id){
    // if user is logged in and is not an admin, show them the default user page
    // TODO change this to more sensible landing page for non-admin users.
    ComponentToShow = UserPage;
  } else {
    // if they are not logged in, check the loginMode on Redux State
    // if the mode is 'login', show the LoginPage
    ComponentToShow = LoginPage;
  }

  // We return a Route component that gets added to our list of routes
  return (
    <Route
      // all props like 'exact' and 'path' that were passed in
      // are now passed along to the 'Route' Component
      {...otherProps}
      component={ComponentToShow}
    />
  );
};

export default connect(mapStoreToProps)(AdminRoute);
