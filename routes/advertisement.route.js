import express from 'express';
import advertisementController from '../controllers/advertisement.controller.js';
const router = express.Router();
import imageExtractor from '../middleware/imageMiddleware.js';


const upload = imageExtractor();
console.log(upload);


router.post('/', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },

]), async(req, res) => {
    try {
        console.log(req.files)
        await advertisementController.addAdvertisement(req, res);

    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'server error occurred.' });
    }

});

router.get('/', async(req, res) => {
    await advertisementController.viewAdvertisement(req, res).then(data => {
        res.status(200).send(data)
    })
})

export default router;