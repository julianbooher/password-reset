import React from 'react';
import {Container} from 'react-bootstrap';

export default function GreetingList({g}) {
    // sub-component displaying greeting info
    return (
        <div key={g.id} >
            <Container style={{textAlign:'center'}}>
                    <h2>{g.header}</h2>
            </Container>
            <Container>
                {g.message}
            </Container>
        </div>
    )
}