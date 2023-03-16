import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    },
});

const fileFilter = (req, file, cb) => {
    const fileSize = parseInt(req.headers["content-length"])
    if (file.mimetype.startsWith('image/')) {
        if (fileSize <= 500000) {
            cb(null, true);
        } else {
            cb(new Error('File size exceeds limit'));
        }
    } else {
        cb(new Error('Only images are allowed'));
    }
};

export const upload = multer({
    storage,
    limits: { fileSize: 500000 },
    fileFilter,
}).single('todoImage');