const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticatedAdmin } = require('../modules/admin-authentication-middleware');

router.get(`/ce/:col/:desc`, rejectUnauthenticatedAdmin, (req, res) => {
  const {col, desc} = req.params
  //Setting column name value on server side for security purposes
  let col_name = '';
  let sqlDirection = ``;
  switch (col) {
    case '1': 
      col_name = 'u.org_name';
      break;
    case '2': 
      col_name = 'u.contact_name';
      break;
    case '3': 
      col_name = 'a.budget';
      break;
    case '4':
      col_name = 'f.focus';
      break;
    case '5':
      col_name = 'a.date_received';
      break;
    case '6':
      col_name = 'r.status';
      break;
    default:
      col_name = 'a.id';
  } 
  //pieces of sql code that need to be combined for dynamic querying
  const sqlPrefix = `SELECT  a.id, a.date_received, a.budget,
                      u.org_name, u.contact_name, u.phone, u.username, 
                        f.focus, r.status   
                      FROM "user" as u
                      JOIN ce_app AS a ON u.id=a.user_id
                      JOIN focus_area AS f ON a.focus_area_id=f.id
                      JOIN review_status AS r ON r.id=a.review_status_id`;
  const sqlOrderBy = ` ORDER BY ${col_name}`
  if(desc==='true'){
    sqlDirection = ` DESC;`;
  } else {
    sqlDirection = `;`; 
  }
  const sqlText = sqlPrefix+sqlOrderBy+sqlDirection;
  pool.query(sqlText)
    .then(result => {res.send(result.rows)})
    .catch(error=> console.log('Error sorting app table data from server', error))
  });



router.get(`/:col/:desc`, rejectUnauthenticatedAdmin, (req, res) => {
  const {col, desc} = req.params
  //Setting column name value on server side for security purposes
  let col_name = '';
  let sqlDirection = ``;
  switch (col) {
    case '1': 
      col_name = 'u.org_name';
      break;
    case '2': 
      col_name = 'u.contact_name';
      break;
    case '3': 
      col_name = 'a.budget';
      break;
    case '4':
      col_name = 'f.focus';
      break;
    case '5':
      col_name = 'a.date_received';
      break;
    case '6':
      col_name = 'r.status';
      break;
    default:
      col_name = 'a.id';
  } 
  //pieces of sql code that need to be combined for dynamic querying
  const sqlPrefix = `SELECT  a.id, a.date_received, a.budget,
                      u.org_name, u.contact_name, u.phone, u.username, 
                        f.focus, r.status   
                      FROM "user" as u
                      JOIN app AS a ON u.id=a.user_id
                      JOIN focus_area AS f ON a.focus_area_id=f.id
                      JOIN review_status AS r ON r.id=a.review_status_id`;
  const sqlOrderBy = ` ORDER BY ${col_name}`
  if(desc==='true'){
    sqlDirection = ` DESC;`;
  } else {
    sqlDirection = `;`; 
  }
  const sqlText = sqlPrefix+sqlOrderBy+sqlDirection;
  pool.query(sqlText)
    .then(result => {res.send(result.rows)})
    .catch(error=> console.log('Error sorting app table data from server', error))
  });

  module.exports = router;