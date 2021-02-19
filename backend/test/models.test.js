const assert = require('chai').assert;
const Project = require('../models/project');
const Location = require('../models/location');
const User = require('../models/user');

const london = new Location({
    city: 'London',
    country: 'UK',
    continent: 'Europe',
    test: 2,
});

const theSunExchange = new User({
    name: 'The Sun Exchange',
    contact: 'the.sun.exchange@gmail.com',
    password: '12345678',
    investments: new Map(),
    rating: 4.2,
    test: 2,
});

const imageUrls = ['https://placeholder.com/image111', 'https://placeholder.com/image222']; 
const realAnnualProduction = { 2019: 98000, 2020: 132000 };
const realAnnualPayments = { 2019: 10000, 2020: 13500 };
const realAnnualReturn = { 2019: 10, 2020: 13.5 };
const realAnnualCo2Saved = { 2019: 73, 2020: 107 };

const project = new Project({
    name: 'Star Plaza',
    size_kw: 360,
    total_cost: 100000,
    total_cost_currency: '£',
    status: 'Funding',    
    estimated_annual_return_percent: 12.45,
    location: london,
    owner: theSunExchange,
    image_urls: imageUrls,
    estimated_total_co2_saved_ton: 1200,
    estimated_annual_production_kwh: 125000,
    payment_schedule: 'Monthly',
    risk_level: 'Medium',
    year_start_production: 2021,
    real_annual_production_kwh: realAnnualProduction,    
    real_annual_payments: realAnnualPayments,
    payments_currency: '£',
    real_annual_return_percent: realAnnualReturn,    
    real_annual_co2_saved_ton: realAnnualCo2Saved,    
    test: 2,
});

describe('Project model', () => {
    it('exists', () => {
        assert.instanceOf(project, Project, 'project is instance of Project');
    });

    it('has 23 properties', () => {
        assert.strictEqual(Object.keys(project.schema.tree).length, 23, 'project has 23 properties');
    });

    it('has name', () => {
        assert.strictEqual(project.name, 'Star Plaza', 'project\'s name is Star Plaza');
    });

    it('has size kw', () => {
        assert.strictEqual(project.size_kw, 360, 'project\'s size kw is 360');
    });

    it('has total cost', () => {
        assert.strictEqual(project.total_cost, 100000, 'project\'s total cost is 100000');
    });

    it('has total cost currency', () => {
        assert.strictEqual(project.total_cost_currency, '£', 'project\'s total cost currency is £');
    });

    it('has status', () => {
        assert.strictEqual(project.status, 'Funding', 'project\'s status is Funding');
    });

    it('has estimated annual return percent', () => {
        assert.strictEqual(project.estimated_annual_return_percent, 12.45, 'project\'s estimated annual return percent is 12.45');
    });
    
    it('has location', () => {
        assert.instanceOf(project.location, Location, 'project\'s location is instance of Location');
    });

    it('has owner', () => {
        assert.instanceOf(project.owner, User, 'project\'s owner is instance of User');
    });

    it('has image urls array', () => {
        assert.instanceOf(project.image_urls, Array, 'project\'s image urls is an Array');
        assert.strictEqual(project.image_urls.length, 2, 'project\'s image urls has 2 items');
        project.image_urls.forEach((url, index) => {
            assert.strictEqual(url, imageUrls[index], 
                    'project\'s image urls is an array with https://placeholder.com/image111 and https://placeholder.com/image222');
        });
    });

    it('has estimated_total_co2_saved_ton', () => {
        assert.strictEqual(project.estimated_total_co2_saved_ton, 1200, 'project\'s estimated_total_co2_saved_ton is 1200');
    });

    it('has estimated_annual_production_kwh', () => {
        assert.strictEqual(project.estimated_annual_production_kwh, 125000, 'project\'s estimated_annual_production_kwh is 125000');
    });

    it('has payment_schedule', () => {
        assert.strictEqual(project.payment_schedule, 'Monthly', 'project\'s payment_schedule is Monthly');
    });

    it('has risk_level', () => {
        assert.strictEqual(project.risk_level, 'Medium', 'project\'s risk_level is Medium');
    });

    it('has year_start_production', () => {
        assert.strictEqual(project.year_start_production, 2021, 'project\'s year_start_production is 2021');
    });

    it('has real_annual_production_kwh', () => {
        assert.instanceOf(project.real_annual_production_kwh, Object, 'project\'s real_annual_production_kwh is an Object');
        assert.strictEqual(Object.keys(project.real_annual_production_kwh).length, 2, 'project\'s real_annual_production_kwh has 2 items');
        Object.values(project.real_annual_production_kwh).forEach((item, index) => {
            assert.strictEqual(item, [98000, 132000][index], 
                    'project\'s real_annual_production_kwh is an object with 98000 and 132000');
        });
    });

    it('has real_annual_payments', () => {
        assert.instanceOf(project.real_annual_payments, Object, 'project\'s real_annual_payments is an Object');
        assert.strictEqual(Object.keys(project.real_annual_payments).length, 2, 'project\'s real_annual_payments has 2 items');
        Object.values(project.real_annual_payments).forEach((item, index) => {
            assert.strictEqual(item, [10000, 13500][index], 
                    'project\'s real_annual_payments is an object with 10000 and 13500');
        });
    });

    it('has payments_currency', () => {
        assert.strictEqual(project.payments_currency, '£', 'project\'s payments_currency is £');
    });

    it('has real_annual_return_percent', () => {
        assert.instanceOf(project.real_annual_return_percent, Object, 'project\'s real_annual_return_percent is an Object');
        assert.strictEqual(Object.keys(project.real_annual_return_percent).length, 2, 'project\'s real_annual_return_percent has 2 items');
        Object.values(project.real_annual_return_percent).forEach((item, index) => {
            assert.strictEqual(item, [10, 13.5][index], 
                    'project\'s real_annual_return_percent is an object with 10 and 13.5');
        });
    });

    it('has real_annual_co2_saved_ton', () => {
        assert.instanceOf(project.real_annual_co2_saved_ton, Object, 'project\'s real_annual_co2_saved_ton is an Object');
        assert.strictEqual(Object.keys(project.real_annual_co2_saved_ton).length, 2, 'project\'s real_annual_co2_saved_ton has 2 items');
        Object.values(project.real_annual_co2_saved_ton).forEach((item, index) => {
            assert.strictEqual(item, [73, 107][index], 
                    'project\'s real_annual_co2_saved_ton is an object with 73 and 107');
        });
    });

    it('doesn\'t have test property', () => {
        assert.notExists(project.test, 'project\'s test property is null or undefined');
    });
});

