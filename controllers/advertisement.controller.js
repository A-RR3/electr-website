import db from "../models/index.js";
import fs from 'fs'


const addAdvertisement = async(req, res) => {
    console.log(req.files);
    // Get the filename of the uploaded image
    const filename = req.files.image[0].filename
    const coverImg = req.files.coverImage[0].filename
    console.log(filename, coverImg);

    // Read the image file from the file system
    const image = fs.readFileSync(`./uploads/${filename}`);
    const coverimage = fs.readFileSync(`./uploads/${coverImg}`);

    console.log({ image, coverimage });


    // Convert the binary data to a base64-encoded string
    // The purpose is to Send the base64-encoded string to the frontend
    const imageData = image.toString('base64');
    const coverimageData = coverimage.toString('base64');

    const report = db.Advertisement.create({
        title: req.body.title,
        body: req.body.body,
        image: imageData,
        coverImage: coverimageData,
        EmployeeID: req.body.empNum,
    }).then(
        res.status(201).send({ 'message': 'Advertisement Added Successfuly' })
    ).catch(err => {
        console.log(err.message || "Something went wrong");
    })
}

const viewAdvertisement = async(req, res) => {
    const news = await db.Advertisement.findAll()
    return news
}
export default {
    addAdvertisement,
    viewAdvertisement
}