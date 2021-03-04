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

    const token = crypto.randomBytes(20).toString('hex');
    const timer = Date.now() + 3600000

    // Query to get information from the DB to be used for the URL in the email.
    const queryText = `UPDATE "user"
    SET password_reset_token = $1, 
    password_reset_timer = $2
    WHERE username = $3
    RETURNING id, username, contact_name;`
    
    pool
    .query(queryText, [token, timer, username])
    .then((result) =>{

        const {id, username, contact_name} = result.rows[0]

        const mailData = {
            from: process.env.MAIL_USERNAME,
            to: username,
            subject: 'Password Reset',
            text: 'Password Reset Test',
            html: `<p>Dear ${contact_name},</p>
            <p>A password reset has been requested for this account. If you did not request this, feel free to ignore this email. </p>
            <p>To update your password, within an hour of receiving this email, follow this link and complete the form:</p>
            <p><a href="http://localhost:3000/#/resetpassword/${id}/${token}">Reset Your Password!</a></p>
            <p>Thanks,</p>
            <p>The Results Foundation</p>`
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