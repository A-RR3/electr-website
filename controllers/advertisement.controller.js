import db from "../models/index.js";
import fs from 'fs'


const addAdvertisement = async(req, res) => {

    // Get the filename of the uploaded image
    const filename = req.files.image[0].filename
    const coverImg = req.files.coverImage[0].filename
    console.log(filename);

    // Read the image file from the file system
    const image = fs.readFileSync(`./uploads/${filename}`);
    const coverimage = fs.readFileSync(`./uploads/${coverImg}`);

    console.log({ image, coverimage });


    // Convert the binary data to a base64-encoded string
    // The purpose is to Send the base64-encoded string to the frontend
    const imageData = image.toString('base64');
    const coverimageData = coverimage.toString('base64');


    const report = db.Report.build({
        title: req.body.title,
        body: req.body.body,
        image: imageData,
        EmployeeID: req.body.EmployeeID,
        coverImage: coverimageData
    }).then(
        await employee.save().then(
            res.status(201).send({ 'message': 'Advertisement Added Successfuly' })
        )
    ).catch(err => {
        res.status(500).send(err.message || "Something went wrong");
    })
}

export default {
    addAdvertisement
}