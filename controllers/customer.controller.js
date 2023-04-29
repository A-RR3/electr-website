import { customers_data } from "../data.js";
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
    for (let i = 0; i < customers_data.length; i++) {
        const user = customers_data[i];
        user.password = await hashPassword(user.password);
    }
    console.log(customers_data);
    return customers_data;
}

const findAll = (req, res) => {
    db.Customer.findAll()
        .then(results => {
            res.status(200).send(results); // model is a json object
        })
        .catch(err => {
            res.status(500).send(err.message || "Something went wrong");
        });
};

const deleteById = (req, res) => {
    db.Customer.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.status(203).send();
        })
        .catch(err => {
            res.status(500).send(err.message || "Something went wrong");
        });
}

export default {
    findAll,
    deleteById,
    hashAllPasswords
}