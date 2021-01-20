const assert = require('chai').assert;
const Project = require('../models/project');
const Make = require('../models/make');
const Model = require('../models/model');
const Location = require('../models/location');
const Owner = require('../models/owner');

const tesla = new Make({
    name: "Tesla",
    test: 2,
});

const s70 = new Model({
    make: tesla,
    name: 'S',
    secondary_name: '70',
    performance: {
        horsepower: 500,
        miles_per_kwh: 3.5,
        top_speed_mph: 155,
        zero_to_sixty_mph: 2.3,
    },
    charging: {
        range_miles: 250,
        battery_size_kwh: 65,
        charge_cost: 5,
        hours_to_charge: 7,
    },
    rating: 4.75,
    test: 2,
});

const london = new Location({
    name: 'London',
    city: 'London',
    country: 'UK',
    test: 2,
});

const missTesla = new Owner({
    name: 'Miss Tesla',
    contact: 'miss.tesla@gmail.com',
    rating: 4.2,
    password: '12345678',
    test: 2,
});

const date = new Date;
const includedExtras = ['Insurance', 'Maintenance', 'MOT'];
const equipmentAndOptions = ['Air conditioning', 'Heated seats', 'Brake assist'];
const imageUrls = ['https://placeholder.com/image111', 'https://placeholder.com/image222']; 

const project = new Project({
    make: tesla,
    model: s70,
    year: 2018,
    price_per_day: 50,
    deposit: 250,
    min_rental_period: '4 weeks',
    included_extras: includedExtras,
    mileage: 18000,
    location: london,
    image_urls: imageUrls,
    owner: missTesla,
    list_date: date,
    equipment_and_options: equipmentAndOptions,
    exterior: {
        body_style: 'Sedan',
        colour: 'Blue',
    },
    interior: {
        seating: 5,
        colour: 'Black',
    },
    vehicle_identification_number: '1M8GDM9AXKP042788',
    full_vehicle_inspection: true,
    pco_license: true,
    test: 2,
});

describe('Project model', () => {
    it('Project model exists', () => {
        assert.instanceOf(project, Project, 'project is instance of Project');
    });

    it('Project model has 18 properties', () => {
        assert.strictEqual(Object.keys(project.schema.tree).length, 22, 'project has 22 properties');
    });

    it('Project model has make', () => {
        assert.instanceOf(project.make, Make, 'project\'s make is instance of Make');
    });

    it('Project model has model', () => {
        assert.instanceOf(project.model, Model, 'project\'s model is instance of Model');
    });

    it('Project model has year', () => {
        assert.strictEqual(project.year, 2018, 'project\'s year is 2018');
    });

    it('Project model has price per day', () => {
        assert.strictEqual(project.price_per_day, 50, 'project\'s price per day is 50');
    });

    it('Project model has deposit', () => {
        assert.strictEqual(project.deposit, 250, 'project\'s deposit is 250');
    });

    it('Project model has min rental period', () => {
        assert.strictEqual(project.min_rental_period, '4 weeks', 'project\'s min rental period is 4 weeks');
    });

    it('has included extras array', () => {
        assert.instanceOf(project.included_extras, Array, 'project\'s included extras is an Array');
        assert.strictEqual(project.included_extras.length, 3, 'project\'s included extras has 3 items');
        project.included_extras.forEach((extra, index) => {
            assert.strictEqual(extra, includedExtras[index], 
                    'project\'s included extras is an array with Insurance, Maintenance and MOT');
        });
    });

    it('Project model has mileage', () => {
        assert.strictEqual(project.mileage, 18000, 'project\'s year is 18000');
    });

    it('Project model has location', () => {
        assert.instanceOf(project.location, Location, 'project\'s location is instance of Location');
    });

    it('has image urls array', () => {
        assert.instanceOf(project.image_urls, Array, 'project\'s image urls is an Array');
        assert.strictEqual(project.image_urls.length, 2, 'project\'s image urls has 2 items');
        project.image_urls.forEach((url, index) => {
            assert.strictEqual(url, imageUrls[index], 
                    'project\'s image urls is an array with https://placeholder.com/image111 and https://placeholder.com/image222');
        });
    });

    it('Project model has owner', () => {
        assert.instanceOf(project.owner, Owner, 'project\'s owner is instance of Owner');
    });

    it('Project model has list date', () => {
        assert.strictEqual(project.list_date, date, `project\'s list date is ${date}`);
    });

    it('has equipment and options array', () => {
        assert.instanceOf(project.equipment_and_options, Array, 'project\'s equipment and options is an Array');
        assert.strictEqual(project.equipment_and_options.length, 3, 'project\'s equipment and options has 3 items');
        project.equipment_and_options.forEach((item, index) => {
            assert.strictEqual(item, equipmentAndOptions[index], 
                    'project\'s equipment and options is an array with Air conditioning, Heated seats and Brake assist');
        });
    });

    it('has exterior object', () => {
        assert.instanceOf(project.exterior, Object, 'project\'s exterior is an object');
    });

    it('has exterior object with 2 children', () => {
        assert.strictEqual(Object.keys(project.exterior).length, 2, 'project\'s exterior has 2 children');
        assert.strictEqual(project.exterior.body_style, 'Sedan', 'project\'s body style is Sedan');
        assert.strictEqual(project.exterior.colour, 'Blue', 'project\'s exterior colour is Blue');    
    });

    it('has interior object with 2 children', () => {
        assert.instanceOf(project.interior, Object, 'project\'s interior is an object');
        assert.strictEqual(Object.keys(project.interior).length, 2, 'project\'s interior has 2 children');
        assert.strictEqual(project.interior.seating, 5, 'project\'s seating is 5');
        assert.strictEqual(project.interior.colour, 'Black', 'project\'s interior colour is Black');    
    });

    it('Project model has vehicle identification number', () => {
        assert.strictEqual(project.vehicle_identification_number, '1M8GDM9AXKP042788', 
                'project\'s vehicle identification number is 1M8GDM9AXKP042788');
    });

    it('Project model has full vehicle inspection', () => {
        assert.strictEqual(project.full_vehicle_inspection, true, 'project\'s full vehicle inspection is true');
    });

    it('Project model has pco license', () => {
        assert.strictEqual(project.pco_license, true, 'project\'s pco license is true');
    });

    it('Project model has url', () => {
        assert.strictEqual(project.url, `/content/project/${project._id}`, `project\'s url is /content/project/${project._id}`);
    });

    it('Project model doesn\'t have test property', () => {
        assert.notExists(project.test, 'project\'s test property is null or undefined');
    });
});

