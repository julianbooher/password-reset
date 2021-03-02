import React from 'react';
import {Button, Modal, InputGroup, FormControl} from 'react-bootstrap';


export default function NotesModal({thisNote=''} ){
    return (
        <Modal
            show={show}
            onHide={(event)=>{setShow(false)}}
                backdrop="static"
                keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Notes App</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Make a note</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl as="textarea" rows="10" aria-label="With textarea" value={thisNote} onChange={event => {setThisNote(event.target.value)}}/>
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={event=>setShow(false)}>
                    Cancel
                </Button>
                <Button onClick={event=>handleSave()} variant="primary">Save</Button>
            </Modal.Footer>
        </Modal>
    )
}