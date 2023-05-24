import db from "../models/index.js";
import { customers_data } from "../data.js";



export const checkSignUp = async(req, res, next) => {
    const id = req.body.id
    const phoneNumber = req.body.phoneNumber
    const foundCustomer = await db.Customer.findOne({
        where: { id: id }
    })
    if (!foundCustomer) {
        res.status(404).send({ message: "You can't create an account if you are not subscribed to the company" })
        return;
    } else {
        const password = req.body.password
        if (password !== null) {
            res.status(404).send({ message: "An account with the provided identification number already exists" });
            return;
        }

    }
    next();
}




const makeAccount = async(req, res) => {
    const id = req.body.id
    const name = req.body.name
    const phoneNumber = req.body.phoneNumber
    const address = req.body.address
    const password = req.body.password

    customers_data.push({
        CustomerName: name,
        PhoneNumber: phoneNumber,
        PlaceOfResidence: address,
        password: password
    });
    const hashedPassword = hashPassword(password);
    await db.Customer.upsert({
        id: req.body.id,
        CustomerName: name,
        PhoneNumber: phoneNumber,
        PlaceOfResidence: address,
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