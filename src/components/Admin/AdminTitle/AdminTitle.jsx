import React from 'react';
import {useSelector} from 'react-redux';
import {Card} from 'react-bootstrap';
import moment from 'moment';


export default function AdminTitle() {
    // hooks for user and AdminTable data
    const {start_date, end_date, funds_available} = useSelector(state=>state.currentWindow);
    const appTableData = useSelector(state=>state.appTableData);
    const user = useSelector(state=>state.user);

    // currency formatter
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

    let disbursement = 0;
    // calculates remaining funds left in the grant window
    const calculateAvailable = () => {
        appTableData.map((app)=>(app.status==='Accepted' ? disbursement += Number(app.budget) : disbursement))
        return disbursement;
    }

    return (
        <Card>
            <Card.Header style={{backgroundColor: '#1C479A', color: 'white'}}>Welcome, {user.contact_name}!</Card.Header>
            {start_date ? <Card.Text style={{}}>The current grant window is from {moment(start_date).format('LL')} until {moment(end_date).format('LL')} </Card.Text> :
                <Card.Text style={{}}>There is not currenty an open grant window</Card.Text>}
            {start_date && <Card.Text>Total Funds Initially Available: {formatter.format(funds_available)} </Card.Text>}
            {start_date && <Card.Text>Total Funds Currently Available : {formatter.format(funds_available - calculateAvailable()) }</Card.Text>}
        </Card>
    )
}