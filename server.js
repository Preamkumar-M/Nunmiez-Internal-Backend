const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const fs = require('fs');
const path = require('path');

// const { v4: uuidv4 } = require('uuid');
// const multer = require('multer');
const projectRoutes = require('./project');
const folderRoutes = require('./folder');
const user = require('./authorize');

const PORT = process.env.PORT || 3002;
 
app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: 'your_secret_key_here',
  resave: false,
  saveUninitialized: false
}));

app.use('/auth',user);
app.use('/api', projectRoutes);

app.use('/api-folder', folderRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
 
app.use((err, req, res, next) => {
  console.error(err.stack);
  // Log the error to a file or console
  fs.appendFileSync('error.log', `${new Date().toISOString()}: ${err.stack}\n`);
  res.status(500).send('Something went wrong!');
});
 
app.use(express.json());

 





app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


