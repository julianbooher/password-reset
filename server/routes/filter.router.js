const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticatedAdmin } = require('../modules/admin-authentication-middleware');


// --------------------- STANDARD TABLE FILTER ROUTES --------------------------
router.get('/focus/:id', rejectUnauthenticatedAdmin, (req, res) => {
    const sqlText = `SELECT  a.id, a.date_received, a.budget,
                      u.org_name, u.contact_name, u.phone, u.username, 
                        f.focus, r.status   
                      FROM "user" as u
                      JOIN app AS a ON u.id=a.user_id
                      JOIN focus_area AS f ON a.focus_area_id=f.id
                      JOIN review_status AS r ON r.id=a.review_status_id
                      WHERE f.id = $1
                      ;`;
    pool.query(sqlText, [req.params.id])
    .then(result => {res.send(result.rows)})
    .catch(error=> console.log('Error retrieving app table data from server', error))
  });
  
  router.get('/status/:id', rejectUnauthenticatedAdmin, (req, res) => {
    const sqlText = `SELECT  a.id, a.date_received, a.budget,
                      u.org_name, u.contact_name, u.phone, u.username, 
                        f.focus, r.status   
                      FROM "user" as u
                      JOIN app AS a ON u.id=a.user_id
                      JOIN focus_area AS f ON a.focus_area_id=f.id
                      JOIN review_status AS r ON r.id=a.review_status_id
                      WHERE r.status=$1;`;
    pool.query(sqlText, [req.params.id])
    .then(result => {res.send(result.rows)})
    .catch(error=> console.log('Error retrieving app table data from server', error))
  });

  router.get('/search/:id', rejectUnauthenticatedAdmin, (req, res) => {
      const insertText = `%${req.params.id}%`;
      const sqlText = `SELECT  a.id, a.date_received, a.budget,
                        u.org_name, u.contact_name, u.phone, u.username, f.focus, r.status   
                        FROM "user" as u
                        JOIN app AS a ON u.id=a.user_id
                        JOIN focus_area AS f ON a.focus_area_id=f.id
                        JOIN review_status AS r ON r.id=a.review_status_id 
                        WHERE u.org_name LIKE $1 OR u.contact_name LIKE $1 OR u.phone LIKE $1 OR u.username LIKE $1;`;
        pool.query(sqlText, [insertText])
        .then(result => {res.send(result.rows)})
        .catch(error=> console.log('Error retrieving app table data from server', error))
  });

  router.get('/budget/:low/:high', rejectUnauthenticatedAdmin, (req, res) => {
      const sqlText = `SELECT a.id, a.date_received, a.budget,
                        u.org_name, u.contact_name, u.phone, u.username, f.focus, r.status   
                        FROM "user" as u
                        JOIN app AS a ON u.id=a.user_id
                        JOIN focus_area AS f ON a.focus_area_id=f.id
                        JOIN review_status AS r ON r.id=a.review_status_id
                        WHERE a.budget >= $1 AND a.budget <= $2;`;
        pool.query(sqlText, [req.params.low, req.params.high])
        .then(result => {res.send(result.rows)})
        .catch(error=> console.log('Error retrieving app table data from server', error))
  });

  router.get('/dates/:start/:end', rejectUnauthenticatedAdmin, (req, res) => {
    const {start, end} = req.params;
    const sqlText = `SELECT a.id, a.date_received, a.budget,
                      u.org_name, u.contact_name, u.phone, u.username, f.focus, r.status   
                      FROM "user" as u
                      JOIN app AS a ON u.id=a.user_id
                      JOIN focus_area AS f ON a.focus_area_id=f.id
                      JOIN review_status AS r ON r.id=a.review_status_id
                      WHERE a.date_received >= $1 AND a.date_received <= $2;`;
      pool.query(sqlText, [start, end])
      .then(result => {res.send(result.rows)})
      .catch(error=> console.log('Error retrieving app table data from server', error))
});

// ------------------- CE TABLE FILTER ROUTES ----------------------------

router.get('/ce/status/:id', rejectUnauthenticatedAdmin, (req, res) => {
  const sqlText = `SELECT  a.id, a.date_received, a.budget,
                    u.org_name, u.contact_name, u.phone, u.username, 
                      f.focus, r.status   
                    FROM "user" as u
                    JOIN ce_app AS a ON u.id=a.user_id
                    JOIN focus_area AS f ON a.focus_area_id=f.id
                    JOIN review_status AS r ON r.id=a.review_status_id
                    WHERE r.status=$1;`;
  pool.query(sqlText, [req.params.id])
  .then(result => {res.send(result.rows)})
  .catch(error=> console.log('Error retrieving app table data from server', error))
});

router.get('/ce/search/:id', rejectUnauthenticatedAdmin, (req, res) => {
    const insertText = `%${req.params.id}%`;
    const sqlText = `SELECT  a.id, a.date_received, a.budget,
                      u.org_name, u.contact_name, u.phone, u.username, f.focus, r.status   
                      FROM "user" as u
                      JOIN ce_app AS a ON u.id=a.user_id
                      JOIN focus_area AS f ON a.focus_area_id=f.id
                      JOIN review_status AS r ON r.id=a.review_status_id 
                      WHERE u.org_name LIKE $1 OR u.contact_name LIKE $1 OR u.phone LIKE $1 OR u.username LIKE $1;`;
      pool.query(sqlText, [insertText])
      .then(result => {res.send(result.rows)})
      .catch(error=> console.log('Error retrieving app table data from server', error))
});

router.get('/ce/budget/:low/:high', rejectUnauthenticatedAdmin, (req, res) => {
    const sqlText = `SELECT a.id, a.date_received, a.budget,
                      u.org_name, u.contact_name, u.phone, u.username, f.focus, r.status   
                      FROM "user" as u
                      JOIN ce_app AS a ON u.id=a.user_id
                      JOIN focus_area AS f ON a.focus_area_id=f.id
                      JOIN review_status AS r ON r.id=a.review_status_id
                      WHERE a.budget >= $1 AND a.budget <= $2;`;
      pool.query(sqlText, [req.params.low, req.params.high])
      .then(result => {res.send(result.rows)})
      .catch(error=> console.log('Error retrieving app table data from server', error))
});

router.get('/ce/dates/:start/:end', rejectUnauthenticatedAdmin, (req, res) => {
  const {start, end} = req.params;
  const sqlText = `SELECT a.id, a.date_received, a.budget,
                    u.org_name, u.contact_name, u.phone, u.username, f.focus, r.status   
                    FROM "user" as u
                    JOIN ce_app AS a ON u.id=a.user_id
                    JOIN focus_area AS f ON a.focus_area_id=f.id
                    JOIN review_status AS r ON r.id=a.review_status_id
                    WHERE a.date_received >= $1 AND a.date_received <= $2;`;
    pool.query(sqlText, [start, end])
    .then(result => {res.send(result.rows)})
    .catch(error=> console.log('Error retrieving app table data from server', error))
});

  module.exports = router;