const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const crypto = require('crypto');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport( {
    port: 587,
    host: 'smtp-mail.outlook.com',
    secureConnection: false,
    auth: {
        user: process.env.MAIL_USERNAME, //from env file
        pass: process.env.MAIL_PASSWORD //from env file
    },
    tls: {
        ciphers:'SSLv3'
    }
});

router.post('/email/:username', (req, res) => {
    // Get the username from the route parameters.
    const { username } = req.params;

    // Query to get information from the DB to be used for the URL in the email.
    const queryText = `SELECT id, username, contact_name, password FROM "user" WHERE username = $1;`
    
    pool
    .query(queryText, [username])
    .then((result) =>{

        const {id, username, password, contact_name} = result.rows[0]

        const mailData = {
            from: process.env.MAIL_USERNAME,
            to: username,
            subject: 'Password Reset',
            text: 'Password Reset Test',
            html: `<p>Dear ${contact_name},</p><p>Password Reset Test</p><p>Thanks,</p><p>The Results Foundation</p>`
        }

        transporter.sendMail(mailData, (error, info) => {
            if( error ){
                return console.log('error in transporter.sendMail', error);
            } 
            res.send({message:'mail sent', message_id: info.messageId})
        })
    })
    .catch((err) => {
        console.log('User registration failed: ', err);
        res.sendStatus(500);
    });
    
})

module.exports = router;