const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticatedAdmin } = require('../modules/admin-authentication-middleware');

//gets notes on an application
router.get('/:id', rejectUnauthenticatedAdmin, (req, res) => {
  const sqlText = `SELECT * FROM notes WHERE app_id=$1 ORDER BY id;`;
  pool.query(sqlText, [req.params.id])
  .then(result => {
    res.send(result.rows); 
  })
  .catch((error) => {
    console.log('error retrieving notes the database... -------->', error);
  });
// }
});

//creation of note on application
router.post('/', rejectUnauthenticatedAdmin, (req, res) => {
  // if(req.user.admin){
  const {note, app_id} = req.body;
  const sqlText =  `INSERT INTO notes (review_note, app_id) VALUES ($1, $2);`;
  
  pool.query(sqlText, [note, app_id])
  .then(result => {
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log('error posting new note to database from server', error)
  })
});

//deletes notes - admin only route
router.delete(`/:id`, rejectUnauthenticatedAdmin, (req, res) => {
  const sqlText = `DELETE FROM notes WHERE id=$1;`;
  pool.query(sqlText, [req.params.id])
  .then(result => {
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log('error deleting note from server', error)
  })
})

//updates notes on admin side
router.put(`/`, rejectUnauthenticatedAdmin, (req, res) => {
  const sqlText = `UPDATE notes SET review_note=$1 WHERE id=$2;`;
  pool.query(sqlText, [req.body.note, req.body.note_id])
  .then(result => {
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log('error updating note from server', error)
  })
})


// --------------------- CE NOTES ROUTES ---------------------------
//gets notes on an application
router.get('/ce/:id', rejectUnauthenticatedAdmin, (req, res) => {
  const sqlText = `SELECT * FROM ce_notes WHERE app_id=$1 ORDER BY id;`;
  pool.query(sqlText, [req.params.id])
  .then(result => {
    res.send(result.rows); 
  })
  .catch((error) => {
    console.log('error retrieving notes the database... -------->', error);
  });
// }
});

//creation of note on application
router.post('/ce', rejectUnauthenticatedAdmin, (req, res) => {
  // if(req.user.admin){
  const {note, app_id} = req.body;
  const sqlText =  `INSERT INTO ce_notes (review_note, app_id) VALUES ($1, $2);`;
  
  pool.query(sqlText, [note, app_id])
  .then(result => {
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log('error posting new note to database from server', error)
  })
});

//deletes notes - admin only route
router.delete(`/ce/:id`, rejectUnauthenticatedAdmin, (req, res) => {
  const sqlText = `DELETE FROM ce_notes WHERE id=$1;`;
  pool.query(sqlText, [req.params.id])
  .then(result => {
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log('error deleting note from server', error)
  })
})

//updates notes on admin side
router.put(`/ce`, rejectUnauthenticatedAdmin, (req, res) => {
  const sqlText = `UPDATE ce_notes SET review_note=$1 WHERE id=$2;`;
  pool.query(sqlText, [req.body.note, req.body.note_id])
  .then(result => {
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log('error updating note from server', error)
  })
})

module.exports = router;
