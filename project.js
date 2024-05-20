const express = require('express');
const router = express.Router();
const user = require('./authorize');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

let projectCounter = 0;
const projects = [];

router.use('/auth',user);
router.get('/admin-dashboard', (req, res) => {
  try {
    // Assuming projects data is fetched from a database or defined elsewhere
   // const projects = []; // Initialize projects variable

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

    res.json({
      total,
      inProgress,
      completed,
      overdue
    });
  } catch (error) {
    console.error('Error getting admin dashboard data:', error);
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
});







// Create a new project
router.post('/create-project', async (req, res) => {
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




router.get('/projects', (req, res) => {
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





// Get projects for a specific user
router.get('/projects/:userId', async (req, res) => {
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



// Update project state
router.put('/update-project-state/:projectId', async (req, res) => {
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

module.exports = router;
