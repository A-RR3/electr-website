import { employees_data } from "../data.js";
import db from "../models/index.js";
import bcrypt from 'bcrypt';


// Define a helper function to hash the password using bcrypt
async function hashPassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

// Loop through the customers array and hash each password
async function hashAllPasswords() {
    for (let i = 0; i < employees_data.length; i++) {
        const user = employees_data[i];
        user.password = await hashPassword(user.password);
    }
    console.log(employees_data);
    return employees_data;
}

const findAll = (req, res) => {
    db.Employee.findAll()
        .then(results => {
            res.status(200).send(results); // model is a json object
        })
        .catch(err => {
            res.status(500).send(err.message || "Something went wrong");
        });
};


const addEmployee = async(req, res) => {
    const pwd = await hashPassword(req.body.password);
    const employee = db.Employee.create({
            EmployeeName: req.body.empName,
            role: req.body.role,
            id: req.body.id,
            password: pwd,
            PhoneNumber: req.body.phoneNum
        })
        .then(
            res.status(201).send({ 'message': 'Employee Added Successfuly' })

        ).catch(err => {
            res.status(500).send(err.message || "Something went wrong");
        })
}
const archiveEmployee = async(req, res) => {
    const empNum = req.body.empNum;
    const endDate = req.body.endDate;
    db.Employee.update({
            endDate: endDate
        }, {
            where: { EmployeeID: empNum }
        }).then(result => {
            res.status(202).send(result); // accepted
        })
        .catch(err => {
            res.status(500).send(err.message || "Something went wrong");
        });
}

export default {
    findAll,
    hashAllPasswords,
    addEmployee,
    hashPassword,
    archiveEmployee
}