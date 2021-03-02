import React from 'react';
import {useSelector} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';

export default function TitleCard() {
    const detailsData = useSelector(state => state.detailsData);

    return (
        <Card style={{backgroundColor:'#1C479A', color: 'white', textAlign:'center'}}>
            <Card.Header style={{fontSize:'4rem'}}>{detailsData && detailsData.org_name}</Card.Header>
        </Card>
    )
}