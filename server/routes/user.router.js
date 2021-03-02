const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// This function was created by a stackoverflow user here: 
//https://stackoverflow.com/questions/12175111/validate-accept-only-emails-from-a-specific-domain-name
  
// bless them
const validateEmail = (email) => { 
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(re.test(email)){
      //Email valid. Proceed to test if it's from the right domain (Second argument is to check that the string ENDS with this domain, and that it doesn't just contain it)
      if(email.indexOf("@results.net", email.length - "@results.net".length) !== -1){
          //VALID
          return true
      }
  }
  return false
}

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Route to check if a username exists in the DB.
router.get('/:username', (req, res) => {
  const { username } = req.params;
  
  const queryText = `SELECT username FROM "user" WHERE username = $1`;

      pool
      .query(queryText, [username])
      .then((result) => res.send(result.rows))
      .catch((err) => {
        console.log('User registration failed: ', err);
        res.sendStatus(500);
      });
  
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const orgName = req.body.orgName;
  const background = req.body.background;
  const phone = req.body.phone;
  const contactName = req.body.contactName;

  const queryText = `INSERT INTO "user" (username, password, org_name, background, phone, contact_name)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
  pool
    .query(queryText, [username, password, orgName, background, phone, contactName])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles POST request with new user data for community engagement registration
router.post('/ce/register', (req, res, next) => {
  // validate email on client AND in post route so postman can't get around verification
  if (validateEmail(req.body.username)){
    const username = req.body.username;
    const password = encryptLib.encryptPassword(req.body.password);
    const orgName = req.body.orgName;
    const phone = req.body.phone;
    const contactName = req.body.contactName;
  
    const queryText = `INSERT INTO "user" (username, password, org_name, phone, contact_name, remax_employee)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
    pool
      .query(queryText, [username, password, orgName, phone, contactName, true])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('User registration failed: ', err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(500);
  }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  console.log('inside logout')
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});



module.exports = router;
