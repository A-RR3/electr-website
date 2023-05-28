import express from 'express';
import requestController from '../controllers/request.controller.js';
import db from '../models/index.js';
const router = express.Router();
import imageExtractor from '../middleware/imageMiddleware.js';


const upload = imageExtractor();


//get all requests
router.get('/', requestController.findAll);


//create a request
router.post('/create', upload.fields([
    { name: 'reason', maxCount: 1 },
    { name: 'serviceID', maxCount: 1 },
    { name: 'appType', maxCount: 1 },
    { name: 'EmployeeID', maxCount: 1 },
    { name: 'appStatus', maxCount: 1 },
    { name: 'beneficiaryName', maxCount: 1 },
    { name: 'electricianName', maxCount: 1 },
    { name: 'electricianPhoneNumber', maxCount: 1 },
    { name: 'footPrint', maxCount: 1 },
    { name: 'locationImage', maxCount: 1 },
    { name: 'userIDImage', maxCount: 1 },
    { name: 'beneficiaryIDImage', maxCount: 1 },
    { name: 'applicantName', maxCount: 1 },
    { name: 'applicantPhoneNumber', maxCount: 1 },
    { name: 'Address', maxCount: 1 },
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
            await requestController.SubscriptionStatus(req, res, id);
        }

        // Send a response
        // res.json({ message: 'Your Request has been sent successfully' });


    } catch (e) {
        console.log(e);
        // res.status(500).json({ message: 'An error occurred.' });
    }
});


//search by customer name
router.post('/searchByName', async(req, res) => {
    const customerName = req.body.customerName;
    console.log(customerName);
    const customerID = await db.sequelize.query(`SELECT CustomerID FROM customers WHERE CustomerName = "${customerName}"`);
    console.log(customerID);
    // if (customerID[0][0].CustomerID == undefined) {
    //     res.sendStatus(404);
    //     return;
    // }
    console.log(customerID[0][0].CustomerID);

    await requestController.viewRequests(req, res, customerID).then(data => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err.message || "Something went wrong");
    })
});


router.put('/', async(req, res) => {
    try {
        let serviceId = req.body.serviceId;
        console.log(req.body);
        if (req.body.status === 'منتهي') {
            if (req.body.requestType == 'تحويل من فاتورة الى كرت') {
                console.log(serviceId);
                await requestController.changeToCard(req, res, serviceId);
            }
            if (req.body.requestType == 'تحويل من تجاري الى منزلي') {
                console.log(serviceId);
                await requestController.propertyType(req, res, serviceId);

            }
            if (req.body.requestType == 'تحويل من مؤقت الى دائم') {
                console.log('equals');
                console.log(serviceId);
                await db.Service.update({ SubscriptionStatus: 'دائم' }, {
                        where: {
                            ServiceID: serviceId
                        }
                    })
                    .then(data => console.log(data)).catch(e => { console.log(e); })
            }

        }
        console.log(222);

        await requestController.UpdateById(req, res)
            .then(res.sendStatus(200)).catch(e => { console.log(e); })

    } catch (error) {
        res.status(404).send(error); //not found
    }
});
export default router;