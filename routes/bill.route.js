import express from 'express';
import billController from "../controllers/bill.controller.js"

const router = express.Router();

router.post('/', async(req, res) => {
    try {
        await billController.bills(req, res).then(
            res.status(201).send("bills are created")
        )
    } catch (e) {
        console.log(e)
    }
});



router.get('/', async(req, res) => {
    try {
        await billController.viewBills(req, res).then(data => {
                res.status(200).send(data)
            }

        )
    } catch (e) {
        console.log(e)
    }
})

export default router;