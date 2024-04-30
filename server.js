
// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const cors = require('cors');
// const bcrypt = require('bcrypt');

// const PORT = process.env.PORT || 3001;

// app.use(bodyParser.json());
// app.use(cors());


// const users = [];


// app.post('/signup', async (req, res) => {
//   const { email, mobile, password, isAdmin } = req.body;

//   if ((!email && !mobile) || !password) {
//     return res.status(400).json({ error: 'Email/Mobile and password are required' });
//   }

//   const existingUser = users.find(u => u.email === email || u.mobile === mobile);
//   if (existingUser) {
//     return res.status(400).json({ error: 'User already exists' });
//   }
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    
//     const role = isAdmin ? 'admin' : 'user';
//     const newUser = { id: users.length + 1, email, mobile, password: hashedPassword, role };
//     users.push(newUser);
  
//     const message = isAdmin ? 'Admin created successfully. Please SignIn' : 'User signed up successfully. Please SignIn';
//     res.json({ message });
//   } catch (error) {
//     console.error('Error hashing password:', error);
//     res.status(500).json({ error: 'An error occurred. Please try again later.' });
//   }
// });


// app.post('/signin', async (req, res) => {
//   const { emailOrMobile, password } = req.body;
 
//   if (!emailOrMobile || !password) {
//     return res.status(400).json({ error: 'Email/Mobile and password are required' });
//   }

//   const user = users.find(u => (u.email === emailOrMobile || u.mobile === emailOrMobile));
//   if (!user) {
//     return res.status(401).json({ error: 'Invalid credentials' });
//   }
//   try {
  
//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       console.error('Password comparison failed');
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }
 
//     res.json({ message: 'Sign in successful', userType: user.role });
//   } catch (error) {
//     console.error('Error comparing passwords:', error);
//     res.status(500).json({ error: 'An error occurred. Please try again later.' });
//   }
// });


// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });





//Main

// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const session = require('express-session');

// const PORT = process.env.PORT || 3002;

// app.use(bodyParser.json());
// app.use(cors());
// app.use(session({
//   secret: 'your_secret_key_here', // Replace with your secret key
//   resave: false,
//   saveUninitialized: false
// }));

// const users = [
//   { id: 1, name: 'Admin', email: 'admin@gmail.com', mobile: '9876543210', password: '$2a$12$gp.ykYqaMzFMLKZ4hg9P0.TNXjsIgl6peOG/m9f81htTKKVPZsGdK', role: 'admin' },
//   { id: 2, name: 'User', email: 'user@gmail.com', mobile: '1234567890', password: '$2a$12$7aV19zPKEOJOQ.v6x3EjkOiF0OkTWRxoxhzgxWCIU0O8rx0136x0C', role: 'user' },
// ];

// const projects = [
//   // { id: 1, projectName: 'Project 1', projectOwner: 'user1', ownersNumber: '1234567890', projectLocation: 'Location 1', otherDetails: 'Details 1' },
//   // { id: 2, projectName: 'Project 2', projectOwner: 'user2', ownersNumber: '9876543210', projectLocation: 'Location 2', otherDetails: 'Details 2' },
//   // { id: 3, projectName: 'Project 3', projectOwner: 'user1', ownersNumber: '5678901234', projectLocation: 'Location 3', otherDetails: 'Details 3' },
// ];

// app.get('/users', (req, res) => {
//   res.json(users);
// });

// app.post('/signup', async (req, res) => {
//   const { name, email, mobile, password, isAdmin } = req.body;

//   if ((!email && !mobile) || !password || !name) {
//     return res.status(400).json({ error: 'Email/Mobile and password are required' });
//   }

//   const existingUser = users.find(u => u.email === email || u.mobile === mobile);
//   if (existingUser) {
//     return res.status(400).json({ error: 'User already exists' });
//   }
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    
//     const role = isAdmin ? 'admin' : 'user';
//     const newUser = { id: users.length + 1,name, email, mobile, password: hashedPassword, role };
//     users.push(newUser);
  