describe('Make model', () => {
    it('Make model exists', () => {
        assert.instanceOf(tesla, Make, 'tesla is instance of Make');
    });

    it('Make model has 5 properties', () => {
        assert.strictEqual(Object.keys(tesla.schema.tree).length, 5, 'tesla has 5 properties');
    });

    it('Make model has name', () => {
        assert.strictEqual(tesla.name, 'Tesla', 'tesla\'s make is Tesla');
    });

    it('Make model has url', () => {
        assert.strictEqual(tesla.url, `/content/make/${tesla._id}`, 
                `tesla\'s url is /content/make/${tesla._id}`);
    });

    it('Make model doesn\'t have test property', () => {
        assert.notExists(tesla.test, 'tesla\'s test property is null or undefined');
    });
});

describe('Model model', () => {
    it('Model model exists', () => {
        assert.instanceOf(s70, Model, 's70 is instance of Model');
    });

    it('Model model has 10 properties', () => {
        assert.strictEqual(Object.keys(s70.schema.tree).length, 10, 's70 has 10 properties');
    });

    it('Model model has make', () => {
        assert.instanceOf(s70.make, Make, 's70\'s make is instance of Make');
    });

    it('Model model has name', () => {
        assert.strictEqual(s70.name, 'S', 's70\'s name is S');
    });

    it('Model model has secondary name', () => {
        assert.strictEqual(s70.secondary_name, '70', 's70\'s secondary name is 70');
    });
    
    it('has performance object', () => {
        assert.instanceOf(s70.performance, Object, 's70\'s performance is an object');
    });

    it('has performance object with 4 children', () => {
        assert.strictEqual(Object.keys(s70.performance).length, 4, 's70\'s performance has 4 children');
        assert.strictEqual(s70.performance.horsepower, 500, 's70\'s horsepower is 500');
        assert.strictEqual(s70.performance.miles_per_kwh, 3.5, 's70\'s miles per kwh is 3.5');
        assert.strictEqual(s70.performance.top_speed_mph, 155, 's70\'s top speed mph is 155');
        assert.strictEqual(s70.performance.zero_to_sixty_mph, 2.3, 's70\'s 0-60mph is 2.3');
    
    });

    it('has charging object', () => {
        assert.instanceOf(s70.charging, Object, 's70\'s charging is an object');
    });

    it('has charging object with 4 children', () => {
        assert.strictEqual(Object.keys(s70.charging).length, 4, 's70\'s charging has 4 children');
        assert.strictEqual(s70.charging.range_miles, 250, 's70\'s range is 250');
        assert.strictEqual(s70.charging.battery_size_kwh, 65, 's70\'s battery size is 65');
        assert.strictEqual(s70.charging.charge_cost, 5, 's70\'s charge cost is 5');
        assert.strictEqual(s70.charging.hours_to_charge, 7, 's70\'s hours to charge is 7');
    
    });

    it('Model model has rating', () => {
        assert.strictEqual(s70.rating, 4.75, 's70\'s rating is 4.75');
    });

    it('Model model has url', () => {
        assert.strictEqual(s70.url, `/content/model/${s70._id}`, 
                `s70\'s url is /content/model/${s70._id}`);
    });

    it('Model model doesn\'t have test property', () => {
        assert.notExists(s70.test, 's70\'s test property is null or undefined');
    });
});

