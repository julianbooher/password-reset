import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import NotesTableList from './NotesTableList.jsx';


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
                {notes.length > 0 && notes.map(note => (<NotesTableList note={note}/>))}
            </tbody>
        </Table>
    )
}