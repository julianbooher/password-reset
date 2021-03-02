import React from 'react';
import {useSelector} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';

export default function TitleCard() {
    // getting app details from store
    const detailsData = useSelector(state => state.detailsData);
    // app details header displays org name
    return (
        <Card style={{backgroundColor:'#1C479A', color: 'white', textAlign:'center'}}>
            <Card.Header style={{fontSize:'4rem'}}>{detailsData && detailsData.org_name}</Card.Header>
        </Card>
    )
}