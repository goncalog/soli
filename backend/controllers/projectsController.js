const Project = require('../models/project');

// GET request for home page.
exports.index = (req, res, next) => {
    res.json({ title: 'Soli' });
}

// GET request for list of all projects
exports.getProjects = (req, res, next) => {
    Project.find({})
        .populate('location')
        .populate('owner')
        .exec(function (err, projects) {
            if (err) { return next(err); }

            // Successful, so send data
            res.json({ title: 'List of all Projects', projects: projects });
        });
}

// GET request for unique project
exports.getUniqueProject = (req, res, next) => {
    Project.findById(req.params.id)
        .populate('location')
        .populate('owner')
        .exec(function (err, project) {
            if (err) { return next(err); }

            // Successful, so send data
            res.json({ title: `Unique Project with id ${project._id}`, project: project });
        });
}

// GET request for data to create new project
exports.getCreateProject = (req, res, next) => {
    res.json({ title: 'Data to create new Project' });
}

// Placeholder code for testing POST routes.
const testArray = [];

exports.getTest = (req, res, next) => {
    res.json({ testArray });
}

exports.postTest = (req, res, next) => {
    testArray.push(req.body.item);
    res.send('Success!');
}
