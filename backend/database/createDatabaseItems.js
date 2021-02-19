function createDatabaseItems(mongooseConnection) {
    console.log('This script populates some test projects, locations and users to the database');

    const async = require('async');
    
    // Import mongoose models
    const Project = require('../models/project');
    const Location = require('../models/location');
    const User = require('../models/user');
    
    let hashedPasswords = [];
    let locations = [];
    let users = [];
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
    
    function userCreate(name, contact, password, investments, rating, cb) {
        userDetail = { 
            name: name, 
            contact: contact,
            password: password,
            investments: investments,
            rating: rating,
        }
    
        const user = new User(userDetail);
    
        user.save(function (err) {
            if (err) {
                cb(err, null);
                return;
            }
    
            // console.log(`New User: ${user}`);
            users.push(user);
            cb(null, user);
        });
    }
    
    function projectCreate(name, sizeKw, totalCost, totalCostCurrency, status, estimatedAnnualReturnPercent,
                location, user, imageUrls, estimatedTotalCo2SavedTon, estimatedAnnualProductionKwh, 
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
            owner: user,
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
                locationCreate('Mokopane', 'South Africa', 'Africa', callback);
            },
            function (callback) {
                locationCreate('Lisbon', 'Portugal', 'Europe', callback);
            },
            function (callback) {
                locationCreate('Faro', 'Portugal', 'Europe', callback);
            },
            function (callback) {
                locationCreate('Marondera', 'Zimbabwe', 'Africa', callback);
            },
            function (callback) {
                locationCreate('Guernsey', 'UK', 'Europe', callback);
            },
            function (callback) {
                locationCreate('New York', 'US', 'North America', callback);
            },
        ],
        // Optional callback
        cb
        );
    }
    
    function createUsers(cb) {    
        async.series([
            function (callback) {
                userCreate('Goncalo G.', process.env.CONTACT_EMAIL, hashedPasswords[0], new Map(), 0, callback);
            },
            function (callback) {
                userCreate('The Sun Exchange', 'test@gmail.com', hashedPasswords[0], new Map(), 4.0, callback); // https://www.mamma.com/us/thesunexchange-com
            },
            function (callback) {
                userCreate('Trine', 'test2@gmail.com', hashedPasswords[0], new Map(), 3.9, callback); // https://uk.trustpilot.com/review/trine.com
            },
            function (callback) {
                userCreate('NextEnergy Solar Fund', 'test3@gmail.com', hashedPasswords[0], new Map(), 5.0, callback);
            },
            function (callback) {
                userCreate('Repowering London', 'test4@gmail.com', hashedPasswords[0], new Map(), 4.4, callback); // https://uk.trustpilot.com/review/repowering.org.uk
            },
            function (callback) {
                userCreate('Bluefield Solar Income Fund', 'test5@gmail.com', hashedPasswords[0], new Map(), 5.0, callback);
            },
            function (callback) {
                userCreate('Foresight Solar Fund', 'test6@gmail.com', hashedPasswords[0], new Map(), 5.0, callback);
            },
            function (callback) {
                userCreate('US Solar Fund', 'test7@gmail.com', hashedPasswords[0], new Map(), 5.0, callback);
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
                    256500,
                    '£',
                    'Installing',
                    12.45,
                    locations[1],
                    users[1],
                    ['https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.D48InHYw_LvxWixSZEb5vAHaFj%26pid%3DApi&f=1', 
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.8DL6MfQV8m-WkFbNnB_8agHaE8%26pid%3DApi&f=1',
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.vGzQuXXNXgGtcfOeeqVTUQHaE7%26pid%3DApi&f=1'],
                    10400,
                    574800,
                    'Monthly',
                    'Medium',
                    2021,
                    new Object(),
                    new Object(),
                    '£',
                    new Object(),
                    new Object(),
                    callback
                );
            },
            function (callback) {
                projectCreate(
                    'Nhimbe Fresh',
                    510,
                    1050000,
                    '£',
                    'Funding',
                    16.7,
                    locations[4],
                    users[1],
                    ['https://nhimbefresh.com/wp-content/uploads/2018/11/Nhimbe_Homepage_05.jpg', 
                            'https://nhimbefresh.com/wp-content/uploads/2018/11/Nhimbe_Homepage_06.jpg',
                            'https://nhimbefresh.com/wp-content/uploads/2018/11/Nhimbe_Fresh_History_03.jpg'],
                    24490,
                    1174000,
                    'Monthly',
                    'Very High',
                    2021,
                    new Object(),
                    new Object(),
                    '£',
                    new Object(),
                    new Object(),
                    callback
                );
            },
            function (callback) {
                projectCreate(
                    'North Kensington Community Energy',
                    224,
                    190000,
                    '£',
                    'Producing',
                    3,
                    locations[5],
                    users[4],
                    ['https://www.repowering.org.uk/wp-content/uploads/elementor/thumbs/NKCE_Dalgarno_800w-ox5ggqosjoe14r7iq82mjsgfl1brstlbbaz1ltl0kq.jpg',
                            'https://www.repowering.org.uk/wp-content/uploads/2020/10/NKCE_Gallery_13.jpg', 
                            'https://www.repowering.org.uk/wp-content/uploads/2020/10/NKCE_Gallery_11.jpg'],
                    1000,
                    78000,
                    'Annually',
                    'Very Low',
                    2020,
                    { 2020: 58530 },
                    { 2020: 4711 },
                    '£',
                    { 2020: 2 },
                    { 2020: 15 },
                    callback
                );
            },
            function (callback) {
                projectCreate(
                    'NextEnergy',
                    763000,
                    994000000,
                    '£',
                    'Producing',
                    6.9,
                    locations[0],
                    users[3],
                    ['https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.Y1Ck3C9xrLV8X-BcM7HenQHaFm%26pid%3DApi&f=1',
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.-FJpiSrf9TN1VppMcCrPrgAAAA%26pid%3DApi&f=1', 
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.p4H0byu2wiTI_h1t4A_5mQHaEK%26pid%3DApi&f=1'],
                    375000,
                    1100000000,
                    'Quarterly',
                    'Very Low',
                    2015, // They started operations in 2014/15
                    { 
                        2015: 23000000, 
                        2016: 225000000, 
                        2017: 394000000, 
                        2018: 451000000, 
                        2019: 693000000, 
                        2020: 712000000,
                    },
                    {
                        2015: 10946000, 
                        2016: 17372000, 
                        2017: 20681000, 
                        2018: 34800000, 
                        2019: 38100000, 
                        2020: 39700000
                    },
                    '£',
                    {
                        2015: 5.1, 
                        2016: 6.4, 
                        2017: 5.72, 
                        2018: 5.8, 
                        2019: 5.65, 
                        2020: 6.78
                    }, 
                    {
                        2015: 11615, 
                        2016: 104179, 
                        2017: 156560, 
                        2018: 158600, 
                        2019: 299000, 
                        2020: 307500
                    },
                    callback
                );
            },
            function (callback) {
                projectCreate(
                    'Bluefield',
                    610000,
                    624000000,
                    '£',
                    'Producing',
                    6.0,
                    locations[5],
                    users[5],
                    ['https://bluefieldsif.com/wp-content/uploads/2020/08/Alt-West-Raynham-Image-1024x576.jpg',
                            'https://bluefieldsif.com/wp-content/uploads/2020/08/elms-1024x683.jpg', 
                            'https://bluefieldsif.com/wp-content/uploads/2020/08/court_farm-1024x576.jpg'],
                    3137000,
                    638670000,
                    'Quarterly',
                    'Medium',
                    2014, // They started operations in 2013/14
                    { 
                        2014: 0, 
                        2015: 0, 
                        2016: 309061000, 
                        2017: 400000000, 
                        2018: 420000000, 
                        2019: 480200000, 
                        2020: 487600000 
                    },
                    { 
                        2014: 5700000, 
                        2015: 10600000, 
                        2016: 20500000, 
                        2017: 24800000, 
                        2018: 27500000, 
                        2019: 30700000, 
                        2020: 29300000 
                    },
                    '£',
                    { 
                        2014: 3.9, 
                        2015: 6.6, 
                        2016: 7.3, 
                        2017: 6.3, 
                        2018: 6.1, 
                        2019: 6.1, 
                        2020: 5.9 
                    },
                    { 
                        2014: 12516, 
                        2015: 67325, 
                        2016: 141704, 
                        2017: 167753, 
                        2018: 153723, 
                        2019: 134881, 
                        2020: 125534 
                    },
                    callback
                );
            },
            function (callback) {
                projectCreate(
                    'Foresight',
                    895000,
                    1072000000,
                    '£',
                    'Producing',
                    6.75,
                    locations[0],
                    users[6],
                    ['https://fsfl.foresightgroup.eu/media/4abnu41x/wymeswold.jpg',
                            'https://fsfl.foresightgroup.eu/media/nj0f0fqa/castle-eaton.jpg', 
                            'https://fsfl.foresightgroup.eu/media/hgjd2qau/hunters-race.jpg'],
                    19900000,
                    700000000,
                    'Quarterly',
                    'Low',
                    2014,
                    { 
                        2014: 86100000, 
                        2015: 299000000, 
                        2016: 319000000, 
                        2017: 426000000, 
                        2018: 691500000, 
                        2019: 964000000 
                    },
                    { 
                        2014: 4500000, 
                        2015: 19100000, 
                        2016: 18700000, 
                        2017: 20100000, 
                        2018: 31300000, 
                        2019: 36000000 
                    },
                    '£',
                    { 
                        2014: 2.9, 
                        2015: 6.1, 
                        2016: 5.9, 
                        2017: 5.9, 
                        2018: 6.1, 
                        2019: 5.3 
                    },
                    { 
                        2014: 0, 
                        2015: 177343, 
                        2016: 190125, 
                        2017: 253434, 
                        2018: 533802, 
                        2019: 550383 
                    },
                    callback
                );
            },
            function (callback) {
                projectCreate(
                    'US Solar',
                    443000,
                    140500000,
                    '£',
                    'Producing',
                    5.1,
                    locations[6],
                    users[7],
                    ['https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.j4iQMN1HiDaDI74ZbP-M3AHaE9%26pid%3DApi&f=1',
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.fnxEP_z2IbIiWD-ei4N8VgHaEv%26pid%3DApi&f=1', 
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.mNYg9pNpvl0xEx8Oruux0QHaCd%26pid%3DApi&f=1'],
                    15750000,
                    373000000,
                    'Quarterly',
                    'Low',
                    2019,
                    { 2019: 44000000 }, // 4000 homes * 11000 kWh per home per year 
                    { 2019: 590000 },
                    '£',
                    { 2019: 0.4 },
                    { 2019: 38000 },
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
        createUsers,
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
