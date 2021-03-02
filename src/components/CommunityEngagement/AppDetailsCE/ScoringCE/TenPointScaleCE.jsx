import React from 'react';
import styled from 'styled-components';

const NumberBox = styled.div `
    height: 25px;
    width: 25px;
    border: 1px solid black;
    text-align: center;
`

export default function TenPointScale({number, selected=false, onSelect = f => f}) {
    return (
        <>
            <NumberBox style={{backgroundColor: selected ? '#97CAEB' : 'white', cursor: 'pointer'}} onClick={onSelect}>{number > 0 ? number : 'X'} 
            </NumberBox>
        </>
    )
}