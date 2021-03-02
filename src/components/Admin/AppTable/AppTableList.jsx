import React from 'react';
import {useDispatch} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import moment from 'moment';
import { BiDetail } from "react-icons/bi";
import {formatPhone} from '../../Hooks/Hooks.jsx';



export default function AppTableList(props) {
    // hooks
    const {app} = props;
    const mailText = "mailto:" + app.username;
    const dispatch = useDispatch();
    const history = useHistory();
    
    // this function grabs app details on button click
    // and sends the Admin to AppDetails view with that information
    const goDetails = async() => {
        await dispatch({type:'FETCH_DETAILS_DATA', payload: app.id});
        history.push(`/appdetails/${app.id}`)
    }
    
    // currency formatter
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

    return(
        <>
        <tr key={app.id} style={{textAlign: 'right'}}>
            <td>{app.org_name}</td>
            <td>{app.contact_name}</td>
            <td>{formatPhone(app.phone)}</td>
            <td><a href={mailText}>{app.username}</a></td>
            <td>{formatter.format(app.budget)}</td>
            <td>{app.focus}</td>
            <td>{moment(app.date_received).format('LL')}</td>
            <td>{app.status}</td>
            <td><Button onClick={(event)=>{goDetails()}}>Details/Score <BiDetail/></Button></td>
        </tr>
        </>
    )
}