describe('Location model', () => {
    it('Location model exists', () => {
        assert.instanceOf(london, Location, 'london is instance of Location');
    });

    it('Location model has 6 properties', () => {
        assert.strictEqual(Object.keys(london.schema.tree).length, 6, 'london has 6 properties');
    });

    it('Location model has name', () => {
        assert.strictEqual(london.name, 'London', 'london\'s name is London');
    });

    it('Location model has city', () => {
        assert.strictEqual(london.city, 'London', 'london\'s city is London');
    });

    it('Location model has country', () => {
        assert.strictEqual(london.country, 'UK', 'london\'s country is UK');
    });

    it('Location model doesn\'t have test property', () => {
        assert.notExists(london.test, 'london\'s test property is null or undefined');
    });
});

describe('Owner model', () => {
    it('Owner model exists', () => {
        assert.instanceOf(missTesla, Owner, 'missTesla is instance of Owner');
    });

    it('Owner model has 7 properties', () => {
        assert.strictEqual(Object.keys(missTesla.schema.tree).length, 7, 'missTesla has 7 properties');
    });

    it('Owner model has name', () => {
        assert.strictEqual(missTesla.name, 'Miss Tesla', 'missTesla\'s name is Miss Tesla');
    });

    it('Owner model has contact', () => {
        assert.strictEqual(missTesla.contact, 'miss.tesla@gmail.com', 
                'missTesla\'s contact is miss.tesla@gmail.com');
    });

    it('Owner model has rating', () => {
        assert.strictEqual(missTesla.rating, 4.2, 'missTesla\'s rating is 4.2');
    });

    it('has password', () => {
        assert.strictEqual(missTesla.password, '12345678', 'missTesla\'s password is 12345678');
    });

    it('Owner model doesn\'t have test property', () => {
        assert.notExists(missTesla.test, 'missTesla\'s test property is null or undefined');
    });
});

// Testing model property validators
const projectEmpty = new Project();
const makeEmpty = new Make();
const modelEmpty = new Model();
const locationEmpty = new Location();
const ownerEmpty = new Owner();

const projectMinValidation = new Project({
    year: 1899,
    price_per_day: -1,
    deposit: -1,
    mileage: -1,
    interior: {
        seating: 0,
    },
    vehicle_identification_number: 'xxxxxxxxxxxxxxxx',
});

const projectMaxValidation = new Project({
    year: date.getFullYear() + 1,
    vehicle_identification_number: 'xxxxxxxxxxxxxxxxxx',
});

const modelMinValidation = new Model({
    performance: {
        horsepower: -1,
        miles_per_kwh: -1,
        top_speed_mph: -1,
        zero_to_sixty_mph: -1,
    },
    charging: {
        range: -1,
        battery_size_kwh: -1,
        charge_cost: -1,
        hours_to_charge: -1,
    },
    rating: -1,
});

const modelMaxValidation = new Model({
    rating: 5.1,
});

const ownerMinValidation = new Owner({
    rating: -1,
    password: '1234567',
});

const ownerMaxValidation = new Owner({
    rating: 5.1,
});