describe('Location model', () => {
    it('exists', () => {
        assert.instanceOf(london, Location, 'london is instance of Location');
    });

    it('has 6 properties', () => {
        assert.strictEqual(Object.keys(london.schema.tree).length, 6, 'london has 6 properties');
    });

    it('has city', () => {
        assert.strictEqual(london.city, 'London', 'london\'s city is London');
    });

    it('has country', () => {
        assert.strictEqual(london.country, 'UK', 'london\'s country is UK');
    });

    it('has continent', () => {
        assert.strictEqual(london.continent, 'Europe', 'london\'s continent is Europe');
    });

    it('doesn\'t have test property', () => {
        assert.notExists(london.test, 'london\'s test property is null or undefined');
    });
});

describe('User model', () => {
    it('exists', () => {
        assert.instanceOf(theSunExchange, User, 'theSunExchange is instance of User');
    });

    it('has 8 properties', () => {
        assert.strictEqual(Object.keys(theSunExchange.schema.tree).length, 8, 'theSunExchange has 8 properties');
    });

    it('has name', () => {
        assert.strictEqual(theSunExchange.name, 'The Sun Exchange', 'theSunExchange\'s name is The Sun Exchange');
    });

    it('has contact', () => {
        assert.strictEqual(theSunExchange.contact, 'the.sun.exchange@gmail.com', 
                'theSunExchange\'s contact is the.sun.exchange@gmail.com');
    });

    it('has password', () => {
        assert.strictEqual(theSunExchange.password, '12345678', 'theSunExchange\'s password is 12345678');
    });

    it('has investments', () => {
        assert.deepEqual(theSunExchange.investments, new Map(), 'theSunExchange\'s investments is an empty Map');
    });

    it('has rating', () => {
        assert.strictEqual(theSunExchange.rating, 4.2, 'theSunExchange\'s rating is 4.2');
    });

    it('doesn\'t have test property', () => {
        assert.notExists(theSunExchange.test, 'theSunExchange\'s test property is null or undefined');
    });
});

// Testing model property validators
const projectEmpty = new Project();
const locationEmpty = new Location();
const userEmpty = new User();

const projectMinValidation = new Project({
    size_kw: -1,
    total_cost: -1,
    estimated_annual_return_percent: -1,
    estimated_total_co2_saved_ton: -1,
    estimated_annual_production_kwh: -1,
    year_start_production: 1999,  
});

const projectMaxValidation = new Project({
    year_start_production: new Date().getFullYear() + 2,
});

const userMinValidation = new User({
    rating: -1,
    password: '1234567',
});

const userMaxValidation = new User({
    rating: 5.1,
});

