function createDatabaseItems(mongooseConnection) {
    console.log('This script populates some test projects, locations and owners to the database');

    const async = require('async');
    
    // Import mongoose models
    const Project = require('../models/project');
    const Location = require('../models/location');
    const Owner = require('../models/owner');
    
    let hashedPasswords = [];
    let locations = [];
    let owners = [];
    let projects = [];
    
    function hashedPasswordCreate(password, cb) {
        const bcrypt = require('bcryptjs');
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                cb(err, null);
                return;
            }
            // console.log(`New HashedPassord: ${hashedPassword}`);
            hashedPasswords.push(hashedPassword);
            cb(null, hashedPassword);
        });
    }
    
    function locationCreate(city, country, continent, cb) {
        locationDetail = { 
            city: city, 
            country: country,
            continent: continent, 
        }
    
        const location = new Location(locationDetail);
    
        location.save(function (err) {
            if (err) {
                cb(err, null);
                return;
            }
    
            // console.log(`New Location: ${location}`);
            locations.push(location);
            cb(null, location);
        });
    }
    
    function ownerCreate(name, contact, rating, password, cb) {
        ownerDetail = { 
            name: name, 
            contact: contact,
            rating: rating,
            password: password, 
        }
    
        const owner = new Owner(ownerDetail);
    
        owner.save(function (err) {
            if (err) {
                cb(err, null);
                return;
            }
    
            // console.log(`New Owner: ${owner}`);
            owners.push(owner);
            cb(null, owner);
        });
    }
    
    function projectCreate(name, sizeKw, totalCost, totalCostCurrency, status, estimatedAnnualReturnPercent,
                location, owner, imageUrls, estimatedTotalCo2SavedTon, estimatedAnnualProductionKwh, 
                paymentSchedule, riskLevel, yearStartProduction, realAnnualProductionKwh, realAnnualPayments,
                paymentsCurrency, realAnnualReturnPercent, realAnnualCo2SavedTon, cb) {
        projectDetail = { 
            name: name,
            size_kw: sizeKw,
            total_cost: totalCost,
            total_cost_currency: totalCostCurrency,
            status: status,    
            estimated_annual_return_percent: estimatedAnnualReturnPercent,
            location: location,
            owner: owner,
            image_urls: imageUrls,
            estimated_total_co2_saved_ton: estimatedTotalCo2SavedTon,
            estimated_annual_production_kwh: estimatedAnnualProductionKwh,
            payment_schedule: paymentSchedule,
            risk_level: riskLevel,
            year_start_production: yearStartProduction,  
            real_annual_production_kwh: realAnnualProductionKwh,    
            real_annual_payments: realAnnualPayments,
            payments_currency: paymentsCurrency,
            real_annual_return_percent: realAnnualReturnPercent,    
            real_annual_co2_saved_ton: realAnnualCo2SavedTon,    
        }
    
        const project = new Project(projectDetail);
    
        project.save(function (err) {
            if (err) {
                cb(err, null);
                return;
            }
    
            // console.log(`New Project: ${project}`);
            projects.push(project);
            cb(null, project);
        });
    }

    function createHashedPasswords(cb) {
        async.series([
            function (callback) {
                hashedPasswordCreate('12345678', callback);
            },
        ],
        // Optional callback
        cb
        );
    }
    
    function createLocations(cb) {
        async.series([
            function (callback) {
                locationCreate('London', 'UK', 'Europe', callback);
            },
            function (callback) {
                locationCreate('Ostend', 'Belgium', 'Europe', callback);
            },
            function (callback) {
                locationCreate('Mokopane', 'South Africa', 'Africa', callback);
            },
            function (callback) {
                locationCreate('Lisbon', 'Portugal', 'Europe', callback);
            },
            function (callback) {
                locationCreate('Faro', 'Portugal', 'Europe', callback);
            },
        ],
        // Optional callback
        cb
        );
    }
    
    function createOwners(cb) {    
        async.series([
            function (callback) {
                ownerCreate('Goncalo G.', process.env.CONTACT_EMAIL, 0, hashedPasswords[0], callback);
            },
            function (callback) {
                ownerCreate('The Sun Exchange', 'test@gmail.com', 4.4, hashedPasswords[0], callback);
            },
            function (callback) {
                ownerCreate('Trine', 'test2@gmail.com', 4.3, hashedPasswords[0], callback);
            },
            function (callback) {
                ownerCreate('Iago V.', 'test3@gmail.com', 0, hashedPasswords[0], callback);
            },
            function (callback) {
                ownerCreate('BioSun Ventures', 'test4@gmail.com', 4.9, hashedPasswords[0], callback);
            },
        ],
        // Optional callback
        cb
        );
    }
    
    function createProjects(cb) {
        async.series([
            function (callback) {
                projectCreate(
                    'Spar Plaza',
                    360.8,
                    354000,
                    '$',
                    'Installing',
                    12.45,
                    locations[2],
                    owners[1],
                    ['https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.D48InHYw_LvxWixSZEb5vAHaFj%26pid%3DApi&f=1', 
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.8DL6MfQV8m-WkFbNnB_8agHaE8%26pid%3DApi&f=1',
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.vGzQuXXNXgGtcfOeeqVTUQHaE7%26pid%3DApi&f=1'],
                    10384,
                    574424,
                    'Monthly',
                    'Medium',
                    2021,
                    [475000, 612000],
                    [42000, 57050],
                    '$',
                    [9.8, 14.2],
                    [425, 562],
                    callback
                );
            },
            function (callback) {
                projectCreate(
                    'Faro Airport',
                    325,
                    550000,
                    '€',
                    'Funding',
                    11,
                    locations[4],
                    owners[0],
                    ['https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.PcHR3xFENYgo94rNnwSMCQHaEH%26pid%3DApi&f=1', 
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ef3u05fYVUwBuPoQ-PnjnAHaE8%26pid%3DApi&f=1',
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.adxYV0gLHrDi1cs2vLCapgHaER%26pid%3DApi&f=1'],
                    3300,
                    625000,
                    'Monthly',
                    'Low',
                    2021,
                    [425000, 712000],
                    [83000, 112500],
                    '€',
                    [8.1, 12.2],
                    [125, 162],
                    callback
                );
            },
            function (callback) {
                projectCreate(
                    'Iago\'s Castle',
                    4.8,
                    6.5,
                    '€',
                    'Planning',
                    6.2,
                    locations[1],
                    owners[3],
                    ['https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.w6JuihUCHMPkOvJxPfW_gQHaEo%26pid%3DApi&f=1', 
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.iFcxBIPr4ndL9vMAzC3bpwHaFu%26pid%3DApi&f=1'],
                    2,
                    4500,
                    'Quarterly',
                    'Low',
                    2021,
                    [],
                    [],
                    '€',
                    [],
                    [],
                    callback
                );
            },
            function (callback) {
                projectCreate(
                    'UK Sun Fund',
                    525000,
                    40000000,
                    '£',
                    'Producing',
                    6.1,
                    locations[0],
                    owners[4],
                    ['https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.Y1Ck3C9xrLV8X-BcM7HenQHaFm%26pid%3DApi&f=1',
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.-FJpiSrf9TN1VppMcCrPrgAAAA%26pid%3DApi&f=1', 
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.p4H0byu2wiTI_h1t4A_5mQHaEK%26pid%3DApi&f=1'],
                    52000,
                    4500000,
                    'Quarterly',
                    'Very Low',
                    2012,
                    [3500000, 3650000, 3850000, 3900000, 4000000, 4250500, 4600000, 4105000],
                    [18000000, 22000000, 25000000, 28000000, 32000000, 33000000, 37000000, 30000000],
                    '£',
                    [5, 6, 6.1, 6, 6.2, 5.8, 8, 6],
                    [1700, 1725, 1950, 2000, 2100, 2200, 2500, 2000],
                    callback
                );
            },
        ],
        // Optional callback
        cb
        );
    }
    
    async.series([
        createHashedPasswords,
        createLocations,
        createOwners,
        createProjects,
    ],
    // Optional callback
    function (err, results) {
        if (err) {
            console.log(`CREATE DATABASE FINAL ERR: ${err}`);
        } else {
            // console.log(`Projects: ${projects}`);

            // All done, so close connection to database in case one was passed to this function
            if (mongooseConnection) {
                mongooseConnection.close();
            }
        }
    });
}

module.exports = createDatabaseItems;
