import express from 'express';
import signupController from '../controllers/signup.controller.js';
import { checkSignUp } from '../controllers/signup.controller.js';


const router = express.Router();

router.patch('/', checkSignUp, async(req, res) => {
    try {
        await signupController.makeAccount(req, res).then(
            res.status(200).send({ message: "Signed Up Successfully" })
        )

    } catch (e) {
        console.log(e)
    }
});


export default router;