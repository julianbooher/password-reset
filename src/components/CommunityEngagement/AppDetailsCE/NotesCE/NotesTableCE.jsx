import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import NotesTableListCE from './NotesTableListCE.jsx';


export default function NotesTable(props) {
    const {notes} = props;
    console.log(notes);
    return (
        <Table>
            <thead>
                <tr>
                    <th>Note Preview</th>
                    <th>Last Modified</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {notes.length > 0 && notes.map(note => (<NotesTableListCE note={note}/>))}
            </tbody>
        </Table>
    )
}