import express from 'express';
import db from "../models/index.js";
import loginController from "../controllers/login.controller.js"
// const bcrypt = require('bcrypt');
import bcrypt from 'bcrypt';
const router = express.Router();

router.post('/', async(req, res, next) => {
    const password = req.body.password;
    const id = req.body.id;
    const employee = await db.Employee.findOne({
        where: { id },
        attributes: [
            'EmployeeID', 'EmployeeName', 'role', 'id', 'password', 'PhoneNumber'
        ]
    })

    if (!employee) {
        const customer = await db.Customer.findOne({
            where: { id },
        });
        if (customer) {
            // Compare the entered password with the hashed password stored in the database
            const passwordMatch = bcrypt.compare(password, customer.password);
            if (passwordMatch) {
                req.customer = customer;
                next();
            } else {
                res.status(401).json('Incorrect password');
            }

        } else {
            next();
        }

    } else {
        console.log('employee logging in');
        console.log(employee.toJSON());
        console.log(`"password: ":${password}`);
        console.log(`"employee.password: ":${employee.toJSON().password}`);


        //     function(err, result) {
        //     if (err) {
        //         console.log("error:" + err);
        //     }
        //     if (result) {
        //         console.log('Password is correct');
        //     } else {
        //         console.log('Password is incorrect');
        //     }
        // }
        const passwordMatch = bcrypt.compare(password, employee.password);

        if (passwordMatch) {
            req.employee = employee;
            next();
        } else {
            return res.status(401).json({ //unauthorized
                success: false,
                message: 'Invalid login credentials!'
            });
        }
    }
});

router.post('/', async(req, res, next) => {
    if (req.employee) {
        const accessToken = loginController.generateToken(req.employee);
        const refreshToken = loginController.refreshToken(req.employee)
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
        const accessToken = loginController.generateToken(req.customer);
        const refreshToken = loginController.refreshToken(req.customer)
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
        res.status(200).json({
            success: true,
            message: 'Successfully logged in',
            token: accessToken,
            userId: req.customer.CustomerID,
            role: "customer"
        });
        console.log({ "customer": req.customer, "customerID": req.CustomerID });
    } else {
        res.status(401).json({ 'message': 'Invalid Credentials' });
    }
});



// app.post('/login', (req, res) => {
// if (name) {
//     return res.status(200).send(`Welcome ${name}`)
// }

// res.status(401).send('Please Provide Credentials')
// })
export default router;