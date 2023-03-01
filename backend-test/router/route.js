import { Router } from "express";

import * as controller from '../controllers/appController.js' // importing all controllers

const router= Router();


// POST Methods
router.route('/authenticate').post(controller.verifyUser, (req,res) => res.end()); //authenticate user
router.route('/login').post(controller.verifyUser, controller.login); //log in app
// router.route('/verifyCode').post(controller.verifyUser, controller.verifyCode); //log in app

// GET Methods
router.route('/user/:ID').get(controller.getUser); // user with username

// PUT methods
// router.route('/updateuser').put(Auth, controller.updateUser); //to update the profile

export default router;