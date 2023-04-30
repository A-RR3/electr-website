import express from 'express';
import requestController from '../controllers/request.controller.js';
import db from '../models/index.js';
const router = express.Router();
import path from "path";
import Request from "../models/request.model.js";
import multer from "multer";
import { log } from 'console';
import { where } from 'sequelize';


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const Filter = function(req, file, cb) {
    // const allowedTypes = ['image/jpeg', 'image/jpg',, 'image/png'];
    const allowedTypes = ['image/jpeg', 'image/jpg'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type only jpeg images are allowed.'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
    fileFilter: Filter
});

// const logStuff = [logOriginalUrl, logMethod]
// router.post('/sss', (req, res, next) => {
//         console.log('Time:', Date.now());
//         console.log(req.body.formData);
//         next()
//     }, (req, res, next) => {
//         console.log(req.body);
//         res.send('User Info')
//     })

//get all requests
router.get('/', requestController.findAll);


// router.use('/create', uploadImagesMiddleware);
router.use((err, req, res, next) => {
    res.status(400).send(err.message)
});

//create a request
router.post('/create', upload.fields([

    { name: 'reason', maxCount: 1 },
    { name: 'serviceID', maxCount: 1 },
    { name: 'appType', maxCount: 1 },
    { name: 'EmployeeID', maxCount: 1 },
    { name: 'appStatus', maxCount: 1 },
    { name: 'beneficiaryName', maxCount: 1 },
    { name: 'electricianName', maxCount: 1 }, //?
    { name: 'electricianPhoneNumber', maxCount: 1 }, //?
    { name: 'footPrint', maxCount: 1 },
    { name: 'locationImage', maxCount: 1 },
    { name: 'userIDImage', maxCount: 1 },
    { name: 'beneficiaryIDImage', maxCount: 1 },
    { name: 'applicantName', maxCount: 1 },
    { name: 'applicantPhoneNumber', maxCount: 1 },
    { name: 'applicantAddress', maxCount: 1 },


]), async(req, res, next) => {

    try {
        console.log(req.files);
        console.log(req.body);

        await requestController.create(req, res);
        const id = await db.sequelize.query(`SELECT RequestID FROM requests ORDER BY createdAt DESC LIMIT 1;`)
        console.log(id[0][0].RequestID);
        if (req.body.appType == 'تعديل بيانات المستفيد') {
            await requestController.tenantDataModification(req, res, id);
        }

        if (req.body.appType == 'نقل الاعمدة المعارضة') {
            await requestController.transferringPoles(req, res, id);

        }

        if (req.body.appType == 'تحويل من مؤقت الى دائم') {
            await requestController.propertyTypeModification(req, res, id);
        }

        // Send a response
        res.json({ message: 'Your Request has been sent successfully' });


    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'An error occurred.' });
    }
});


//search by customer name
router.post('/searchByName', async(req, res) => {
    const customerName = req.body.customerName;
    console.log(customerName);
    const customerID = await db.sequelize.query(`SELECT CustomerID FROM customers WHERE CustomerName = "${customerName}"`);
    console.log(customerID);
    console.log(customerID[0][0].CustomerID);

    try {
        const req = await db.Request.findAll({
            include: [{
                    model: db.RequestStatus,
                    attributes: ['StatusName'],
                },
                {
                    model: db.RequestType,
                    attributes: ['TypeName'],
                },
                {
                    model: db.TenantData,
                    attributes: ['TenantName'],
                },
                {
                    model: db.TransferringPoles,
                    attributes: ['LocationOfPole', 'Footprint'],
                },
                {
                    model: db.PropertyType,
                    attributes: ['ElectricianName', 'ElectricianNo'],
                },
                {
                    model: db.Service,
                    where: {
                        CustomerID: customerID[0][0].CustomerID
                    },
                    include: [{
                        model: db.Customer,
                        attributes: ['CustomerName', 'id', 'PhoneNumber'],
                    }, ],
                    attributes: ['ServiceID', 'Address']

                },
            ],
            attributes: ['RequestID', 'Reason', 'createdAt', ],
            order: ['RequestID']

        })
        res.status(200).send(req);
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

router.put('/', async(req, res) => {
    try {
        console.log(req.body);
        requestController.UpdateById(req, res);

    } catch (error) {
        res.status(404).send(error); //not found
    }
})
export default router;