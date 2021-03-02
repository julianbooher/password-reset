const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectUnauthenticatedAdmin } = require('../modules/admin-authentication-middleware');

//gets everything in question table
router.get('/', rejectUnauthenticatedAdmin, (req, res) => { // GET all questions
  const sqlText = `SELECT * FROM "question" ORDER BY id ASC;`;
  pool.query(sqlText).then(result => {
      res.send(result.rows); // sending back application questions
  }).catch((error) => {
      console.log('error retrieving application questions from the database... -------->', error);
  });
});

//gets everything in question table
router.get('/ce', rejectUnauthenticatedAdmin, (req, res) => { // GET all questions
  const sqlText = `SELECT * FROM "ce_question" ORDER BY id ASC;`;
  pool.query(sqlText).then(result => {
      res.send(result.rows); // sending back application questions
  }).catch((error) => {
      console.log('error retrieving application questions from the database... -------->', error);
  });
});

//only active questions, user only view
router.get('/active', rejectUnauthenticated, (req, res) => { // GET all active questions
  const sqlText = `SELECT * FROM "question" WHERE "active"=TRUE;`;
  pool.query(sqlText).then(result => {
      res.send(result.rows); // sending back application questions
  }).catch((error) => {
      console.log('error retrieving active application questions from the database... -------->', error);
  });
});

//only active questions, user only view
router.get('/ce/active', rejectUnauthenticated, (req, res) => { // GET all active questions
  const sqlText = `SELECT * FROM "ce_question" WHERE "active"=TRUE;`;
  pool.query(sqlText).then(result => {
      res.send(result.rows); // sending back application questions
  }).catch((error) => {
      console.log('error retrieving active application questions from the database... -------->', error);
  });
});

// GET all questions and answers from a specific results application
router.get('/:id', rejectUnauthenticatedAdmin, (req, res) => { 
  const sqlText = ` SELECT q.id, q.question_text, aq.answer_text, aq.review_score 
                    FROM question AS q
                    JOIN app_question AS aq ON q.id=aq.question_id
                    WHERE aq.app_id=$1;`;
  pool.query(sqlText, [req.params.id]).then(result => {
      res.send(result.rows); // sending back application questions
  }).catch((error) => {
      console.log('error retrieving application questions from the database... -------->', error);
  });
});

// Gets All questions and answers from a specific CE application
router.get('/ce/:id', rejectUnauthenticatedAdmin, (req, res) => { 
  const sqlText = ` SELECT q.id, q.question_text, aq.answer_text, aq.review_score 
                    FROM ce_question AS q
                    JOIN ce_app_question AS aq ON q.id=aq.question_id
                    WHERE aq.app_id=$1;`;
  pool.query(sqlText, [req.params.id]).then(result => {
      res.send(result.rows); // sending back application questions
  }).catch((error) => {
      console.log('error retrieving application questions from the database... -------->', error);
  });
});


// Toggles a question between active and inactive.
router.put('/question-status/:id', rejectUnauthenticatedAdmin, (req, res, next) => { 
    const sqlText = `
                    UPDATE question
                    SET active = $1
                    WHERE id=$2
                    ;`
    pool
      .query(sqlText, [req.body.newStatus, req.params.id])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('question/question-status PUT failed ', err);
        res.sendStatus(500);
      });
});

// Update the question text of a particular question.
router.put('/question-text/:id', rejectUnauthenticatedAdmin, (req, res, next) => {
    const sqlText = `
                    UPDATE question
                    SET question_text = $1
                    WHERE id=$2
                    ;`
    pool
      .query(sqlText, [req.body.newText, req.params.id])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('question/question-text PUT failed ', err);
        res.sendStatus(500);
      });
});

// Post new question
router.post('/', rejectUnauthenticatedAdmin, (req, res, next) => {
    const sqlText = `INSERT INTO question (question_text) VALUES ($1);`
    pool
      .query(sqlText, [req.body.newQuestion])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('question/ POST failed ', err);
        res.sendStatus(500);
      });
});

// Post new question
router.post('/ce', rejectUnauthenticatedAdmin, (req, res, next) => {
  const sqlText = `INSERT INTO ce_question (question_text) VALUES ($1);`
  pool
    .query(sqlText, [req.body.newQuestion])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('question/ POST failed ', err);
      res.sendStatus(500);
    });
});

// Toggles a question between active and inactive.
router.put('/question-status/ce/:id', rejectUnauthenticatedAdmin, (req, res, next) => { 
  const sqlText = `
                  UPDATE ce_question
                  SET active = $1
                  WHERE id=$2
                  ;`
  pool
    .query(sqlText, [req.body.newStatus, req.params.id])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('question/question-status PUT failed ', err);
      res.sendStatus(500);
    });
});

// Update the question text of a particular question.
router.put('/question-text/ce/:id', rejectUnauthenticatedAdmin, (req, res, next) => {
  const sqlText = `
                  UPDATE ce_question
                  SET question_text = $1
                  WHERE id=$2
                  ;`
  pool
    .query(sqlText, [req.body.newText, req.params.id])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('question/question-text PUT failed ', err);
      res.sendStatus(500);
    });
});




module.exports = router;