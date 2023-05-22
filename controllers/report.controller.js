import db from "../models/index.js";
import fs from 'fs'


const addReport = async(req, res) => {

    // Get the filename of the uploaded image
    const filename = req.files.pdfReport[0].filename
    const coverImg = req.files.coverImage[0].filename
    console.log(filename);

    // Read the image file from the file system
    const pdf = fs.readFileSync(`./uploads/${filename}`);
    const coverimage = fs.readFileSync(`./uploads/${coverImg}`);

    console.log({ pdf, coverimage });


    // Convert the binary data to a base64-encoded string
    // The purpose is to Send the base64-encoded string to the frontend
    const coverimageData = coverimage.toString('base64');


    const report = db.Report.create({
        title: req.body.title,
        pdf: pdf,
        coverImage: coverimageData,
        EmployeeID: req.body.EmployeeID,
    }).then(
        res.status(201).send({ 'message': 'Report Added Successfuly' })
    ).catch(err => {
        console.log(err.message || "Something went wrong");

    })
}

export default {
    addReport
}