//     const message = isAdmin ? 'Admin created successfully. Please SignIn' : 'User signed up successfully. Please SignIn';
//     res.json({ message });
//   } catch (error) {
//     console.error('Error hashing password:', error);
//     res.status(500).json({ error: 'An error occurred. Please try again later.' });
//   }
// });


// app.post('/signin', async (req, res) => {
//   const { emailOrMobile, password } = req.body;

//   if (!emailOrMobile || !password) {
//     return res.status(400).json({ error: 'Email/Mobile and password are required' });
//   }

//   const user = users.find(u => (u.email === emailOrMobile || u.mobile === emailOrMobile));
//   if (!user) {
//     return res.status(401).json({ error: 'Invalid credentials' });
//   }
//   try {
  
//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       console.error('Password comparison failed');
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }
 
//     res.json({ message: 'Sign in successful', userId: user.id, userType: user.role }); // Include user ID in the response
//   } catch (error) {
//     console.error('Error comparing passwords:', error);
//     res.status(500).json({ error: 'An error occurred. Please try again later.' });
//   }
// });


// let projectCounter = 0; // Counter for auto-incrementing project code

// app.post('/create-project', async (req, res) => {
//   const { projectName, ownerName, contact, emailAddress, locationDetails, projectAssignee, otherDetails } = req.body;

//   if (!projectName || !ownerName || !contact || !emailAddress || !locationDetails || !projectAssignee || !otherDetails) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   try {
//     const projectCode = `P${(++projectCounter).toString().padStart(4, '0')}`; // 4-digit auto-incrementing project code
//     const project = {
//       id: projects.length + 1,
//       projectCode,
//       projectName,
//       ownerName,
//       contact,
//       emailAddress,
//       locationDetails,
//       projectAssignee,
//       otherDetails,
//       state: 'Pending'
//     };
//     projects.push(project);
//     res.json({ message: 'Project created successfully', project });
//   } catch (error) {
//     console.error('Error creating project:', error);
//     res.status(500).json({ error: 'An error occurred. Please try again later.' });
//   }
// });

// app.get('/projects/:userId', async (req, res) => {
//   const userId = req.params.userId; // Get the user ID from the request parameters
  
//   try {
//     // Filter projects based on the project owner's ID
//     const userProjects = projects.filter(project => project.ownerName === userId);
    
//     res.json(userProjects);
//     console.log("Projects fetched");
//   } catch (error) {
//     console.error('Error fetching projects:', error);
//     res.status(500).json({ error: 'An error occurred. Please try again later.' });
//   }
// });
// app.put('/update-project-state/:projectId', async (req, res) => {
//   const projectId = req.params.projectId;
//   const { state } = req.body;

//   try {
//     const projectIndex = projects.findIndex(project => project.id === parseInt(projectId));
//     if (projectIndex === -1) {
//       return res.status(404).json({ error: 'Project not found' });
//     }

//     projects[projectIndex].state = state;
//     res.json({ message: 'Project state updated successfully' });
//   } catch (error) {
//     console.error('Error updating project state:', error);
//     res.status(500).json({ error: 'An error occurred. Please try again later.' });
//   }
// });
// app.get('/admin-dashboard', (req, res) => {
//   try {
//     let inProgress = 0;
//     let completed = 0;
//     let overdue = 0;

//     projects.forEach(project => {
//       switch (project.state) {
//         case 'InProgress':
//           inProgress++;
//           break;
//         case 'Completed':
//           completed++;
//           break;
//         case 'Overdue':
//           overdue++;
//           break;
//         default:
//           break;
//       }
//     });

//     const total = projects.length;

//     res.json({ inProgress, completed, overdue, total });
//   } catch (error) {
//     console.error('Error fetching project stats:', error);
//     res.status(500).json({ error: 'An error occurred. Please try again later.' });
//   }
// });

// app.get('/projects', (req, res) => {
//   try {
    

//     console.log('All Projects:', projects); // Log all projects// Log all projects
    
