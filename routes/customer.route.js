import express from 'express';
import db from '../models/index.js';
const router = express.Router();
import customerController from '../controllers/customer.controller.js';



router.post('/', async function(req, res) {

    // Call the hashAllPasswords function to hash all passwords
    try {
        const data = await customerController.hashAllPasswords();
        // res.status(201).send(data);
        data.forEach(item => {
            db.Customer.create(item);
        });
        res.status(201).send(data);

    } catch (err) {
        res.status(500).send(err || "Something went wrong");
    };


})

router.get('/', customerController.findAll);

router.all('*', (req, res) => {
    res.status(404).send('<h1>resource not found</h1>')
})

export default router;