import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import NotesTableCE from './NotesTableCE.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Button, Modal, InputGroup, FormControl} from 'react-bootstrap';
import NotesTitleCE from './NotesTitleCE.jsx';
import { IoCreateSharp } from "react-icons/io5";

export default function Notes(props) {
    const dispatch=useDispatch();
    const {notes, detailsData} = props;
    const [show, setShow] = useState(false);
    const [newNote, setNewNote] = useState('');
    const handleSave = async () => {
        setShow(false);
        await dispatch({type:'POST_CE_NOTE', payload: {note:newNote, app_id:detailsData.id}});
        setNewNote('');
    }

    return (
        <Container style={{backgroundColor: 'white'}}>
            <NotesTitleCE/>
            {<NotesTableCE notes={notes} />}
                <Button onClick={(event)=>{setShow(true)}}>Create New Note <IoCreateSharp/></Button>
                <Modal
                    show={show}
                    onHide={(event)=>{setShow(false)}}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>NotesApp</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>Make a note</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl as="textarea" rows="10" aria-label="With textarea" onChange={event => {setNewNote(event.target.value)}}/>
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={event=>setShow(false)}>
                            Cancel
                        </Button>
                        <Button onClick={event=>handleSave()} variant="primary">Save</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
    )
}