const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticatedAdmin } = require('../modules/admin-authentication-middleware');

//populate dropdown menu on admin for application status -- admin only
router.get('/', rejectUnauthenticatedAdmin, (req, res) => {
  // if(req.user.admin){
      const sqlText = `SELECT * FROM review_status;`;
      pool.query(sqlText)
      .then((result) => {
      res.send(result.rows);
    })
      .catch((error) => {
      console.log('error retrieving review_statuses from the database... ----->', error);
    })
  // }
});

//get review status of individual application -user view
router.get('/:id', rejectUnauthenticatedAdmin, (req, res) => {
  const sqlText=`SELECT rs.status FROM review_status AS rs
                JOIN app ON app.review_status_id=rs.id
                WHERE app.id=$1;`
  pool.query(sqlText, [req.params.id])
  .then((result) => {
    res.send(result.rows);
  })
  .catch((error) => {
    console.log('error retrieving current from the database... ----->', error);
  })
})

//updating status of application - admin only view
router.put('/', rejectUnauthenticatedAdmin, (req, res) => {
    const sqlText = `UPDATE app SET review_status_id=$1 WHERE id=$2;`;
    pool.query(sqlText, [req.body.status, req.body.id])
    .then(result => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('error updating review_status_id on the database from the server... -------->', error);
    })
});

//updating status of CE application - admin only view
router.put('/ce', rejectUnauthenticatedAdmin, (req, res) => {
  const sqlText = `UPDATE ce_app SET review_status_id=$1 WHERE id=$2;`;
  pool.query(sqlText, [req.body.status, req.body.id])
  .then(result => {
    res.sendStatus(200);
  })
  .catch(error => {
    console.log('error updating review_status_id on the database from the server... -------->', error);
  })
});

module.exports = router;
