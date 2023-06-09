import db from "../models/index.js";
import fs from 'fs'


const addReport = async(req, res) => {

    // Get the filename of the uploaded image
    const coverImg = req.files.coverImage[0].filename
        // console.log(filename);

    // Read the image file from the file system
    const coverimage = fs.readFileSync(`./uploads/${coverImg}`);

    // Convert the binary data to a base64-encoded string
    // The purpose is to Send the base64-encoded string to the frontend
    const coverimageData = coverimage.toString('base64');


    const report = db.Report.create({
        title: req.body.title,
        pdf: req.body.pdfReport,
        coverImage: coverimageData,
        EmployeeID: req.body.empNum,
    }).then(
        res.status(201).send({ 'message': 'Report Added Successfuly' })
    ).catch(err => {
        console.log(err.message || "Something went wrong");

    })
}


const viewReport = async(req, res) => {
    const reports = await db.Report.findAll()
    return reports
}
export default {
    addReport,
    viewReport
}