//     const adminProjects = projects.filter(
//       (project) => project.projectAssignee.toLowerCase() === 'admin'
//     );
//     res.json(adminProjects);
//     console.log('Admin Projects fetched');
//   } catch (error) {
//     console.error('Error fetching admin projects:', error);
//     res.status(500).json({ error: 'An error occurred. Please try again later.' });
//   }
// });



// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });




const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
 
const PORT = process.env.PORT || 3002;
 
app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: 'your_secret_key_here', 
  resave: false,
  saveUninitialized: false
}));

 
const users = [
  { id: 1, name: 'Superadmin', email: 'superadmin@gmail.com', mobile: '9086867780', password: '$2a$12$8nPZAz/Fv7trI9xq1yPBX.2My38fDB3rPkOJm4oNNEDTGDmkxH4oK', role: 'superadmin' },
  { id: 2, name: 'Admin', email: 'admin@gmail.com', mobile: '9876543210', password: '$2a$12$gp.ykYqaMzFMLKZ4hg9P0.TNXjsIgl6peOG/m9f81htTKKVPZsGdK', role: 'admin' },
  { id: 3, name: 'User', email: 'user@gmail.com', mobile: '1234567890', password: '$2a$12$7aV19zPKEOJOQ.v6x3EjkOiF0OkTWRxoxhzgxWCIU0O8rx0136x0C', role: 'user' },
];
 
const projects = [
  // { id: 1, projectName: 'Project 1', projectOwner: 'user1', ownersNumber: '1234567890', projectLocation: 'Location 1', otherDetails: 'Details 1' },
  // { id: 2, projectName: 'Project 2', projectOwner: 'user2', ownersNumber: '9876543210', projectLocation: 'Location 2', otherDetails: 'Details 2' },
  // { id: 3, projectName: 'Project 3', projectOwner: 'user1', ownersNumber: '5678901234', projectLocation: 'Location 3', otherDetails: 'Details 3' },
];
const Document = []
 
app.get('/users', (req, res) => {
  res.json(users);
});
 
app.post('/signup', async (req, res) => {
  const { name, email, mobile, password, isAdmin } = req.body;
 
  if ((!email && !mobile) || !password || !name) {
    return res.status(400).json({ error: 'Email/Mobile and password are required' });
  }
 
  const existingUser = users.find(u => u.email === email || u.mobile === mobile);
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10); 
   
    const role = isAdmin ? 'admin' : 'user';
    const newUser = { id: users.length + 1,name, email, mobile, password: hashedPassword, role };
    users.push(newUser);
 
    const message = isAdmin ? 'Admin created successfully. Please SignIn' : 'User signed up successfully. Please SignIn';
    res.json({ message });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
});
 
 
app.post('/signin', async (req, res) => {
  const { emailOrMobile, password } = req.body;
 
  if (!emailOrMobile || !password) {
    return res.status(400).json({ error: 'Email/Mobile and password are required' });
  }
 
  const user = users.find(u => (u.email === emailOrMobile || u.mobile === emailOrMobile));
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  try {
 
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.error('Password comparison failed');
      return res.status(401).json({ error: 'Invalid credentials' });
    }
 
    res.json({ message: 'Sign in successful', userId: user.id, userType: user.role }); 
  } catch (error) {
    console.error('Error comparing passwords:', error);
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
});
 
 
let projectCounter = 0; 
 
