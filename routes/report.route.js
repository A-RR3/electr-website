import express from 'express';
// import reportController from '../controllers/report.controller.js';
const router = express.Router();
import imageExtractor from '../middleware/imageMiddleware.js';


const upload = imageExtractor();


router.post('/', upload.fields([
    { name: 'image', maxCount: 1 },
]), async(req, res) => {
    try {
        // await reportController.addReport(req, res);

    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'server error occurred.' });
    }

});

export default router;