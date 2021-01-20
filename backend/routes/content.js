const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');
const makeController = require('../controllers/makeController');
const modelController = require('../controllers/modelController');
const locationController = require('../controllers/locationController');
const ownerController = require('../controllers/ownerController');
const withAuth = require('../auth/authMiddleware');

// GET request for home page
router.get('/', projectsController.index);

// GET request for list of all projects
router.get('/projects', projectsController.getProjects);

// GET request for data to create new project
router.get('/project/create', projectsController.getCreateProject);

// GET request for unique project
router.get('/project/:id', projectsController.getUniqueProject);

// GET request for make
router.get('/make/:id', makeController.getMake);

// GET request for list of all makes
router.get('/makes', makeController.getMakes);

// GET request for make's models
router.get('/make/:id/models', makeController.getModels);

// GET request for model
router.get('/model/:id', modelController.getModel);

// GET request for list of all models
router.get('/models', modelController.getModels);

// GET request for list of all locations
router.get('/locations', locationController.getLocations);

// POST request to sign up owner
router.post('/owner/signup', ownerController.signUp);

// POST request to log in owner
router.post('/owner/login', ownerController.logIn);

// POST request to log out owner
router.post('/owner/logout', ownerController.logOut);

// GET request to list of the owner's projects
router.get('/owner/projects', withAuth, ownerController.getProjects);

// GET request to check log in status
router.get('/owner/checkAuth', withAuth, ownerController.checkAuth);

// GET request to get a owner's list of projects for sale
router.get('/owner/:id/projects', ownerController.getOwnerProjects);

// POST request to create new project
router.post('/owner/:id/project/create', withAuth, ownerController.postCreateProject);

// GET request to update project
router.get('/owner/:id/project/:id/update', withAuth, ownerController.getUpdateProject);

// PUT request to update project
router.put('/owner/:id/project/:id/update', withAuth, ownerController.putUpdateProject);

// DELETE request to delete project
router.delete('/owner/:id/project/:id/delete', withAuth, ownerController.deleteProject);

// POST request to contact owner
router.post('/owner/:id/contact', ownerController.postContactOwner);

// Placeholder code for testing POST routes
router.get('/test', projectsController.getTest);

router.post('/test', projectsController.postTest);

module.exports = router;
