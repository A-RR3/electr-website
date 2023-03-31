import express from 'express';
import requestController from '../controllers/request.controller.js';
import db from '../models/index.js';
const router = express.Router();

//get all requests
router.get('/', requestController.findAll);

//create a request
router.post('/', (req, res) => {

    try {
        requestController.create(req, res);

    } catch (e) {
        console.log(e);
        res.sendStatus(404);
    }

});



router.get('/:requestId', async(req, res) => {
    const requestId = req.params.requestId
    try {
        const request = await requestController.getOneRequest(requestId);
        req.request = request;
        res.status(200).json({ request: req.request });
    } catch (e) {
        console.log(e);
        res.sendStatus(404);
    }
});


router.delete('/:requestId', async(req, res) => {

    try {
        requestController.deleteById(req.params.requestId);

    } catch (error) {
        res.status(403).send(error); //forbidden
    }
});


export default router;