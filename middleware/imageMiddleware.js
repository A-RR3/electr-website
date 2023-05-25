import multer from "multer";

export default function imageExtractor() {

    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'uploads');
        },
        filename: function(req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });

    const Filter = function(req, file, cb) {
        // const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type '));
        }
    };

    const upload = multer({
        storage: storage,
        limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
        fileFilter: Filter
    });

    return upload
}