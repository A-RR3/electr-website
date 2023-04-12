import db from "../models/index.js";


const create = async(req, res) => {
    const type = req.body.appType;
    console.log(req.body);
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

    const request = new db.Request({
        Reason: req.body.reason,
        ServiceID: req.body.serviceID,
        TypeID: type_id.dataValues.TypeID,
        StatusID: status_id.dataValues.StatusID,
        EmployeeID: req.body.EmployeeID || null,

    });

    await request.save();
    // .then(data => {
    //     res.status(201).send(data);
    // })
    // .catch(err => {
    //     res.status(500).send(err.message || "Something went wrong");
    // });
}

const propertyTypeModification = async(req, res, id) => {
    await db.PropertyType.create({
        ElectricianName: req.body.electricianName,
        ElectricianNo: req.body.electricianPhoneNumber,
        RequestID: id[0][0].RequestID
    });

}

const tenantDataModification = async(req, res, id) => {
    console.log(id[0][0].RequestID)
        // Get the filenames of the uploaded images
    const filenames = [req.files.userIDImage[0].filename, req.files.beneficiaryIDImage[0].filename];
    // console.log(filenames);[ '1681257214059-member-1.png', '1681257214060-29.png' ]

    // Insert the images into the database
    await db.TenantData.create({
        TenantImage: filenames[0],
        TenantName: req.body.beneficiaryName,
        CustomerImage: filenames[1],
        RequestID: id[0][0].RequestID
    });
}

const transferringPoles = async(req, res, id) => {
    // Get the filenames of the uploaded images
    const filenames = [req.files.footPrintImage[0].filename, req.files.locationImage[0].filename];

    // Insert the images into the database
    await db.TransferringPoles.create({
        Footprint: filenames[0],
        LocationOfPole: filenames[1],
        RequestID: id[0][0].RequestID
    });
}


const findAll = (req, res) => {
    db.Request.findAll()
        .then(results => {
            res.status(200).send(results); // model is a json object
        })
        .catch(err => {
            res.status(500).send(err.message || "Something went wrong");
        });
};

async function getOneRequest(id) {

    const request = await db.Request.findByPk(id)
    return request;
}

async function deleteById(req, res, id) {
    const request = await getOneRequest(id);
    if (request) {
        request.destroy().then(_ => {
                res.status.sent(200).send({
                    'message': 'request deleted'
                })
            })
            .catch(err => res.status(400).send(err)); //bad request

    } else {
        res.status(404).send({
            'message': 'request not found'
        });
    }
}



// Define the image upload middleware function
const uploadImagesMiddleware = (req, res, next) => {
    upload.array('images')(req, res, err => {
        if (err) {
            return res.status(400).json({ error: 'An error occurred while uploading the images.' });
        }
        next();
    });
};

export default {
    create,
    findAll,
    deleteById,
    getOneRequest,
    propertyTypeModification,
    tenantDataModification,
    transferringPoles
}