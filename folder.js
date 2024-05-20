const express = require('express');
const router = express.Router();
const app = express();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { exec } = require('child_process');
const user = require('./authorize');


app.use('/auth',user);
let folderCounter = 0;
const folders = [];

// Storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const documentFolderCode = req.body.documentFolderCode;
    const uploadPath = path.join(__dirname, 'uploads', documentFolderCode);
    // Create folder if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Define upload outside of storage configuration
const upload = multer({ storage: storage });

const uploadsDir = path.join(__dirname, 'uploads');
const createDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};
createDirectory(uploadsDir);

// POST endpoint to upload a document into a folder
router.post('/upload-document', upload.single('documentFile'), (req, res) => {
  console.log('Request body:', req.body);
  console.log('Request headers:', req.headers);
  const documentName = req.body.documentName;
  const documentSummary = req.body.documentSummary;
  const documentFolderCode = req.body.documentFolderCode;

  console.log('Received document folder code:', documentFolderCode);

  if (!documentName || !documentSummary || !documentFolderCode || !req.file) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const responseData = {
    message: 'Document uploaded successfully',
    document: {
      name: documentName,
      summary: documentSummary,
      folderCode: documentFolderCode, // Including the folder code in the response
      file: req.file.path,
    }
  };
  console.log('Upload response data:', responseData);
  return res.status(200).json(responseData);
});

// POST endpoint to create a new folder
router.post('/create-folder', async (req, res) => {
  console.log('Request body:', req.body);

  const { folderName, assignedUser } = req.body;

  if (!folderName || !assignedUser) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newFolderCode = `F${(++folderCounter).toString().padStart(3, '0')}`;
    const newFolderPath = `uploads/${newFolderCode}`;
    fs.mkdirSync(newFolderPath, { recursive: true });
    const newFolder = {
      id: folders.length + 1,
      folderCode: newFolderCode,
      folderName,
      assignedUser,
      state: 'Pending'
    };
    folders.push(newFolder);
    res.json({ message: 'Folder created successfully', folder: newFolder });
    console.log(folders);
  } catch (error) {
    console.error('Error creating folder:', error);
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
});
router.get('/folders/user/:userId', async (req, res) => {
  const userId = req.params.userId;
 
  try {
    const userFolders = folders.filter(folder => folder.assignedUser === userId);
   
    if (userFolders.length === 0) {
      return res.status(404).json({ message: 'No folders found for the user' });
    }
 
    res.json(userFolders);
  } catch (error) {
    console.error('Error fetching folders:', error);
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
}); 

// Route to fetch documents for a specific folder
router.get('/folders/:folderCode/documents', (req, res) => {
  const folderCode = req.params.folderCode;
  const folderPath = path.join(__dirname, 'uploads', folderCode);

  // Check if the folder exists
  if (!fs.existsSync(folderPath)) {
    return res.status(404).json({ error: 'Folder not found' });
  }

  // Read the files in the folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading folder contents:', err);
      return res.status(500).json({ error: 'An error occurred while reading folder contents' });
    }

    // Map files to a format suitable for the client
    const documents = files.map((file) => ({
      name: file,
      folderCode: folderCode,
      path: path.join(folderPath, file), // Include the full path for downloading
    }));

    res.json(documents);
  });
});

// Route to fetch all folders
router.get('/folders', (req, res) => {
  try {
    res.json(folders);
  } catch (error) {
    console.error('Error fetching folders:', error);
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
});

// Serve uploaded files statically
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Other routes...

module.exports = router;
