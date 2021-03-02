import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import swal from 'sweetalert';
import {Col, Dropdown} from 'react-bootstrap';

export default function UpdateStatus() {
    const dispatch = useDispatch();
    const reviewStatus = useSelector(state=>state.reviewStatus);
    const detailsData = useSelector(state => state.detailsData);
    // this function updates the application status
    const handleChange = (event, rs_id) => {
        swal({
            title: "Grant Application Status Change!",
            text: "You are about the review status for this grant application. OK?",
            icon: "info",
            buttons: true,
            dangerMode: false,
          })
          .then((willDelete) => {
            if (willDelete) {
              dispatch({ type:'UPDATE_STATUS', payload:{ status: rs_id, id: detailsData.id }});
              swal("Status updated!", {
                icon: "success",
              });
            } else {
              swal("Status was not updated");
            }
          });
    }

    return (
        <Col>
            <Dropdown style={{backgroundColor: "#1C479A !important;"}}>
              <Dropdown.Toggle id="dropdown-basic">
                  Set Review Status
              </Dropdown.Toggle>
              <Dropdown.Menu>
                  {reviewStatus && reviewStatus.map((rs) => 
                      (
                        <Dropdown.Item 
                          onSelect={(event) => {handleChange(event, rs.id)}}
                          key={rs.id} 
                          value={rs.id}
                          >
                            {rs.status}
                        </Dropdown.Item>
                      ))
                  }
              </Dropdown.Menu>    
            </Dropdown>
        </Col>
    )
}