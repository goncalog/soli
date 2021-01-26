const Owner = require('../models/owner');
const Project = require('../models/project');

const validator = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// POST request to sign up owner
exports.signUp = [
    // Validate fields.
    validator.body('name', 'Name must not be empty.').trim().isLength({ min: 1 }),
    validator.body('contact', 'Contact must not be empty.').trim().isLength({ min: 1 }),
    validator.body('password', 'Password must have at least 8 characters.').trim().isLength({ min: 8 }),
    
    // Sanitize fields (using wildcard).
    validator.sanitizeBody('*').escape(),

    // Process request after validation and sanitization.
   (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validator.validationResult(req);

        // Check if Owner already exists
        // If not, hash password and save to db
        Owner.findOne({ contact: req.body.contact }, (err, user) => {
            if (err) { return next(err); }
      
            if (user) {
                res.status(401);
                return res.json({ message: 'A user with this email already exists.' })
            }

            // Encrypt password
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                // if err, do something
                if (err) { return next(err); }

                // otherwise, store hashedPassword in db
                const user = new Owner({
                    name: req.body.name,
                    contact: req.body.contact,
                    rating: 5,
                    password: hashedPassword,
                });
                
                if (!errors.isEmpty()) {
                    // There are errors. Send sanitized values/error messages.
                    res.json({ errors: errors.array() });
                    return;
                    
                } else {
                    // Data is valid. Save item.
                    user.save(err => {
                        if (err) { return next(err); }

                        // Successful - log in user via Passport
                        req.logIn(user, function(err) {
                            if (err) { return next(err); }
                            
                            // Successful
                            return res.json({ title: `${req.user.name} signed up`, userId: req.user.id });
                        });                        
                    });
                }
            });
        });
    }
];

// POST request to log in owner
exports.logIn = (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            res.status(401);
            return res.json({ message: info.msg }); 
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            
            // Successful
            return res.json({ title: `${req.user.name} logged in`, userId: req.user.id });
        });
    })(req, res, next);
}

// POST request to log out owner
exports.logOut = (req, res, next) => {
    req.logOut();
    res.json({ title: `Owner logged out` });
}

// GET request for list of owner's projects
exports.getProjects = (req, res, next) => {
    res.json({ title: `List of ${req.name}'s Projects` });
}

// GET request to check log in status
exports.checkAuth = (req, res, next) => {
    res.json({ title: `User is logged in`, userId: req.user._id });
}

// GET request to get a owner's list of projects
exports.getOwnerProjects = (req, res, next) => {
    Project.find({ owner: { _id: req.params.id }  })
        .populate('location')
        .populate('owner')
        .exec(function (err, projects) {
            if (err) { return next(err); }

            // Successful, so send data
            res.json({ title: `List of Projects from owner with id ${req.params.id}`, projects: projects });
        });
}

// POST request to create new project
exports.postCreateProject = [
    // Mongoose and the backend already validates the data, so validation isn't repeat it here 
    // (although triple redundancy could make sense)
    // Removed fields sanitization due to resulting bugs when passing arrays and/or urls 

    // Process request after sanitization.
    (req, res, next) => {
        const projectDetail = {
            name: req.body.name,
            size_kw: req.body.size,
            total_cost: req.body.totalCost,
            total_cost_currency: req.body.totalCostCurrency,
            status: req.body.status,    
            estimated_annual_return_percent: req.body.estimatedAnnualReturn,
            location: req.body.location,
            image_urls: req.body.imageUrls,
            owner: req.user, // The owner is the logged in user via Passport
            estimated_total_co2_saved_ton: req.body.estimatedTotalCo2Saved,
            estimated_annual_production_kwh: req.body.estimatedAnnualProduction,
            payment_schedule: req.body.paymentSchedule,
            risk_level: req.body.riskLevel,
            year_start_production: req.body.yearStartProduction,  
            real_annual_production_kwh: req.body.realAnnualProductions,    
            real_annual_payments: req.body.realAnnualPayments,
            payments_currency: req.body.paymentsCurrency,
            real_annual_return_percent: req.body.realAnnualReturns,    
            real_annual_co2_saved_ton: req.body.realAnnualCo2Savings,  
        }

        const project = new Project(projectDetail);
        project.save(err => {
            if (err) { return next(err); }

            // Successful
            return res.json({ title: `Created new Project ${project._id}`, userId: req.user._id });                        
        });
    }
];

// GET request to update project
exports.getUpdateProject = (req, res, next) => {
    Project.findById(req.params.id)
        .populate('location')
        .populate('owner')
        .exec(function (err, project) {
            if (err) { return next(err); }

            res.json({ title: `Data to update Project with id ${req.params.id}`, project: project });
        });
}

// PUT request to update project
exports.putUpdateProject = (req, res, next) => {
    const projectDetail = { 
        make: req.body.make, 
        model: req.body.model,
        year: req.body.year,
        price_per_day: req.body.price,
        deposit: req.body.deposit,
        min_rental_period: req.body.minRentalPeriod,
        included_extras: req.body.includedExtras,
        mileage: req.body.mileage,
        location: req.body.location,
        image_urls: req.body.imageUrls,
        owner: req.user, // The owner is the logged in user via Passport
        list_date: req.body.listDate,
        equipment_and_options: req.body.equipmentAndOptions,
        exterior: req.body.bodyStyle 
                ? { body_style: req.body.bodyStyle, colour: req.body.exteriorColour }
                : { colour: req.body.exteriorColour },
        interior: { seating: req.body.seating, colour: req.body.interiorColour },
        vehicle_identification_number: req.body.vehicleIdentificationNumber,
        full_vehicle_inspection: req.body.fullVehicleInspection,
        pco_license: req.body.pcoLicense,
    }

    Project.findByIdAndUpdate(req.params.id, projectDetail, (err) => {
        if (err) { return next(err); }

        res.json({ title: `Updating Project with id ${req.params.id}`, userId: req.user._id });
    });
}

// DELETE request to delete project
exports.deleteProject = (req, res, next) => {
    Project.findByIdAndDelete(req.params.id, (err) => {
        if (err) { return next(err); }

        res.json({ title: `Deleted Project with id ${req.params.id}`, userId: req.user._id });
    });
}

// POST request to contact owner
exports.postContactOwner = (req, res, next) => {
    const nodemailer = require('nodemailer');

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // Create reusable transporter object
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_AUTH_USER,
                pass: process.env.NODEMAILER_AUTH_PASS,
            },
        });

        // Send mail with defined transport object
        let info = await transporter.sendMail({
            from: process.env.NODEMAILER_AUTH_USER, // sender address
            // If there's no owner contact, this is a general contact, so send it to a specified email
            to: (req.body.to !== '') ? req.body.to : process.env.CONTACT_EMAIL, // list of receivers
            subject: req.body.subject, // Subject line
            text: `${req.body.from} has sent you the following message: \n\n${req.body.text}`,
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    }

    main().catch(console.error);

    res.json({ title: `Contact owner with id ${req.params.id}` });
}