describe('Project model validators are set', () => {
    it('requires name', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.name, 'project\'s name is required');
        });
    });

    it('requires size_kw', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.size_kw, 'project\'s size_kw is required');
        });
    });

    it('size_kw isn\'t lower than 0', () => {
        projectMinValidation.validate((err) => {
            assert.exists(err.errors.size_kw, 'project\'s size_kw isn\'t lower than 0');
        });
    });

    it('requires total_cost', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.total_cost, 'project\'s total_cost is required');
        });
    });

    it('total_cost isn\'t lower than 0', () => {
        projectMinValidation.validate((err) => {
            assert.exists(err.errors.total_cost, 'project\'s total_cost isn\'t lower than 0');
        });
    });

    it('requires total_cost_currency', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.total_cost_currency, 'project\'s total_cost_currency is required');
        });
    });

    it('requires status', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.status, 'project\'s status is required');
        });
    });   
    
    it('requires estimated_annual_return_percent', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.estimated_annual_return_percent, 'project\'s estimated_annual_return_percent is required');
        });
    });

    it('estimated_annual_return_percent isn\'t lower than 0', () => {
        projectMinValidation.validate((err) => {
            assert.exists(err.errors.estimated_annual_return_percent, 'project\'s estimated_annual_return_percent isn\'t lower than 0');
        });
    });
    
    it('requires location', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.location, 'project\'s location is required');
        });
    });

    it('requires owner', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.owner, 'project\'s owner is required');
        });
    });

    it('requires image urls', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.image_urls, 'project\'s image urls is required');
        });
    });

    it('requires estimated_total_co2_saved_ton', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.estimated_total_co2_saved_ton, 'project\'s estimated_total_co2_saved_ton is required');
        });
    });

    it('estimated_total_co2_saved_ton isn\'t lower than 0', () => {
        projectMinValidation.validate((err) => {
            assert.exists(err.errors.estimated_total_co2_saved_ton, 'project\'s estimated_total_co2_saved_ton isn\'t lower than 0');
        });
    });

    it('requires estimated_annual_production_kwh', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.estimated_annual_production_kwh, 'project\'s estimated_annual_production_kwh is required');
        });
    });

    it('estimated_annual_production_kwh isn\'t lower than 0', () => {
        projectMinValidation.validate((err) => {
            assert.exists(err.errors.estimated_annual_production_kwh, 'project\'s estimated_annual_production_kwh isn\'t lower than 0');
        });
    });

    it('requires payment_schedule', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.payment_schedule, 'project\'s payment_schedule is required');
        });
    });

    it('requires risk_level', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.risk_level, 'project\'s risk_level is required');
        });
    });

    it('requires year_start_production', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.year_start_production, 'project\'s year_start_production is required');
        });
    });

    it('year_start_production isn\'t lower than 2000', () => {
        projectMinValidation.validate((err) => {
            assert.exists(err.errors.year_start_production, 'project\'s year_start_production isn\'t lower than 0');
        });
    });

    it('year_start_production isn\'t higher than current year', () => {
        projectMaxValidation.validate((err) => {
            assert.exists(err.errors.year_start_production, 'project\'s year_start_production isn\'t higher than current year');
        });
    });

    it('requires real_annual_production_kwh', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.real_annual_production_kwh, 'project\'s real_annual_production_kwh is required');
        });
    });

    it('requires real_annual_payments', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.real_annual_payments, 'project\'s real_annual_payments is required');
        });
    });

    it('requires payments_currency', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.payments_currency, 'project\'s payments_currency is required');
        });
    });

    it('requires real_annual_return_percent', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.real_annual_return_percent, 'project\'s real_annual_return_percent is required');
        });
    });

    it('requires real_annual_co2_saved_ton', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.real_annual_co2_saved_ton, 'project\'s real_annual_co2_saved_ton is required');
        });
    });
});

describe('Location model require validators are set', () => {
    it('requires city', () => {
        locationEmpty.validate((err) => {
            assert.exists(err.errors.city, 'location model requires city');
        });
    });

    it('requires country', () => {
        locationEmpty.validate((err) => {
            assert.exists(err.errors.country, 'location model requires country');
        });
    });

    it('requires continent', () => {
        locationEmpty.validate((err) => {
            assert.exists(err.errors.continent, 'location model requires continent');
        });
    });
});

describe('User model require validators are set', () => {
    it('requires name', () => {
        userEmpty.validate((err) => {
            assert.exists(err.errors.name, 'user model requires name');
        });
    });

    it('requires contact', () => {
        userEmpty.validate((err) => {
            assert.exists(err.errors.contact, 'user model requires contact');
        });
    });

    it('requires password', () => {
        userEmpty.validate((err) => {
            assert.exists(err.errors.password, 'user model requires password');
        });
    });

    it('password has at least 8 characters', () => {
        userMinValidation.validate((err) => {
            assert.exists(err.errors.password, 'user model\'s password has at least 8 characters');
        });
    });

    it('requires investments', () => {
        userEmpty.validate((err) => {
            assert.exists(err.errors.investments, 'user model requires investments');
        });
    });

    it('doesn\'t require rating', () => {
        userEmpty.validate((err) => {
            assert.notExists(err.errors.rating, 'user model requires rating');
        });
    });

    it('rating is greater than 0', () => {
        userMinValidation.validate((err) => {
            assert.exists(err.errors.rating, 'user model\'s rating is greater than 0');
        });
    });

    it('rating is less or equal to 5', () => {
        userMaxValidation.validate((err) => {
            assert.exists(err.errors.rating, 'user model\'s rating is less or equal to 5');
        });
    });
});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        