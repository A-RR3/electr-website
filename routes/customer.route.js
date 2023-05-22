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

router.get('/applications', async(req, res) => {

    const userid = req.headers.userid
    await customerController.viewApplications(req, res, userid).then(data => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send(err);
    })

});

router.get('/services', async(req, res) => {

    const userid = req.headers.userid
        // const customerID = req.body.Userid

    console.log(req.headers.userid);
    await customerController.viewServices(req, res, userid).then(data => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err.message || "Something went wrong");
    })

});

router.all('*', (req, res) => {
    res.status(404).send('<h1>resource not found</h1>')
})

export default router;