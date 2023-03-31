import express from 'express';
import customerController from '../controllers/customer.controller.js';
const router = express.Router();

router.post('/', (req, res) => {
    if (!req.body.CustomerID || !req.body.CustomerName) { //validation can be called as a middleware function here
        res.status(400).send("Customer Name and ID are Required!");
    } else {
        customerController.create(req, res);
    }
});

router.get('/', customerController.findAll);

router.all('*', (req, res) => {
    res.status(404).send('<h1>resource not found</h1>')
})

export default router;