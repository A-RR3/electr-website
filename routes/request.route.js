import express from 'express';
import requestController from '../controllers/request.controller.js';
import db from '../models/index.js';
const router = express.Router();
import multer from "multer";
import path from "path";
import { Sequelize } from "sequelize";
import Request from "../models/request.model.js";



const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function(req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    }),
    limits: { fileSize: 50 * 1024 * 1024 } // 50 MB
});



// const upload1 = multer({
//     storage: multer.diskStorage({
//         destination: function(req, file, cb) {
//             cb(null, '../uploads/');
//         },
//         filename: function(req, file, cb) {
//             cb(null, 'beneficiaryIDImage' + Date.now() + path.extname(file.originalname));
//         }
//     }),
//     limits: { fileSize: 10000000 }
// });

// const upload2 = multer({
//     storage: multer.diskStorage({
//         destination: function(req, file, cb) {
//             cb(null, '../uploads/');
//         },
//         filename: function(req, file, cb) {
//             cb(null, 'userIDImage' + Date.now() + path.extname(file.originalname));
//         }
//     }),
//     limits: { fileSize: 10000000 }
// });


//get all requests
router.get('/', requestController.findAll);


router.post('/upload/', (req, res, next) => {

    next();
});


//create a request
router.post('/', upload.fields([
    { name: 'userIDImage', maxCount: 1 },
    { name: 'beneficiaryIDImage', maxCount: 1 }
]), async(req, res) => {

    try {
        console.log(req.files);
        console.log(req.body);


        await requestController.create(req, res);
        const id = await db.sequelize.query(`SELECT RequestID FROM requests ORDER BY createdAt DESC LIMIT 1;`)
        if (req.body.appType == 'تعديل بيانات المستفيد') {
            await requestController.tenantDataModification(req, res, id);
        }

        if (req.body.appType == 'نقل الاعمدة المعارضة') {
            await requestController.tranferringPoles(req, res, id);
        }

        if (req.body.appType == 'تحويل من تجاري الى منزلي') {
            await requestController.propertyTypeModification(req.res, id);
        }

        // Send a response
        res.json({ message: 'Your Request has been sent successfully' });


    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'An error occurred.' });
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