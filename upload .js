const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Upload files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Initialize upload
const upload = multer({
  storage,
  limits: { fileSize: 1000000 }, // 1MB file size limit
}).single('file');

router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: 'File upload failed', error: err });
    }
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Here you can save the file details to your database if needed
    const file = {
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
    };

    // Send back a success response
    res.status(200).json({ message: 'File uploaded successfully', file });
  });
});

module.exports = router;