describe('Project model validators are set', () => {
    it('Project model requires make', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.make, 'project\'s make is required');
        });
    });

    it('Project model requires model', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.model, 'project\'s model is required');
        });
    });

    it('Project model requires year', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.year, 'project\'s year is required');
        });
    });

    it('Project model\'s year isn\'t lower than 1900', () => {
        projectMinValidation.validate((err) => {
            assert.exists(err.errors.year, 'project\'s year isn\'t lower than 1900');
        });
    });

    it('Project model\'s year isn\'t greater than current year', () => {
        projectMaxValidation.validate((err) => {
            assert.exists(err.errors.year, 'project\'s year isn\'t greater than current year');
        });
    });

    it('Project model requires price per day', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.price_per_day, 'project\'s price per day is required');
        });
    });

    it('Project model\'s price per day isn\'t lower than 0', () => {
        projectMinValidation.validate((err) => {
            assert.exists(err.errors.price_per_day, 'project\'s price per day isn\'t lower than 0');
        });
    });

    it('Project model requires deposit', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.deposit, 'project\'s deposit is required');
        });
    });

    it('Project model\'s deposit isn\'t lower than 0', () => {
        projectMinValidation.validate((err) => {
            assert.exists(err.errors.deposit, 'project\'s deposit isn\'t lower than 0');
        });
    });

    it('Project model requires min rental period', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.min_rental_period, 'project\'s min rental period is required');
        });
    });

    it('Project model requires included extras', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.included_extras, 'project\'s included extras is required');
        });
    });

    it('Project model requires mileage', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.mileage, 'project\'s mileage is required');
        });
    });

    it('Project model\'s mileage isn\'t lower than 0', () => {
        projectMinValidation.validate((err) => {
            assert.exists(err.errors.mileage, 'project\'s mileage isn\'t lower than 0');
        });
    });

    it('Project model requires location', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.location, 'project\'s location is required');
        });
    });

    it('Project model requires image urls', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.image_urls, 'project\'s image urls is required');
        });
    });

    it('Project model requires owner', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.owner, 'project\'s owner is required');
        });
    });

    it('Project model requires list date', () => {
        projectEmpty.validate((err) => {
            assert.notExists(err.errors.list_date, 'project\'s list date has default value, so no error occurs');
        });
    });

    it('Project model requires equipment and options', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.equipment_and_options, 'project\'s equipment and options is required');
        });
    });

    it('Project model requires exterior\'s colour property', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors['exterior.colour'], 'project\'s exterior colour is required');
        });
    });

    it('Project model doesn\'t requires exterior\'s body style property', () => {
        projectEmpty.validate((err) => {
            assert.notExists(err.errors['exterior.body_style'], 'project\'s body style isn\'t required');
        });
    });

    it('Project model requires interior\'s properties', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors['interior.seating'], 'project\'s seating is required');
            assert.exists(err.errors['interior.colour'], 'project\'s interior colour is required');
        });
    });

    it('Project model\'s seating isn\'t lower than 1', () => {
        projectMinValidation.validate((err) => {
            assert.exists(err.errors['interior.seating'], 'project\'s seating isn\'t lower than 1');
        });
    });

    it('Project model requires vehicle identification number', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.vehicle_identification_number, 'project\'s vehicle identification number is required');
        });
    });

    it('Project model\'s vehicle identification number has length of 17', () => {
        projectMinValidation.validate((err) => {
            assert.exists(err.errors.vehicle_identification_number, 
                    'project\'s vehicle identification number has length of 17');
        });
    });

    it('Project model\'s vehicle identification number has length of 17', () => {
        projectMaxValidation.validate((err) => {
            assert.exists(err.errors.vehicle_identification_number, 
                    'project\'s vehicle identification number has length of 17');
        });
    });

    it('Project model requires full vehicle inspection', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.full_vehicle_inspection, 'project\'s full vehicle inspection is required');
        });
    });

    it('Project model requires pco license', () => {
        projectEmpty.validate((err) => {
            assert.exists(err.errors.pco_license, 'project\'s pco license is required');
        });
    });
});

describe('Make model require validators are set', () => {
    it('Make model requires name', () => {
        makeEmpty.validate((err) => {
            assert.exists(err.errors.name, 'make model requires name');
        });
    });
});

