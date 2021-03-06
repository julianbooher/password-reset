import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Container, Form, Row, Col, Button} from 'react-bootstrap';
import {AiOutlineClear, AiOutlineSearch} from 'react-icons/ai';


export default function Search() {
    const dispatch=useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({type:'SEARCH_CE_TABLE', payload: searchValue});
    }

    return(
        <Container> 
                <Form onSubmit={(event)=>{handleSubmit(event)}}>
                        <Form.Group as={Row}>
                            <Col xs={6}>
                                <Form.Control
                                required
                                onChange={(event)=>{setSearchValue(event.target.value)}}
                                value={searchValue}
                                placeholder="Search"
                                />
                            </Col>
                        <Col>
                            <Button type="submit" title="Search"><AiOutlineSearch/></Button>
                            <Button variant="danger" title="Clear Search" 
                                onClick={()=>{
                                    dispatch({type:'FETCH_CE_APP_TABLE_DATA'});
                                    setSearchValue('');
                                }}>
                                    <AiOutlineClear/>
                            </Button>
                        </Col>    
                        </Form.Group>
                </Form>         
        </Container>
    )
}