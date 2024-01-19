const nodemailer = require("nodemailer");

const getRandom4DigitNumber = () => {
    const min = 1000; // Minimum 4-digit number
    const max = 9999; // Maximum 4-digit number
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
};
const sendVerificationEmail = (email, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'abdullahansari.eb19102002@gmail.com',
            pass: 'rryhmqmmplntumym',
        },
    });

    const mailOptions = {
        from: 'abdullahansari.eb19102002@gmail.com',
        to: email,
        subject: subject,
        html: `<h1>Email Verification</h1>
                    <h2>Your Registration Successfully..!!</h2>
                    <p>Please click the link to verify your email:</p>
                    <a href="http://localhost:3001/validate" >Verify Email</a> 
                    <h2>Your OTP Code is</h2>
                    <b>Code: ${text} </b>
                  `,
    };

    transporter.verify((error, success) => {
        if (error) {
            console.log(error)
        } else {
            console.log(success)
        }
    })

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = {
    getRandom4DigitNumber,
    sendVerificationEmail
}