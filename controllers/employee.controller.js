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

export default {
    findAll,
    hashAllPasswords
}