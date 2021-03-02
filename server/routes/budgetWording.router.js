const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticatedAdmin } = require('../modules/admin-authentication-middleware');

// Get wording for the budget question
router.get('/', (req, res) => {
    const sqlText = `SELECT * FROM budget_wording;`
    pool.query(sqlText)
    .then((result) => {
        res.send(result.rows[0]); // send back budget wording
    }).catch((error) => {
        console.log('error retrieving budget wording from the database... -------->', error);
    });
});
// update budget wording for budget question, admin route
router.put('/', rejectUnauthenticatedAdmin, (req, res, next) => {
    const { updatedWording } = req.body;
    const sqlText = `
                    UPDATE budget_wording
                    SET question_wording = $1
                    ;`
    pool.query(sqlText, [updatedWording])
    .then(() => res.sendStatus(201))
    .catch((err) => {
        console.log('budgetWording PUT failed ', err);
        res.sendStatus(500);
    });
});

  module.exports = router