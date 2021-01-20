const EV = require('../models/ev');

// GET request for home page.
exports.index = (req, res, next) => {
    res.json({ title: 'Fully Electric' });
}

// GET request for list of all projects
exports.getProjects = (req, res, next) => {
    EV.find({})
        .populate('location')
        .populate('make')
        .populate('model')
        .populate('owner')
        .exec(function (err, projects) {
            if (err) { return next(err); }

            // Successful, so send data
            res.json({ title: 'List of all Projects', projects: projects });
        });
}

// GET request for unique ev
exports.getUniqueEv = (req, res, next) => {
    EV.findById(req.params.id)
        .populate('location')
        .populate('make')
        .populate('model')
        .populate('owner')
        .exec(function (err, ev) {
            if (err) { return next(err); }

            // Successful, so send data
            res.json({ title: `Unique EV with id ${ev._id}`, ev: ev });
        });
}

// GET request for data to create new ev
exports.getCreateEv = (req, res, next) => {
    res.json({ title: 'Data to create new EV' });
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
