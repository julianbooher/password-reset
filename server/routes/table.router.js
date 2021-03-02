const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticatedAdmin } = require('../modules/admin-authentication-middleware');

//gets all application details -- admin only view
router.get('/', rejectUnauthenticatedAdmin, (req, res) => {
    const sqlText = `SELECT  a.id, a.date_received, a.budget,
                      u.org_name, u.contact_name, u.phone, u.username, 
                        f.focus, r.status   
                      FROM "user" as u
                      JOIN app AS a ON u.id=a.user_id
                      JOIN focus_area AS f ON a.focus_area_id=f.id
                      JOIN review_status AS r ON r.id=a.review_status_id
                      ORDER BY a.date_received DESC
                      ;`;
    pool.query(sqlText)
    .then(result => {res.send(result.rows)})
    .catch(error=> console.log('Error retrieving app table data from server', error))
});

//gets all application details for community engagement -- admin only view
router.get('/ce', rejectUnauthenticatedAdmin, (req, res) => {
    const sqlText = `SELECT  a.id, a.date_received, a.budget,
                      u.org_name, u.contact_name, u.phone, u.username, 
                        f.focus, r.status   
                      FROM "user" as u
                      JOIN ce_app AS a ON u.id=a.user_id
                      JOIN focus_area AS f ON a.focus_area_id=f.id
                      JOIN review_status AS r ON r.id=a.review_status_id
                      ORDER BY a.date_received DESC
                      ;`;
    pool.query(sqlText)
    .then(result => {res.send(result.rows)})
    .catch(error=> console.log('Error retrieving app table data from server', error))
});

//gets single application detail for a community engagement application --admin only 
router.get('/ce/:id', rejectUnauthenticatedAdmin, (req, res) => {
  const sqlText= `SELECT  a.id, a.date_received, a.budget, u.background, u.org_name, u.contact_name, 
            u.phone, u.username, f.focus, r.status  
            FROM "user" as u
            JOIN ce_app AS a ON u.id=a.user_id
            JOIN focus_area AS f ON a.focus_area_id=f.id
            JOIN review_status AS r ON r.id=a.review_status_id 
            WHERE a.id=$1;`;
  pool.query(sqlText, [req.params.id])
  .then(result => {res.send(result.rows[0])})
  .catch(error=> console.log('Error retrieving app details page data from server', error))
});

//gets single application detail --admin only
router.get('/:id', rejectUnauthenticatedAdmin, (req, res) => {
    const sqlText= `SELECT  a.id, a.date_received, a.budget, u.background, u.org_name, u.contact_name, 
              u.phone, u.username, f.focus, r.status  
              FROM "user" as u
              JOIN app AS a ON u.id=a.user_id
              JOIN focus_area AS f ON a.focus_area_id=f.id
              JOIN review_status AS r ON r.id=a.review_status_id 
              WHERE a.id=$1;`;
    pool.query(sqlText, [req.params.id])
    .then(result => {res.send(result.rows[0])})
    .catch(error=> console.log('Error retrieving app details page data from server', error))
});

//getting just budget from application
router.get(`/budget/:id`, rejectUnauthenticatedAdmin, (req, res) => {
    const sqlText = `SELECT budget FROM app WHERE id=$1`;
    pool.query(sqlText, [req.params.id])
    .then(result => {res.send(result.rows[0])})
    .catch(error=> console.log('Error retrieving app table data from server', error))
});

//getting just budget from community engagement application
router.get(`/budget/ce/:id`, rejectUnauthenticatedAdmin, (req, res) => {
  const sqlText = `SELECT budget FROM ce_app WHERE id=$1`;
  pool.query(sqlText, [req.params.id])
  .then(result => {res.send(result.rows[0])})
  .catch(error=> console.log('Error retrieving app table data from server', error))
});

module.exports = router;
