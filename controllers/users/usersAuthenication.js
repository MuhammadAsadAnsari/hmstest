const promisePool = require('../../connection/connect');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getRandom4DigitNumber, sendVerificationEmail } = require('../extrastuff');

const registration = async (req, res) => {
    const { name, email, password, role } = req.body
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password.toString(), salt);
    const verificationToken = getRandom4DigitNumber();
    try {
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                data: null,
                error: "All fields are required."
            });
        }

        const insert = `INSERT INTO users (name, email,password,role,otp) VALUES ('${name}','${email}','${hash}','${role}','${verificationToken}')`
        const [result] = await promisePool.execute(insert)
        const token = jwt.sign({ data: email }, 'secret_key')
        sendVerificationEmail(email, 'Email Verification', verificationToken);
        let responseObject = {
            success: true,
            data: {

                token: token,
                name: name,
                email: email,
                role: role,
            },
            error: null,
            message: "Registration Successfully"


        };

        // Assuming role is a variable that holds the user's role

        res.status(201).json(responseObject);


    } catch (error) {
        let responseStatusCode = 500;
        let responseMessage = "Internal Server Error. Please try again later.";

        if (error.code === 'ER_DUP_ENTRY') {
            responseStatusCode = 409;
            responseMessage = "Email already exists.";
        }

        console.error(error);

        res.status(responseStatusCode).json({
            success: false,
            data: null,
            code: error.code, // Add specific error code if needed
            message: responseMessage
        });
    }

}
const getOTP = async (req, res) => {
    const { token, code } = req.body
    var decoded = jwt.verify(token, 'secret_key');
    let email = decoded["data"];
    try {
        if (!token) {
            return res.status(404).json({
                success: false,
                data: null,
                code: error.code,
                message: "No User Found"
            });

        }
        const query = `SELECT * FROM users where users.email= '${email}'`;
        const [rows] = await promisePool.execute(query)
        if (rows[0].otp !== Number(code)) {
            return res.status(404).json({
                success: false,
                data: null,
                error: true,
                message: "OTP Not Matched. Please Check you OTP. "
            })
        }
        const update = `update users set status='approved' where users.email ='${email}'`
        const [status] = await promisePool.execute(update)
        res.status(200).json({
            success: true,
            data: {
                email: rows[0].email,
                token: token,

            },
            error: null,
            message: "OTP Verfied"
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            code: error.code,
            message: "Internal server error. try again latter."
        });
    }
}
const signin = async (req, res) => {
    const { email, password } = req.body
    const token = jwt.sign({ data: email }, 'secret_key')
    try {
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                data: null,
                message: "All fields are required."
            });
        }
        const query = `SELECT * FROM users WHERE email ='${email}'`;
        const [result] = await promisePool.execute(query);
        const id = result[0].id;
        const status = result[0].status;
        const role = result[0].role;
        const matched = await bcrypt.compare(password.toString(), result[0].password.toString());
        if (!matched) {
            return res.status(404).json({
                success: false,
                data: null,
                error: 404,
                message: "Wrong Credentials"
            })
        }
        if ((role !== "users" && role !=="doctors") || status !== "approved") {
            return res.status(401).json({
                success: false,
                data: null,
                error: "User Not Verified"
            });

        }
        const insertion = `INSERT INTO user_token(user_id, token) VALUES (${id},'${token}')`
        const [insertionresult] = await promisePool.execute(insertion);
        res.status(200).json({
            success: true,
            data: {
                email: email,
                token: token
            },
            error: null,
            message: "Login Successfully"

        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            code: error.code,
            message: "Internal server error. try again latter."
        });
    }

}
const signout = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1] 
    try {
        const getid = `SELECT user_token.user_id FROM user_token where user_token.token ='${token}'`;
        const [getidresult] = await promisePool.execute(getid);
        console.log(getidresult);
        const userid = getidresult[0]["user_id"]
        let deleteoftoken = `DELETE  FROM user_token WHERE user_id=${userid}`
        const [deleteoftokenresult] = await promisePool.execute(deleteoftoken);
        res.status(200).json({
            success: true,
            message: "Logout Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            code: error.code,
            message: "Internal server error. try again latter."
        });
    }

}
module.exports = {
    registration,
    getOTP,
    signin,
    signout
}
