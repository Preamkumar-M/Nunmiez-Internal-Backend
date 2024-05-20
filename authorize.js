const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');

router.use(bodyParser.json());
router.use(session({
    secret: 'your_secret_key_here',
    resave: false,
    saveUninitialized: false
  }));

const users = [
    { id: 1, name: 'Superadmin', email: 'superadmin@gmail.com', mobile: '9086867780', password: '$2a$12$8nPZAz/Fv7trI9xq1yPBX.2My38fDB3rPkOJm4oNNEDTGDmkxH4oK', role: 'superadmin' },
    { id: 2, name: 'Admin', email: 'admin@gmail.com', mobile: '9876543210', password: '$2a$12$gp.ykYqaMzFMLKZ4hg9P0.TNXjsIgl6peOG/m9f81htTKKVPZsGdK', role: 'admin' },
    { id: 3, name: 'User', email: 'user@gmail.com', mobile: '1234567890', password: '$2a$12$7aV19zPKEOJOQ.v6x3EjkOiF0OkTWRxoxhzgxWCIU0O8rx0136x0C', role: 'user' },
  ];


  router.get('/users', (req, res) => {
    res.json(users);
  });
  
  router.post('/signup', async (req, res) => {
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
  
  
  router.post('/signin', async (req, res) => {
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


  module.exports = router;