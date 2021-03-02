import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GrantWindowForm from './GrantWindowForm/GrantWindowForm.jsx'
import GrantWindowTable from './GrantWindowTable/GrantWindowTable.jsx'
import GrantWindowEdit from './GrantWindowForm/GrantWindowEdit.jsx'
import GrantWindowInfo from './GrantWindowInfo.jsx'
import './GrantWindowSettings.css'


export default function GrantWindowSettings(props) {

  const dispatch = useDispatch();
  const [editMode, changeEditMode] = useState(false)

  // Reducer for the current grant window.
  const currentWindow = useSelector(state => state.currentWindow);

  // Fetch the previous grant windows to populate the table.
  useEffect(() => {
    dispatch({type: 'FETCH_PREVIOUS_GRANT_WINDOWS'})
  }, [dispatch])

  return (
    <div>
      
      {currentWindow ?
      <>
        {editMode ? 
          // If current window exists, and edit mode is true, GrantWindowEdit component will show.
          <GrantWindowEdit 
            changeEditMode={changeEditMode} 
            editMode={editMode}
            currentWindow = {currentWindow} 
          />
          :
          // If current window exists, and edit mode is false, information about the current grant window will be shown.
          <GrantWindowInfo 
            changeEditMode={changeEditMode} 
            editMode={editMode}
            currentWindow = {currentWindow} 
          />
        } 
      </>
      :
      // If no current window, the form to create one will appear.
      <GrantWindowForm />
      }
      <div>
        {/* Table to show previous grant window info */}
        <GrantWindowTable />
      </div>
    </div>
  );
}
