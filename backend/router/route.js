import { Router } from "express";

import * as controller from '../controllers/appController.js' // importing all controllers
import Auth,{localVariables} from "../middleware/auth.js";
import { registerMail } from "../controllers/mailer.js";

const router= Router();


// POST Methods
router.route('/register').post(controller.register); //to register
router.route('/registerMail').post(registerMail); //send mail
router.route('/authenticate').post(controller.verifyUser, (req,res) => res.end()); //authenticate user
router.route('/login').post(controller.verifyUser, controller.login); //log in app
// router.route('/verifyCode').post(controller.verifyUser, controller.verifyCode); //log in app

// GET Methods
router.route('/user/:ID').get(controller.getUser); // user with username
router.route('/generateOTP').get(localVariables,controller.generateOTP); //generate random OTP
router.route('/verifyOTP').get(controller.verifyOTP); //verify generated OTP

// PUT methods
// router.route('/updateuser').put(Auth, controller.updateUser); //to update the profile

export default router;