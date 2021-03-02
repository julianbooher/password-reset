const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectUnauthenticatedAdmin } = require('../modules/admin-authentication-middleware');

// Get route for current grant window, if one is currently open.
//this can be open for anyone to see
router.get('/current-window', (req, res) => {
  const sqlText = `
                  SELECT g.id, g.start_date, g.end_date, g.funds_available, count(a.id) AS app_count FROM grant_window AS g
                  LEFT JOIN app AS a ON a.grant_window_id = g.id
                  WHERE now() BETWEEN g.start_date AND g.end_date
                  GROUP BY g.id
                  ;`

  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows[0])
    })
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});


// Route to get previous grant windows and the amount of applications within that grant window.
//admin only view
router.get('/previous-windows', rejectUnauthenticatedAdmin, (req, res) => {
  const sqlText = `
                  SELECT g.id, g.start_date, g.end_date, COUNT(a.id) AS app_count FROM grant_window AS g
                  LEFT JOIN app AS a ON a.grant_window_id = g.id 
                  WHERE now() > end_date
                  GROUP BY g.id
                  ORDER BY g.end_date DESC
                  ;`
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows)
    })
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Post route for the admin to create a new grant window.
router.post('/', rejectUnauthenticatedAdmin, async (req, res, next) => {
    const { startDate, endDate, budget } = req.body

    const client = await pool.connect()
    
    try{
      await client.query('BEGIN')
      // create the grant window, returning the id into this variable
      const grantWindowId =
        await client.query(`
                            INSERT INTO grant_window
                            (start_date, end_date, funds_available)
                            VALUES ($1, $2, $3)
                            returning id;`, [startDate, endDate, budget])
      // sql query to get all applications without a grant window
      const windowlessApps =
        await client.query(`
                            SELECT * FROM app
                            WHERE grant_window_id IS NULL
                            `)
      // map over the windowless applications, update their grant window to the new grant window.
      await Promise.all(windowlessApps.rows.map((app) => {
        const sqlText = `
                        UPDATE app 
                        SET grant_window_id = $1
                        WHERE id = $2
                        ;`
        return client.query(sqlText, [grantWindowId.rows[0].id, app.id])
      }));
      await client.query('COMMIT;');
      res.sendStatus(201);
    } catch (error){
      await client.query('ROLLBACK;');
      console.log('ERROR creating new grant window', error);
      res.sendStatus(500);

    } finally {
      client.release();
    }
});

// Put route for the admin to close the current grant window.
router.put('/close/:id', rejectUnauthenticatedAdmin, (req, res, next) => {
 
    const sqlText = `
                    UPDATE grant_window
                    SET end_date = now()
                    WHERE grant_window.id=$1
                    ;`
    pool
      .query(sqlText, [req.params.id])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('grantWindow/close PUT failed ', err);
        res.sendStatus(500);
      });
});

// Put route for the admin to change the details of the current grant window.
router.put('/:id', rejectUnauthenticatedAdmin, (req, res, next) => {
  const { startDate, endDate, budget } = req.body;

 
    const sqlText = `
                    UPDATE grant_window
                    SET start_date = $1,
                    end_date = $2,
                    funds_available = $3
                    WHERE grant_window.id = $4
                    ;`
    pool
      .query(sqlText, [startDate, endDate, budget, req.params.id])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('grantWindow/close PUT failed ', err);
        res.sendStatus(500);
      });
});

module.exports = router;
