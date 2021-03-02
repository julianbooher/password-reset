import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css';
import * as FaIcons from 'react-icons/fa';
import moment from 'moment';
import Icon02 from "../../../../logos/Icons-02.png";
import {formatPhone} from '../../../Hooks/Hooks.jsx';



function Sidebar(props) {

    const [sidebar, setSidebar] = useState(false);
    const { budget, focus, contact_name, date_received, phone, username } = props.detailsData;
    const showSidebar = () => setSidebar(!sidebar);
    const openNav = () => {
        setSidebar(!sidebar);   
    }
    const closeNav = () => {
        setSidebar(!sidebar);  
    }

    // currency formatter
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

    return (
        <>
        
            <div className="navbar">
                <FaIcons.FaBars onClick={openNav} className="menu-bars" /> 
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <div className='nav-menu-items'>
                    <div className='rf-logo-side' onClick={showSidebar}>
                        <img src={Icon02} alt="RF Logo"></img>
                    </div>
                    <p className="close-btn nav-text" onClick={closeNav}>&times;</p>
                    <h4 className="nav-text" onClick={showSidebar}><u>Contact Information</u></h4>
                    <div className="nav-text">
                        <p>
                            <b>Contact Name:</b>
                            &nbsp;
                            {contact_name}
                        </p>
                    </div>
                    <div className="nav-text">
                        <p>
                            <b>Phone:</b>
                            &nbsp;
                            {phone && formatPhone(phone)}
                        </p>
                    </div>
                    <div className="nav-text">
                        <p>
                            <b>Email:</b>
                            &nbsp;
                            {username}
                        </p>
                    </div>
                    <div className="nav-text">
                        <p>
                            <b>Date Received:</b>
                            &nbsp;
                            {moment(date_received).format('LL')}
                        </p>
                    </div>
                    <div className="nav-text">
                        <p>
                            <b>Focus Area:</b>
                            &nbsp;
                            {focus}
                        </p>
                    </div>
                    <div className="nav-text">
                        <p>
                            <b>Budget:</b>
                            &nbsp;
                            {formatter.format(budget)}
                        </p>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Sidebar;