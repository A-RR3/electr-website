import db from "../models/index.js";
import { Op } from "sequelize";

const create = (req, res) => {

    if (!req.body.CustomerName || !req.body.PhoneNumber || req.body.PlaceOfResidence) {
        res.status(400).send({
            'msg': 'Please Fill All The Fields'
        })
    }
    //create class from model and save it to db
    const customer = new db.Customer({
        CustomerID: req.body.CustomerID,
        CustomerName: req.body.CustomerName || 0, // or 0 because i haven't include it in the validation
        PhoneNumber: req.body.PhoneNumber || 0,
        PlaceOfResidence: req.body.PlaceOfResidence,
    });

    customer.save()
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send(err.message || "Something went wrong");
        });
};

const findAll = (req, res) => {
    db.Customer.findAll()
        .then(results => {
            res.status(200).send(results); // model is a json object
        })
        .catch(err => {
            res.status(500).send(err.message || "Something went wrong");
        });
};

const deleteById = (req, res) => {
    db.Customer.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.status(203).send();
        })
        .catch(err => {
            res.status(500).send(err.message || "Something went wrong");
        });
}

export default {
    create,
    findAll,
    deleteById
}