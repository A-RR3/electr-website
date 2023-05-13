import db from "../models/index.js";
import bcrypt from 'bcrypt';

const userAuthentication = async(req, res, next) => {
    const password = req.body.password;
    const id = req.body.id;
    const employee = await db.Employee.findOne({
        where: { id },
        attributes: [
            'EmployeeID', 'EmployeeName', 'id', 'password', 'PhoneNumber', 'role',

        ]
    })

    if (!employee) {
        checkCustomer(id, password, req, res, next);

    } else if (employee) {
        const passwordMatch = bcrypt.compare(password, employee.password);
        if (!passwordMatch) {
            checkCustomer(id, password, req, res, next);
        } else {
            req.employee = employee;
            next()

        }
    } else {
        return res.status(401).json({ //unauthorized
            success: false,
            message: 'Invalid Password!'
        });
    }
}



const checkCustomer = async(id, password, req, res, next) => {
    const customer = await db.Customer.findOne({
        where: { id },
    });
    console.log(customer.dataValues);
    if (customer) {
        // Compare the entered password with the hashed password stored in the database
        const passwordMatch = bcrypt.compare(password, customer.password);
        if (passwordMatch) {
            req.customer = customer;
            next()
        } else {
            res.status(401).json({ 'message': 'Incorrect password' });
        }

    } else {
        next()
    }
}

export default userAuthentication