describe('Model model require validators are set', () => {
    it('Model model requires make', () => {
        modelEmpty.validate((err) => {
            assert.exists(err.errors.make, 'model model requires make');
        });
    });

    it('Model model requires name', () => {
        modelEmpty.validate((err) => {
            assert.exists(err.errors.name, 'model model requires name');
        });
    });

    it('Model model doesn\'t require secondary name', () => {
        modelEmpty.validate((err) => {
            assert.notExists(err.errors.secondary_name, 'model model doesn\'t require secondary name');
        });
    });

    it('Model model requires performance\'s 3 properties', () => {
        modelEmpty.validate((err) => {
            assert.exists(err.errors['performance.horsepower'], 'model model requires horsepower');
            assert.exists(err.errors['performance.top_speed_mph'], 'model model requires top speed mph');
            assert.exists(err.errors['performance.zero_to_sixty_mph'], 'model model requires 0-60mph');
        });
    });

    it('Model model doesn\'t require performance\'s miles per kwh', () => {
        modelEmpty.validate((err) => {
            assert.notExists(err.errors['performance.miles_per_kwh'], 'model model doesn\'t require miles per kwh');
        });
    });

    it('Model model has horsepower with value greater than 0', () => {
        modelMinValidation.validate((err) => {
            assert.exists(err.errors['performance.horsepower'], 'model model\'s horsepower is greater than 0');
        });
    });

    it('Model model has miles per kwh with value greater than 0', () => {
        modelMinValidation.validate((err) => {
            assert.exists(err.errors['performance.miles_per_kwh'], 'model model\'s miles per kwh is greater than 0');
        });
    });

    it('Model model has top speed mph with value greater than 0', () => {
        modelMinValidation.validate((err) => {
            assert.exists(err.errors['performance.top_speed_mph'], 'model model\'s top speed mph is greater than 0');
        });
    });

    it('Model model has 0-60mph with value greater than 0', () => {
        modelMinValidation.validate((err) => {
            assert.exists(err.errors['performance.zero_to_sixty_mph'], 'model model\'s 0-60mph is greater than 0');
        });
    });

    it('Model model requires charging\'s 4 properties', () => {
        modelEmpty.validate((err) => {
            assert.exists(err.errors['charging.range_miles'], 'model model requires range');
            assert.exists(err.errors['charging.battery_size_kwh'], 'model model requires battery size');
            assert.exists(err.errors['charging.charge_cost'], 'model model requires charge cost');
            assert.exists(err.errors['charging.hours_to_charge'], 'model model requires hours to charge');
        });
    });

    it('Model model has range with value greater than 0', () => {
        modelMinValidation.validate((err) => {
            assert.exists(err.errors['charging.range_miles'], 'model model\'s range is greater than 0');
        });
    });

    it('Model model has battery size with value greater than 0', () => {
        modelMinValidation.validate((err) => {
            assert.exists(err.errors['charging.battery_size_kwh'], 'model model\'s battery size is greater than 0');
        });
    });

    it('Model model has charge cost with value greater than 0', () => {
        modelMinValidation.validate((err) => {
            assert.exists(err.errors['charging.charge_cost'], 'model model\'s charge cost is greater than 0');
        });
    });

    it('Model model has hours to charge with value greater than 0', () => {
        modelMinValidation.validate((err) => {
            assert.exists(err.errors['charging.hours_to_charge'], 'model model\'s hours to charge is greater than 0');
        });
    });

    it('Model model requires rating', () => {
        modelEmpty.validate((err) => {
            assert.exists(err.errors.rating, 'model model requires rating');
        });
    });

    it('Model model\'s rating is greater than 0', () => {
        modelMinValidation.validate((err) => {
            assert.exists(err.errors.rating, 'model model\'s rating is greater than 0');
        });
    });

    it('Model model\'s rating is less or equal to 5', () => {
        modelMaxValidation.validate((err) => {
            assert.exists(err.errors.rating, 'model model\'s rating is less or equal to 5');
        });
    });
});

describe('Location model require validators are set', () => {
    it('Location model requires name', () => {
        locationEmpty.validate((err) => {
            assert.exists(err.errors.name, 'location model requires name');
        });
    });

    it('Location model requires city', () => {
        locationEmpty.validate((err) => {
            assert.exists(err.errors.city, 'location model requires city');
        });
    });

    it('Location model requires country', () => {
        locationEmpty.validate((err) => {
            assert.exists(err.errors.country, 'location model requires country');
        });
    });
});

describe('Owner model require validators are set', () => {
    it('Owner model requires name', () => {
        ownerEmpty.validate((err) => {
            assert.exists(err.errors.name, 'owner model requires name');
        });
    });

    it('Owner model requires contact', () => {
        ownerEmpty.validate((err) => {
            assert.exists(err.errors.contact, 'owner model requires contact');
        });
    });

    it('Owner model requires rating', () => {
        ownerEmpty.validate((err) => {
            assert.exists(err.errors.rating, 'owner model requires rating');
        });
    });

    it('Owner model\'s rating is greater than 0', () => {
        ownerMinValidation.validate((err) => {
            assert.exists(err.errors.rating, 'owner model\'s rating is greater than 0');
        });
    });

    it('Owner model\'s rating is less or equal to 0', () => {
        ownerMaxValidation.validate((err) => {
            assert.exists(err.errors.rating, 'owner model\'s rating is less or equal to 0');
        });
    });

    it('Owner model requires password', () => {
        ownerEmpty.validate((err) => {
            assert.exists(err.errors.password, 'owner model requires password');
        });
    });

    it('Owner model\'s password has at least 8 characters', () => {
        ownerMinValidation.validate((err) => {
            assert.exists(err.errors.password, 'owner model\'s password has at least 8 characters');
        });
    });
});
