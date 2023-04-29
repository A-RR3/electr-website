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
        attributes: ['role']
    })

    if (!employee) {
        const customer = await db.Customer.findOne({
            where: { id },
        });
        if (customer) {
            // Compare the entered password with the hashed password stored in the database
            const passwordMatch = bcrypt.compareSync(password, customer.password);
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
        const passwordMatch = bcrypt.compareSync(password, employee.password);
        if (passwordMatch) {
            req.employee = employee;
            next();
        } else {
            res.status(401).json('Incorrect password');
        }
    }
    next();
});

router.post('/', async(req, res, next) => {
    if (req.employee) {
        const accessToken = loginController.generateToken(req.employee);
        // const refreshToken = loginController.refreshToken(req.employee)
        console.log({ "role": req.employee.role, "employeeID": employee.EmployeeID });
        /* http only means not available to js more secure than storing refresh Token on local storage 
         or another cookie that is available to javascript*/

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
        res.json({ accessToken }); //send accessToken as json to frontend
    } else if (req.customer) {
        const accessToken = loginController.generateToken(req.customer);
        console.log({ "customer": req.customer, "customerID": req.customerID });
    } else {
        res.status(400).json({ 'message': 'Invalid Credentials' });
    }
});



// app.post('/login', (req, res) => {
// if (name) {
//     return res.status(200).send(`Welcome ${name}`)
// }

// res.status(401).send('Please Provide Credentials')
// })
export default router;