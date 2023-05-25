import db from "../models/index.js";
import bcrypt from 'bcrypt';

const userAuthentication = async(req, res, next) => {
    const password = req.body.password;
    const id = req.body.id;
    console.log(password, id);

    // const hash = await hashPassword(password);
    // res.send(hash);
    const employee = await db.Employee.findOne({
        where: { id },
        attributes: [
            'EmployeeID', 'id', 'password',
            // 'EmployeeID', 'id', 'password', 'PhoneNumber', 'role', 'EmployeeName',
        ]
    });
    if (!employee) {
        console.log(employee);
        console.log("maybe a customer");

        checkCustomer(id, password, req, res, next);

    } else if (employee) {
        console.log("employeer.dataValues.password :" + employee.dataValues.password);
        if (employee.dataValues.id && !employee.dataValues.password) {
            next();
        }
        console.log("he is an employee");
        const passwordMatch = await bcrypt.compare(`${password}`, employee.dataValues.password);
        console.log('test');
        console.log(passwordMatch);
        if (!passwordMatch) {
            res.status(401).send({ 'message': 'Incorrect password' });
        } else {
            req.employee = employee;
            next()

        }
    } else {
        console.log("not in the database");

        return res.status(401).send({ //unauthorized
            success: false,
            message: 'Invalid Password!'
        });
    }
}

// async function hashPassword(password) {
//     const saltRounds = 10;
//     const salt = await bcrypt.genSalt(saltRounds);
//     const hash = await bcrypt.hash(password, salt);
//     return hash;
// }


const checkCustomer = async(id, password, req, res, next) => {
    const customer = await db.Customer.findOne({
        where: { id },
        attributes: [
            'CustomerID', 'id', 'password',
            // 'EmployeeID', 'id', 'password', 'PhoneNumber', 'role', 'EmployeeName',
        ]
    });
    if (customer) {
        // Compare the entered password with the hashed password stored in the database
        console.log(customer.dataValues.password);
        if (customer.dataValues.id && !customer.dataValues.password) {
            next();
            return;
        }

        const passwordMatch = await bcrypt.compare(password, customer.dataValues.password);
        console.log(passwordMatch);

        if (!passwordMatch) {
            res.status(401).send({ 'message': 'Incorrect Password' });

        } else {
            req.customer = customer;
            next()
        }

    }
    if (!customer) {
        res.status(404).send({ 'message': 'Incorrect Identification Number' });
    }

}

export default userAuthentication