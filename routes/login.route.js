import express from 'express';
import db from "../models/index.js";

const router = express.Router();

router.post('/', async(req, res, next) => {
    const password = req.body.password;
    const id = req.body.id;
    const employee = await db.Employee.findOne({
            where: { id, password },
            attributes: ['role']
        })
        //   .then(result => {
        //     if (result) {
        //       // The row with the given id and password exists

    //     } else {
    //       // The row with the given id and password does not exist
    //     }
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
    if (!employee) {
        const customer = await db.Customer.findOne({
            where: { id },
        });
        if (customer) {
            req.customer = "customer";
            req.customerID = customer.customerID;
        } else {
            next();
        }

    } else {
        const userRole = employee.role;
        const EmpId = employee.EmployeeID;
        req.userRole = userRole;
        req.EmpId = EmpId;
    }
    next();
});

router.post('/', async(req, res, next) => {
    if (req.userRole) {
        res.status(200).send({ "role": req.userRole, "employeeID": req.EmpId });
    } else if (req.customer) {
        res.status(200).send({ "customer": req.customer, "customerID": req.customerID });
    } else {
        res.status(404).send({ "message": "No User Found" });
    }
});

export default router;