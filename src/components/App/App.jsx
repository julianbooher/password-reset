import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AdminRoute from '../AdminRoute/AdminRoute';
import UserPage from '../UserPage/UserPage.jsx';
import LandingPage from '../LandingPage/LandingPage.jsx';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Admin from '../Admin/Admin.jsx';
import GrantWindowSettings from '../GrantWindowSettings/GrantWindowSettings.jsx';
import AppDetails from '../AppDetails/AppDetails.jsx';
import QuestionManagement from '../QuestionManagement/QuestionManagement.jsx';
import PrintableReport from '../PrintableReport/PrintableReport.jsx';
import GreetingManagement from '../GreetingManagement/GreetingManagement.jsx';
import RegisterPageCE from '../CommunityEngagement/RegisterPageCE/RegisterPageCE'
import AppDetailsCE from '../CommunityEngagement/AppDetailsCE/AppDetailsCE.jsx';
import PrintableReportCE from '../CommunityEngagement/PrintableReportCE/PrintableReportCE.jsx';
import PreviousApplications from '../PreviousApplications/PreviousApplications.jsx'
import ForgotPasswordPage from '../ResetPassword/ForgotPasswordPage/ForgotPasswordPage.jsx';
import ResetPasswordPage from '../ResetPassword/ResetPasswordPage/ResetPasswordPage'


import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
    this.props.dispatch({ type: 'FETCH_CURRENT_WINDOW'})
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
              adminRedirect="/admin"
              component={UserPage}
            />

            {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - if admin, redirect to "/admin"
              // - else shows LoginPage at /login
              exact
              path="/login"
              component={LoginPage}
              authRedirect="/user"
              adminRedirect="/admin"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - if admin, redirect to "/admin"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              component={RegisterPage}
              authRedirect="/user"
              adminRedirect="/admin"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - if admin, redirect to "/admin"
              // - else shows RegisterPage at "/registration"
              exact
              path="/ceregistration"
              component={RegisterPageCE}
              authRedirect="/user"
              adminRedirect="/admin"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - if admin, redirect to "/admin"
              // - else shows LoginPage at /login
              exact
              path="/forgotpassword"
              component={ForgotPasswordPage}
              authRedirect="/user"
              adminRedirect="/admin"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - if admin, redirect to "/admin"
              // - else shows LoginPage at /login
              exact
              path="/resetpassword/:userid/:token"
              component={ResetPasswordPage}
              authRedirect="/user"
              adminRedirect="/admin"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - if admin, redirect to "/admin"
              // - else shows LandingPage at "/home"
              exact
              path="/home"
              component={LandingPage}
              authRedirect="/user"
              adminRedirect="/admin"
            />
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/applications"
              adminRedirect="/admin"
              component={PreviousApplications}
            />
            <AdminRoute
              // AdminRoute ensures the user is an admin
              // if not logged in, redirects to login
              // if logged in but not admin, redirects to user homepage
              exact
              path="/admin"
              component={Admin}
            />
            <AdminRoute
              // AdminRoute ensures the user is an admin
              // if not logged in, redirects to login
              // if logged in but not admin, redirects to user homepage
              exact
              path="/grantwindow"
              component={GrantWindowSettings}
            />
            <AdminRoute
              // AdminRoute ensures the user is an admin
              // if not logged in, redirects to login
              // if logged in but not admin, redirects to user homepage
              exact
              path="/appdetails/:id"
              component={AppDetails}
            />
            <AdminRoute
              // AdminRoute ensures the user is an admin
              // if not logged in, redirects to login
              // if logged in but not admin, redirects to user homepage
              exact
              path="/report/:id"
              component={PrintableReport}
            />
            <AdminRoute
              // AdminRoute ensures the user is an admin
              // if not logged in, redirects to login
              // if logged in but not admin, redirects to user homepage
              exact
              path="/questionmanagement"
              component={QuestionManagement}
            />
            <AdminRoute
              // AdminRoute ensures the user is an admin
              // if not logged in, redirects to login
              // if logged in but not admin, redirects to user homepage
              exact
              path="/greetingmanagement"
              component={GreetingManagement}
            />
            <AdminRoute
              // AdminRoute ensures the user is an admin
              // if not logged in, redirects to login
              // if logged in but not admin, redirects to user homepage
              exact
              path="/ce/appdetails/:id"
              component={AppDetailsCE}
            />
            <AdminRoute
              // AdminRoute ensures the user is an admin
              // if not logged in, redirects to login
              // if logged in but not admin, redirects to user homepage
              exact
              path="/ce/report/:id"
              component={PrintableReportCE}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect()(App);
