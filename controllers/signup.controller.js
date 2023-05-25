import db from "../models/index.js";
import { customers_data } from "../data.js";
import bcrypt from 'bcrypt';




export const checkSignUp = async(req, res, next) => {
    const id = req.body.id
        // const phoneNumber = req.body.phoneNumber
    const foundCustomer = await db.Customer.findOne({
        where: { id: id }
    })
    if (!foundCustomer) {
        console.log('ccccccccc')
        res.status(401).send({ message: "You can't create an account if you are not subscribed to the company" })
        return;
    } else {
        // const password = req.body.password
        if (foundCustomer.password) {
            res.status(202).send({ message: "An account with the provided identification number already exists" });
            return;
        }

    }
    next();
}




const makeAccount = async(req, res) => {
    const id = req.body.id
    const password = req.body.password
    const phonenumber = req.body.phoneNumber
    const hash = await hashPassword(password);
    await db.Customer.upsert({
        PhoneNumber: phonenumber,
        id: req.body.id,
        password: hash,
        signedup: 1
    });
}

async function hashPassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}
export default { makeAccount }