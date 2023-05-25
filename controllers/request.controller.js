import db from "../models/index.js";
import fs from 'fs'



const create = async(req, res) => {

    const type = req.body.appType;
    const status = req.body.appStatus;
    const type_id = await db.RequestType.findOne({
        where: {
            TypeName: type
        },
        attributes: [
            'TypeID'
        ]
    })

    const status_id = await db.RequestStatus.findOne({ attributes: ['StatusID'], where: { StatusName: status } });

    const request = await db.Request.create({
            Reason: req.body.reason,
            ServiceID: req.body.serviceID,
            TypeID: type_id.dataValues.TypeID,
            StatusID: status_id.dataValues.StatusID,
            EmployeeID: req.body.EmployeeID || null,
            ApplicantName: req.body.applicantName,
            ApplicantPhoneNumber: req.body.applicantPhoneNumber,
            Address: req.body.Address

        }).then(data => {
            res.status(201).send({
                message: "Your request has been sent successfully",
                data: data
            })
        })
        // res.send(request)
        // await request.save()


}

const SubscriptionStatus = async(req, res, id) => {
    console.log(req.body);
    console.log(req.body.ElectricianName)
    const request = new db.SubscriptionStatus({
        ElectricianNo: req.body.electricianPhoneNumber,
        ElectricianName: req.body.electricianName,
        ID: id[0][0].RequestID
    });

    res.status(201).send(data);
}

const tenantDataModification = async(req, res, id) => {
    console.log(11);
    console.log(req.files);

    // console.log('رقم طلب تعديل بيانات المستفيد' + id[0][0].RequestID)
    // Get the filenames of the uploaded images
    const filenames = [req.files.userIDImage[0].filename, req.files.beneficiaryIDImage[0].filename];
    console.log(12);

    console.log(filenames); //[ '1681257214059-member-1.png', '1681257214060-29.png' ]

    // Read the image file from the file system
    const userImage = fs.readFileSync(`./uploads/${filenames[0]}`);
    const tenantImage = fs.readFileSync(`./uploads/${filenames[1]}`);
    console.log(13);
    console.log({ userImage, tenantImage });

    // Convert the binary data to a base64-encoded string
    // The purpose is to Send the base64-encoded string to the frontend

    const userImageData = userImage.toString('base64');
    const tenantImageData = tenantImage.toString('base64');
    console.log(14);

    console.log({ userImageData, tenantImageData })
        // Insert the images into the database
    const request = new db.TenantData({
        TenantImage: tenantImageData,
        TenantName: req.body.beneficiaryName,
        CustomerImage: userImageData,
        ID: id[0][0].RequestID
    });
    // res.send(request)
    await request.save()
        .then(data => {
            res.status(201).send({
                message: "Your request has been sent successfully",
                ID: data.ID
            })
        })

}

const transferringPoles = async(req, res, id) => {
    // Get the filenames of the uploaded images
    console.log(req.files);
    const filenames = [req.files.footPrint[0].filename, req.files.locationImage[0].filename];
    console.log(filenames);
    // Read the image file from the file system
    const footprint = fs.readFileSync(`./uploads/${filenames[0]}`);
    const location = fs.readFileSync(`./uploads/${filenames[1]}`);
    console.log({ footprint, location });


    // Convert the binary data to a base64-encoded string
    // The purpose is to Send the base64-encoded string to the frontend
    const footprintData = footprint.toString('base64');
    const locationData = location.toString('base64');
    console.log({ footprintData, locationData });

    // Insert the images into the database
    const request = new db.TransferringPoles({
        Footprint: footprintData,
        LocationOfPole: locationData,
        ID: id[0][0].RequestID
    });
    await request.save()
        .then(data => {
            res.status(201).send({
                message: "Your request has been sent successfully",
                ID: data.ID
            })
        })


}


const findAll = async(req, res) => {
    await db.Request.findAll({
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
                attributes: ['TenantName', 'TenantImage', 'CustomerImage'],
            },
            {
                model: db.TransferringPoles,
                attributes: ['LocationOfPole', 'Footprint'],
            },
            {
                model: db.SubscriptionStatus,
                attributes: ['ElectricianName', 'ElectricianNo'],
            },
            {
                model: db.Service,
                include: [{
                    model: db.Customer,
                    attributes: ['CustomerName', 'id', 'PhoneNumber'],
                }, ],
                attributes: ['ServiceID', 'Address']

            },
        ],
        attributes: ['RequestID', 'Reason', 'createdAt', 'ApplicantName', 'ApplicantPhoneNumber', 'Address'],
        order: ['RequestID']
    }).then(results => {
        res.status(200).send(results); // model is a json object
    })

};

async function getOneRequest(id) {

    const request = await db.Request.findByPk(id)
    return request;
}

const viewRequests = async(req, res, customerID) => {

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
                    model: db.SubscriptionStatus,
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
}


async function UpdateById(req, res) {
    const status = req.body.status;
    const empNum = req.body.EmployeeID; ///////////?
    const status_id = await db.RequestStatus.findOne({ attributes: ['StatusID'], where: { StatusName: status } });
    db.Request.update({
        StatusID: status_id.dataValues.StatusID,
        EmployeeID: empNum
    }, {
        where: { RequestID: req.body.id }
    }).then(result => {
        res.status(202).send(result); // accepted
    })

}


export default {
    create,
    findAll,
    // deleteById,
    getOneRequest,
    SubscriptionStatus,
    tenantDataModification,
    transferringPoles,
    UpdateById,
    viewRequests
}