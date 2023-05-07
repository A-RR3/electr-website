import db from "../models/index.js";
import bcrypt from 'bcrypt';
import employeeController from "../controllers/employee.controller.js";

const userAuthentication = async(req, res, next) => {
    const password = req.body.password;
    const id = req.body.id;
    const encryptedPassword = employeeController.hashPassword(password);
    console.log(password, id);
    const employee = await db.Employee.findOne({
        where: { id, password },
        attributes: [
            'EmployeeID', 'EmployeeName', 'role', 'id', 'password', 'PhoneNumber'
        ]
    })

    if (!employee) {
        const customer = await db.Customer.findOne({
            where: { id },
        });
        console.log(customer);
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

    } else {
        // const passwordMatch = bcrypt.compare(password, employee.password);
        if (employee) {
            req.employee = employee;
            next()
        } else {
            return res.status(401).json({ //unauthorized
                success: false,
                message: 'Invalid Password!'
            });
        }
    }

}


export default userAuthentication