app.post('/create-project', async (req, res) => {
  const { projectName, ownerName, contact, emailAddress, locationDetails, projectAssignee, otherDetails } = req.body;
 
  if (!projectName || !ownerName || !contact || !emailAddress || !locationDetails || !projectAssignee || !otherDetails) {
    return res.status(400).json({ error: 'All fields are required' });
  }
 
  try {
    const projectCode = `P${(++projectCounter).toString().padStart(4, '0')}`; 
    const project = {
      id: projects.length + 1,
      projectCode,
      projectName,
      ownerName,
      contact,
      emailAddress,
      locationDetails,
      projectAssignee,
      otherDetails,
      state: 'Pending'
    };
    projects.push(project);
    res.json({ message: 'Project created successfully', project });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
});
 
app.get('/projects/:userId', async (req, res) => {
  const userId = req.params.userId; 
 
  try {
    const userProjects = projects.filter(project => project.ownerName === userId);
   
    res.json(userProjects);
    console.log("Projects fetched");
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
});
app.put('/update-project-state/:projectId', async (req, res) => {
  const projectId = req.params.projectId;
  const { state } = req.body;
 
  try {
    const projectIndex = projects.findIndex(project => project.id === parseInt(projectId));
    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }
 
    projects[projectIndex].state = state;
    res.json({ message: 'Project state updated successfully' });
  } catch (error) {
    console.error('Error updating project state:', error);
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
});
app.get('/admin-dashboard', (req, res) => {
  try {
    let inProgress = 0;
    let completed = 0;
    let overdue = 0;
 
    projects.forEach(project => {
      switch (project.state) {
        case 'InProgress':
          inProgress++;
          break;
        case 'Completed':
          completed++;
          break;
        case 'Overdue':
          overdue++;
          break;
        default:
          break;
      }
    });
 
    const total = projects.length;
 
    res.json({ inProgress, completed, overdue, total });
  } catch (error) {
    console.error('Error fetching project stats:', error);
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
});
 
app.get('/projects', (req, res) => {
  try {
   
 
    console.log('All Projects:', projects); 
   
    const adminProjects = projects.filter(
      (project) => project.projectAssignee.toLowerCase() === 'admin'
    );
    res.json(adminProjects);
    console.log('Admin Projects fetched');
  } catch (error) {
    console.error('Error fetching admin projects:', error);
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
});
 
 
let folderCounter = 0; 
const folders = []; 
 
app.post('/create-folder', async (req, res) => {
  console.log('Request body:', req.body);
 
  const { folderName, assignedUser } = req.body;
 
  if (!folderName || !assignedUser) {
    return res.status(400).json({ error: 'All fields are required' });
  }
 
  try {
    const newFolderCode = `F${(++folderCounter).toString().padStart(3, '0')}`;
    // const newFolderPath = `D:/React Projects/Nunmiez-Task/${newFolderCode}`; // Set the desired folder directory
    // fs.mkdirSync(newFolderPath); // Create the folder on the file system
    const newFolder = {
      id: folders.length + 1,
      folderCode: newFolderCode,
      folderName,
      assignedUser,
      state: 'Pending'
    };
    folders.push(newFolder);
    res.json({ message: 'Folder created successfully', folder: newFolder });
  } catch (error) {
    console.error('Error creating folder:', error);
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
});
app.get('/folders', async (req, res) => {
  try {
    res.json(folders);
  } catch (error) {
    console.error('Error fetching folders:', error);
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
});
 
app.post('/open-folder', async (req, res) => {
  const { folderCode } = req.body;
 
  try {
    const folderPath = `D:/React Projects/Nunmiez-Task/${folderCode}`;
    // Execute the command to open the folder
    exec(`start "" "${folderPath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error('Error opening folder:', error);
        res.status(500).json({ error: 'An error occurred while opening the folder' });
        return;
      }
      console.log('Folder opened successfully:', folderPath);
      res.status(200).json({ message: 'Folder opened successfully' });
    });
  } catch (error) {
    console.error('Error opening folder:', error);
    res.status(500).json({ error: 'An error occurred while opening the folder' });
  }
});
 
app.get('/folders/user/:userId', async (req, res) => {
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


// Multer configuration for handling file uploads in memory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the destination directory where uploaded files will be stored
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Define the filename for the uploaded file
    cb(null, file.originalname); // You can customize the filename if needed
  }
});

const upload = multer({ storage: storage });

// Endpoint for uploading documents
app.post('/upload-document', upload.single('documentFile'), (req, res) => {
  // Access uploaded file via req.file
  const documentName = req.body.documentName;
  const documentSummary = req.body.documentSummary;
  const documentFolder = req.body.documentFolder;
  const documentFolderId = req.body.documentFolderId;

  // Validate and process the uploaded file and metadata
  if (!documentName || !documentSummary || !documentFolder || !req.file) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  // Process the uploaded file as needed
  // For example, you can store the file data in memory, or send it to another server
  const responseData = {
    message: 'Document uploaded successfully',
    document: {
      folderId: documentFolderId,
      name: documentName,
      summary: documentSummary,
      folder: documentFolder,
      fileId: req.file.filename, // Assuming fileId is the unique identifier for the uploaded file
      // Add more details as needed
    }
  };

  return res.status(200).json(responseData);
});
app.get('/folders/:folderId/documents', (req, res) => {
  const folderId = req.params.folderId;
  const folderPath = path.join(__dirname, 'uploads', folderId); // Assuming documents are stored in the 'uploads' folder with subfolders named after folderIds

  // Read the contents of the folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading folder contents:', err);
      return res.status(500).json({ error: 'An error occurred. Please try again later.' });
    }

    // Send the list of files as the response
    res.json(files);
  });
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Upload files to the 'uploads' directory
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//   },
// });

// const upload = multer({
 
//   limits: { fileSize: 1000000 }, // 1MB file size limit
// }).single('file');

// // app.post('/upload', (req, res) => {
// //   upload(req, res, (err) => {
// //     if (err) {
// //       return res.status(400).json({ message: 'File upload failed', error: err });
// //     }
    
// //     if (!req.file) {
// //       return res.status(400).json({ message: 'No file uploaded' });
// //     }

// //     // Here you can save the file details to your database if needed
// //     const file = {
// //       filename: req.file.filename,
// //       path: req.file.path,
// //       size: req.file.size,
// //     };

// //     // Define the destination directory where the file will be saved
// //     const destinationDir = 'F:/React Pojects/Nunmiez-Task/server/uploadedFiles';

// //     try {
// //       // Create the directory if it doesn't exist
// //       if (!fs.existsSync(destinationDir)) {
// //         fs.mkdirSync(destinationDir, { recursive: true });
// //       }

// //       // Move the uploaded file to the destination directory
// //       const newFilePath = path.join(destinationDir, req.file.originalname);
// //       console.log('New file path:', newFilePath);
// //       fs.renameSync(req.file.path, newFilePath);

// //       console.log('Uploaded file:', req.file);


// //       // Send back a success response
// //       res.status(200).json({ message: 'File uploaded successfully', file });
// //     } catch (error) {
// //       console.error('Error saving file:', error);
// //       res.status(500).json({ error: 'An error occurred while saving the file' });
// //     }
// //   });
// // });
// app.post('/upload', (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       return res.status(400).json({ message: 'File upload failed', error: err });
//     }
    
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     // Here you can save the file details to your database if needed
//     const file = {
//       filename: req.file.filename,
//       path: req.file.path,
//       size: req.file.size,
//     };

//     // Send back the uploaded file data as a response
//     res.status(200).json({ message: 'File uploaded successfully', file });
//   });
// });


// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });  
// app.post('/upload/:folderId', upload.single('file'), (req, res) => {
//   const folderId = req.params.folderId;
//   const file = req.file;

//   if (!file) {
//     return res.status(400).json({ message: 'No file uploaded' });
//   }

//   const fileDetails = {
//     filename: file.originalname,
//     size: file.size,
//   };

//   folderFiles[folderId].push(fileDetails);

//   res.status(200).json({ message: 'File uploaded successfully', file: fileDetails });
// });

// // Fetch files for a specific folder
// app.get('/fetchFile/:folderId', (req, res) => {
//   const folderId = req.params.folderId;

//   if (!folderFiles[folderId]) {
//     return res.status(404).json({ message: 'Folder not found' });
//   }

//   res.json({ files: folderFiles[folderId] });
// });

// // Fetch user folders
// app.get('/folders/user/:userId', (req, res) => {
//   const userId = req.params.userId;

//   // Assuming folders are assigned to users in some way
//   const userFolders = folders.filter(folder => folder.userId === userId);

//   if (!userFolders.length) {
//     return res.status(404).json({ message: 'No folders found for the user' });
//   }

//   res.json(userFolders);
// });

app.get('/fetchFile/:userId', (req, res) => {
  res.json(users);
});
 
 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});