import React from 'react';
import './Footer.css';
import {ImPacman} from "react-icons/im";
import { useLocation } from 'react-router-dom';



export default function Footer () {
    
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        // this footer is set up to render out when navigating to the printable report
        <>
            {currentPath.startsWith('/report') || currentPath.startsWith('/ce/report')  ? '' : 
                <footer>
                    &copy; Created by Team Results from the Vatti Cohort <ImPacman/> at Prime Digital Academy
                </footer>
            }
        </>
    );
}
