import express from 'express';
import loginController from "../controllers/login.controller.js"
import userAuthentication from '../middleware/userAuthentication.js';
import verifyJWT from '../middleware/verifyJWT.js';
import db from '../models/index.js';
const router = express.Router();

// router.post('/', (req, res, next) => {
//     console.log('deep shit');
//     next();
// });
// router.post('/', (req, res, next) => {
//     console.log('hallalujeh');
//     res.send('deepshit');
// });



// router.post('/', (req, res, next) => {
//     console.log('zffft');
//     const password = req.body.password;
//     const id = req.body.id;
//     console.log(password, id);
//     const employee = db.Employee.findOne({
//         where: { id },
//         attributes: [
//             'EmployeeID', 'EmployeeName', 'role', 'id', 'password', 'PhoneNumber'
//         ]
//     })

//     if (!employee) {
//         const customer = db.Customer.findOne({
//             where: { id },
//         });
//         if (customer) {
//             // Compare the entered password with the hashed password stored in the database
//             const passwordMatch = bcrypt.compare(password, customer.password);
//             if (passwordMatch) {
//                 req.customer = customer;
//                 console.log(customer);
//                 next();
//             } else {
//                 res.status(401).json('Incorrect password');
//             }

//         } else {
//             next();
//         }

//     } else {
//         const passwordMatch = bcrypt.compare(password, employee.password);
//         if (passwordMatch) {
//             req.employee = employee;
//             next();
//         } else {
//             return res.status(401).json({ //unauthorized
//                 success: false,
//                 message: 'Invalid login credentials!'
//             });
//         }
//     }
// })

router.post('/', userAuthentication, async(req, res, next) => {

    try {
        if (req.employee) {
            const accessToken = await loginController.generateAccessToken(req.employee.EmployeeID);
            console.log(accessToken);
            const refreshToken = await loginController.generateRefreshToken(req.employee.EmployeeID)
            console.log({ "role": req.employee.role, "employeeID": req.employee.EmployeeID });
            /* http only means not available to js more secure than storing refresh Token on local storage 
             or another cookie that is available to javascript*/

            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
                //send accessToken as json to frontend
            res.status(200).json({
                success: true,
                message: 'Successfully logged in',
                token: accessToken,
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