const express = require("express");
const { registration, getOTP, signin, signout } = require("../controllers/users/usersAuthenication");
const { authenticationToken } = require("../controllers/Authtoken");
const { updateProfile, getuserbyemail } = require("../controllers/users/users");

const router = express.Router();
const app = express()

router.route('/registration').post(registration)
router.route('/getotp').post(getOTP)
router.route('/login').post(signin)
router.route('/getuserbyemail').get(authenticationToken, getuserbyemail)

router.route('/updateprofile').post(authenticationToken,updateProfile)
router.route('/logout').post(authenticationToken,signout)




module.exports = router