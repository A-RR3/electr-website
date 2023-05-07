import express from 'express';
import db from '../models/index.js';
const router = express.Router();
import employeeController from '../controllers/employee.controller.js';



router.post('/', async function(req, res) {

    // Call the hashAllPasswords function to hash all passwords
    try {
        const data = await employeeController.hashAllPasswords();
        data.forEach(item => {
            db.Employee.create(item);
        });
        res.status(201).send(data);
    } catch (err) {
        res.status(500).send(err || "Something went wrong");
    };


})

router.get('/', employeeController.findAll);

router.post('/NewEmployee', employeeController.addEmployee)

export default router;