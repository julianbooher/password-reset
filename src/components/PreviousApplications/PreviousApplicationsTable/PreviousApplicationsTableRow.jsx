import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment'

export default function PreviousApplicationsTableRow(props) {

  const { app } = props;

    return (
      <>
        <tr>
          <td>{moment(app.date_received).format('LL')}</td>
          <td>{app.status}</td>
        </tr>
      </>
    );
}

