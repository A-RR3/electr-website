import db from "../models/index.js";
import Request from "../models/request.model.js";


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

    const status_id = await db.RequestStatus.findOne({ attributes: ['StatusID'], where: { StatusName: status } })

    const request = new db.Request({
        Reason: req.body.reason,
        ServiceID: req.body.serviceID,
        // TypeID: type_id.dataValues.TypeID,
        TypeID: type_id.dataValues.TypeID,
        StatusID: status_id.dataValues.StatusID,
        EmployeeID: req.body.EmployeeID || null,

    });


    // console.log(status_id.dataValues.StatusID);
    console.log(status_id);

    console.log(type_id);
    console.log(request.dataValues);

    request.save()
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send(err.message || "Something went wrong");
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


export default {
    create,
    findAll,
    deleteById,
    getOneRequest
}