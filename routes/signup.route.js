import express from 'express';
import signupController from '../controllers/signup.controller.js';
import { checkSignUp } from '../controllers/signup.controller.js';


const router = express.Router();

router.patch('/', checkSignUp, (req, res) => {
    try {
        signupController.makeAccount
        res.status(200).send({ message: "Signed Up Successfully" });
    } catch (e) {
        console.log(e)
    }
});


export default router;