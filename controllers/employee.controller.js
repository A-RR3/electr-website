import { employees_data } from "../data.js";
import db from "../models/index.js";
import bcrypt from 'bcrypt';


// Define a helper function to hash the password using bcrypt
async function hashPassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    // const hash = await bcrypt.hash(password, 10);
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
    await db.Employee.create({
            EmployeeName: req.body.empName,
            role: req.body.role,
            id: req.body.id,
            password: pwd,
            PhoneNumber: req.body.phoneNum
        })
        .then(
            res.status(201).send({ 'message': 'Employee Added Successfully' })

        ).catch(err => {
            console.log(err.message || "Something went wrong");

        })
}

const updateEmpPassword = async(req, res) => {
    const password = req.body.password;
    const hash = await hashPassword(password);
    await db.Employee.upsert({
        id: req.body.id,
        password: hash
    }).then(data => {
        res.status(200).send(data)
    })
}
const archiveEmployee = async(req, res) => {
    const empNum = req.body.empNum;
    const endDate = req.body.endDate;
    await db.Employee.update({
            endDate: endDate
        }, {
            where: { EmployeeID: empNum }
        }).then(result => {
            res.status(200).send(result); // ok
        })
        .catch(err => {
            console.log(err.message || "Something went wrong");

        });
}

export default {
    findAll,
    hashAllPasswords,
    addEmployee,
    hashPassword,
    archiveEmployee,
    updateEmpPassword
}