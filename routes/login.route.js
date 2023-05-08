import express from 'express';
import loginController from "../controllers/login.controller.js"
import userAuthentication from '../middleware/userAuthentication.js';

const router = express.Router();

// router.post('/', (req, res, next) => {
//     console.log('deep shit');
//     next();
// });
// router.post('/', (req, res, next) => {
//     console.log('hallalujeh');
//     res.send('deepshit');
// });



router.post('/', userAuthentication, async(req, res, next) => {

    try {
        if (req.employee) {
            const accessToken = await loginController.generateAccessToken(req.employee.EmployeeID);
            console.log(accessToken);
            const refreshToken = await loginController.generateRefreshToken(req.employee.EmployeeID)
            console.log({ "role": req.employee.role, "employeeID": req.employee.EmployeeID });
            /* http only means not available to js more secure than storing refresh Token on local storage 
             or another cookie that is available to javascript*/

            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }) //30days / sameSite: 'None', secure: true,
                //send accessToken as json to frontend
            res.status(200).json({
                success: true,
                message: 'Successfully logged in',
                token: accessToken,
                // refresToken: refreshToken,
                userId: req.employee.EmployeeID,
                role: req.employee.role
            });
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