import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import Icon04 from "../../logos/Icons-04.png";


export default function Nav() {
  const user = useSelector(state => state.user);
  const location = useLocation();
  const currentPath = location.pathname;

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null && user.admin === false) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  } else if (user.admin === true){
    loginLinkData.path = '/admin';
    loginLinkData.text = 'Admin Dashboard';
  }
  // the nav bar is set up to be rendered out of the printable report page
  return (
    <>
    {currentPath.startsWith('/report') || currentPath.startsWith('/ce/report')  ? '' : 
    <div className="nav">
      <Link to="/home">
        <img className="rf-logo" src={Icon04} alt="RF Logo"></img>
      </Link>
      
      <div className="nav-right">
        <Link className="nav-link" to={loginLinkData.path}>
          {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
          {loginLinkData.text}
        </Link>
        {!user.id &&
          <Link className="nav-link" to="/home">
            About
          </Link>
        }
        {/* Show the link to the info page and the logout button if the user is logged in */}
        {user.id && (
          <>

            {user.admin ?
              <>
              
                <Link className="nav-link" to="/grantwindow">
                  Grant Window Settings
                </Link>
                <Link className="nav-link" to="/questionmanagement">
                  Question Management
                </Link>
                <Link className="nav-link" to="/greetingmanagement">
                  Edit Welcome Page
                </Link>
              </>
              :
              <Link className="nav-link" to="/applications">
                Previous Applications
              </Link>
            }
            <LogOutButton className="nav-link" />
          </>
        )}
      </div>
    </div>
    }
    </>
  );
};

