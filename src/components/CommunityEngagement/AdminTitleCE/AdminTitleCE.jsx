import React from 'react';
import {useSelector} from 'react-redux';
import {Card} from 'react-bootstrap';

export default function AdminTitle({ ceAppTableData }) {
    
    const user = useSelector(state=>state.user);
    
    // currency formatter
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

    // filtering out accepted CE applications
    const acceptedApps = ceAppTableData.filter(app=>app.status==="Accepted");

    // adding the total
    const ceTotal = acceptedApps.reduce((total, app) => total += parseInt(app.budget, 10), 0);

    return (
        <Card>
            <Card.Header style={{backgroundColor: '#1C479A', color: 'white'}}>Welcome, {user.contact_name}!</Card.Header>
            <Card.Text style={{padding: '10px'}}>The Results Foundation has currently approved {formatter.format(ceTotal)} in total Community Engagement grants.</Card.Text>
        </Card>
    )
}