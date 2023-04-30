import { Sequelize, DataTypes } from "sequelize";
import db from "../models/index.js";
// const fs = require('fs');
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

    const request = new db.Request({
        Reason: req.body.reason,
        ServiceID: req.body.serviceID,
        TypeID: type_id.dataValues.TypeID,
        StatusID: status_id.dataValues.StatusID,
        EmployeeID: req.body.EmployeeID || null,
        ApplicantName: req.body.applicantName,
        ApplicantPhoneNumber: req.body.applicantPhoneNumber,
        ApplicantAddress: req.body.applicantAddress

    });

    await request.save();

}

const propertyTypeModification = async(req, res, id) => {
    console.log(req.body);
    console.log(req.body.ElectricianName)
    await db.PropertyType.create({
        ElectricianNo: req.body.electricianPhoneNumber,
        ElectricianName: req.body.electricianName,
        RequestID: id[0][0].RequestID
    })

}

const tenantDataModification = async(req, res, id) => {
    // console.log('رقم طلب تعديل بيانات المستفيد' + id[0][0].RequestID)
    // Get the filenames of the uploaded images
    const filenames = [req.files.userIDImage[0].filename, req.files.beneficiaryIDImage[0].filename];
    console.log(filenames); //[ '1681257214059-member-1.png', '1681257214060-29.png' ]

    // Read the image file from the file system
    const userImage = fs.readFileSync(`./uploads/${filenames[0]}`);
    const tenantImage = fs.readFileSync(`./uploads/${filenames[1]}`);
    console.log({ userImage, tenantImage });

    // Convert the binary data to a base64-encoded string
    // The purpose is to Send the base64-encoded string to the frontend

    const userImageData = userImage.toString('base64');
    const tenantImageData = tenantImage.toString('base64');
    console.log({ userImageData, tenantImageData })
        // Insert the images into the database
    await db.TenantData.create({
            TenantImage: tenantImageData,
            TenantName: req.body.beneficiaryName,
            CustomerImage: userImageData,
            RequestID: id[0][0].RequestID
        })
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send(err.message || "Something went wrong");
        });


}

const transferringPoles = async(req, res, id) => {
    // Get the filenames of the uploaded images
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
    await db.TransferringPoles.create({
            Footprint: footprintData,
            LocationOfPole: locationData,
            RequestID: id[0][0].RequestID
        })
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send(err.message || "Something went wrong");
        });

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
                    attributes: ['TenantName', 'TenantImage', 'CustomerImage'],
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
            attributes: ['RequestID', 'Reason', 'createdAt', 'ApplicantName', 'ApplicantPhoneNumber', 'ApplicantAddress'],
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

// async function deleteById(req, res, id) {
//     const request = await getOneRequest(id);
//     if (request) {
//         request.destroy().then(_ => {
//                 res.status.sent(200).send({
//                     'message': 'request deleted'
//                 })
//             })
//             .catch(err => res.status(400).send(err)); //bad request

//     } else {
//         res.status(404).send({
//             'message': 'request not found'
//         });
//     }
// }

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
    // deleteById,
    getOneRequest,
    propertyTypeModification,
    tenantDataModification,
    transferringPoles,
    UpdateById
}