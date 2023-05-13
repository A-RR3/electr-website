import express from 'express';
import loginController from "../controllers/login.controller.js"
import userAuthentication from '../middleware/userAuthentication.js';

const router = express.Router();

router.post('/', userAuthentication, async(req, res, next) => {

    try {
        if (req.employee) {
            await loginController.employeeLogin(req, res);
        } else if (req.customer) {
            try {
                await loginController.customerLogin(req, res);
                console.log('customer login');

            } catch (err) {
                console.log(err);
            }
        } else {
            res.status(401).json({ 'message': 'Invalid Credentials' });
        }
    } catch (e) {
        console.log(e);
        res.send(e);
    }


});


export default router;