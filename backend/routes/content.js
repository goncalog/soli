const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');
const locationController = require('../controllers/locationController');
const userController = require('../controllers/userController');
const withAuth = require('../auth/authMiddleware');

// GET request for home page
router.get('/', projectsController.index);

// GET request for list of all projects
router.get('/projects', projectsController.getProjects);

// GET request for unique project
router.get('/project/:id', projectsController.getUniqueProject);

// GET request for list of all locations
router.get('/locations', locationController.getLocations);

// POST request to sign up user
router.post('/user/signup', userController.signUp);

// POST request to log in user
router.post('/user/login', userController.logIn);

// POST request to log out user
router.post('/user/logout', userController.logOut);

// GET request to check log in status
router.get('/user/checkAuth', withAuth, userController.checkAuth);

// GET request to get a user's data
router.get('/user/:id', withAuth, userController.getUser);

// GET request to get a user's list of projects for sale
router.get('/user/:id/projects', userController.getUserProjects);

// POST request to create new project
router.post('/user/:id/project/create', withAuth, userController.postCreateProject);

// GET request to update project
router.get('/user/:id/project/:id/update', withAuth, userController.getUpdateProject);

// PUT request to update project
router.put('/user/:id/project/:id/update', withAuth, userController.putUpdateProject);

// DELETE request to delete project
router.delete('/user/:id/project/:id/delete', withAuth, userController.deleteProject);

// PUT request to invest in project
router.put('/user/:id/project/:id/invest', withAuth, userController.putInvestProject);

// POST request to contact user
router.post('/user/:id/contact', userController.postContactUser);

// Placeholder code for testing POST routes
router.get('/test', projectsController.getTest);

router.post('/test', projectsController.postTest);

module.exports = router;
