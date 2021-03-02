import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal, InputGroup, FormControl} from 'react-bootstrap';
import { MdEdit } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import moment from 'moment';



export default function NotesTableList(props) {
    const dispatch = useDispatch();
    const detailsData = useSelector(state => state.detailsData);
    const {note} = props;
    const [show, setShow] = useState(false);
    const [thisNote, setThisNote] = useState(note.review_note);
    const handleDelete = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this note!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              dispatch({type:'DELETE_NOTE', payload:{note_id: note.id, app_id: detailsData.id}})
              swal("Poof! Your note has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your note remains!");
            }
          });
    };
    const handleEdit = () => {
        setShow(true);
    };

    const handleSave = () => {
        dispatch({type:'UPDATE_NOTE', payload:{note_id: note.id, note:thisNote, app_id:detailsData.id}});
        setShow(false);
    }
         

    return(
    <>
     <tr key={note.id}>
         <td>{note.review_note}</td>
         <td>{moment(note.date_added).format('LL')}</td>
         <td><Button onClick={(event)=>{handleEdit()}}>View/Edit <MdEdit/></Button></td>
         <td><Button onClick={(event)=>{handleDelete()}}>Delete <RiDeleteBin2Line/></Button></td>
     </tr>
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
    </>
    )
}