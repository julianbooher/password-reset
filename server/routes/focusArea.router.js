const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Get all of focus areas for editing in question management
router.get('/', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "focus_area";`;
  pool.query(sqlText).then(result => {
    res.send(result.rows);
  }).catch((error) => {
    console.log('Error retrieving list of focus areas from the DB... ----->', error);
  });
});

// Get all active focus areas for the applications
router.get('/active', rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "focus_area" WHERE "active"=true;`;
  pool.query(sqlText).then(result => {
    res.send(result.rows);
  }).catch((error) => {
    console.log('Error retrieving list of focus areas from the DB... ----->', error);
  });
});

// Toggles a question between active and inactive.
router.put('/status/:id', rejectUnauthenticated, (req, res, next) => {
   if (req.user.admin){
    const sqlText = `
                    UPDATE "focus_area"
                    SET active = $1
                    WHERE id=$2
                    ;`;
    pool
      .query(sqlText, [req.body.newStatus, req.params.id])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('focus/focus-status PUT failed ', err);
        res.sendStatus(500);
      });
   } 
});

// Update the text of a particular focus area.
router.put('/text/:id', rejectUnauthenticated, (req, res, next) => {
  if (req.user.admin){
 
    const sqlText = `
                    UPDATE "focus_area"
                    SET "focus" = $1
                    WHERE id=$2
                    ;`
    pool
      .query(sqlText, [req.body.newText, req.params.id])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('focus/text PUT failed ', err);
        res.sendStatus(500);
      });
  } 
});

// Post new focus area
router.post('/', rejectUnauthenticated, (req, res, next) => {
  if (req.user.admin){
    const sqlText = `INSERT INTO "focus_area" ("focus") VALUES ($1);`;
    pool
      .query(sqlText, [req.body.newFocusArea])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('question/ POST failed ', err);
        res.sendStatus(500);
      });
  } 
});

module.exports = router;
