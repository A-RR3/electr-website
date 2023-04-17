import { Sequelize } from "sequelize";
import db from "../models/index.js";



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

    const request = new db.Request({
        Reason: req.body.reason,
        ServiceID: req.body.serviceID,
        TypeID: type_id.dataValues.TypeID,
        StatusID: status_id.dataValues.StatusID,
        EmployeeID: req.body.EmployeeID || null,

    });

    await request.save();

}

const propertyTypeModification = async(req, res, id) => {
    console.log(req.body);
    console.log(req.body.ElectricianName)
    await db.PropertyType.create({
        ElectricianNo: req.body.electricianNo,
        ElectricianName: req.body.ElectricianName,
        RequestID: id[0][0].RequestID
    })

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
        })
        // .then(data => {
        //     res.status(201).send(data);
        // })
        // .catch(err => {
        //     res.status(500).send(err.message || "Something went wrong");
        // });
}

const transferringPoles = async(req, res, id) => {
    // Get the filenames of the uploaded images
    const filenames = [req.files.Footprint[0].filename, req.files.LocationOfPole[0].filename];

    // Insert the images into the database
    await db.TransferringPoles.create({
            Footprint: filenames[0],
            LocationOfPole: filenames[1],
            RequestID: id[0][0].RequestID
        })
        // .then(data => {
        //     res.status(201).send(data);
        // })
        // .catch(err => {
        //     res.status(500).send(err.message || "Something went wrong");
        // });
}


const findAll = async(req, res) => {
    // db.Request.findAll({
    //         include: [db.Customer, db.RequestType, db.RequestStatus, db.PropertyType, db.TransferringPoles, db.TenantData],
    //         attributes: ['RequestID', 'Reason', 'createdAt', 'CustomerName', 'RequestType', 'RequestStatus'],
    //     })
    // let services = await db.Service.findAll({
    //     include: [{
    //         model: db.Customer,
    //         attributes: ['CustomerName'],
    //     }, ]
    // });
    // req.services = services;
    // console.log(req.services);
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
                    include: [{
                        model: db.Customer,
                        attributes: ['CustomerName', 'id', 'PhoneNumber'],
                    }, ],
                    attributes: ['ServiceID', 'Address']

                },
            ],
            attributes: ['RequestID', 'Reason', 'createdAt', ],
            order: ['RequestID']
        }).then(results => {
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

async function UpdateById(req, res) {
    const status = req.body.status;
    const status_id = await db.RequestStatus.findOne({ attributes: ['StatusID'], where: { StatusName: status } });
    db.Request.update({
            StatusID: status_id.dataValues.StatusID
        }, {
            where: { RequestID: req.body.id }
        }).then(result => {
            res.status(202).send(result); // accepted
        })
        .catch(err => {
            res.status(500).send(err.message || "Something went wrong");
        });
}


export default {
    create,
    findAll,
    deleteById,
    getOneRequest,
    propertyTypeModification,
    tenantDataModification,
    transferringPoles,
    UpdateById
}