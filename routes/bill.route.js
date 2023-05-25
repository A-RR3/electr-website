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
        const userid = req.headers.userid
        await billController.viewBills(req, res, userid)
    } catch (e) {
        console.log(e)
    }
})

export default router;