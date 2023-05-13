import express from 'express';
// import reportController from '../controllers/report.controller.js';
const router = express.Router();


import multer from "multer";


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
    // fileFilter: Filter
});




router.post('/', upload.fields([
    { name: 'pdfReport', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
]), async(req, res) => {
    try {
        // await reportController.addReport(req, res);

    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'server error occurred.' });
    }

});

export default router;