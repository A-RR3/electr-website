import express from 'express';
import installmentController from "../controllers/installment.controller.js"

const router = express.Router();


router.post('/', async(req, res) => {
    try {
        await installmentController.installments(req, res).then(
            res.status(201).send("installments are created")
        )
    } catch (e) {
        console.log(e)
    }
});

router.get('/', async(req, res) => {
    try {
        const userid = req.headers.userid

        await installmentController.viewInstallments(req, res, userid).then(data => {
                res.status(200).send(data)
            }

        )
    } catch (e) {
        console.log(e)
    }
})


export default router;