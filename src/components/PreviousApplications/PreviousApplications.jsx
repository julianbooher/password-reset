import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PreviousApplicationsTable from './PreviousApplicationsTable/PreviousApplicationsTable.jsx';


export default function PreviousApplications() {

    const dispatch = useDispatch();

    // Fetch the previous grant windows to populate the table.
    useEffect(() => {
        dispatch({type: 'FETCH_PREVIOUS_APPLICATIONS'})
    }, [dispatch])

    return (
        <>
            <PreviousApplicationsTable/>
        </>
  );
}

// TODO - Potentially refactor this file tree, this file is extraneous since it didn't end up getting any additional features.