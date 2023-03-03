import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

import ENV from '../config.js';


// https://ethereal.email/create // to create a temporary account
let nodeConfig = {
    service: 'gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: ENV.EMAIL, // jis account se mail jayega uska email
        pass: ENV.PASSWORD, // and uska password
    }
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product : {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
})

/** POST: http://localhost:8282/api/registerMail 
 * @param: {
 * "inviteename": "xyz",
  "guestname" : "example123",
  "Email" : "admin123",
  "text" : "",
  "subject" : ""
}
*/
export const registerMail = async (req, res) => {
    const { guestname, Email, text, subject } = req.body;

    // body of the email
    var email = {
        body : {
            name: Email,
            intro : text || `'Hello! We\'re very excited to tell you that ${guestname} is out there to meet you.'`,
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }

    var emailBody = MailGenerator.generate(email);

    let message = {
        from : ENV.EMAIL,
        to: Email,
        subject : subject || "OTP Received",
        html : emailBody
    }

    // send mail
    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({ msg: "You should receive an email from us."})
        })
        .catch(error => res.status(500).send({ error }))

}