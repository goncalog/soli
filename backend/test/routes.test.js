const contentRouter = require('../routes/content');

const mongooseConnection = require('../database/mongoConfigTesting');
const createDatabaseItems = require('../database/createDatabaseItems');
require('dotenv').config({ path: __dirname + '/../.env' });

const session = require('express-session');
const passport = require('../auth/passportConfig');

const cookieParser = require('cookie-parser');
const request = require('supertest');
const express = require('express');

const app = express();

app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));

app.use('/content', contentRouter);

before(function () {
    createDatabaseItems();
});

after(function () {
    mongooseConnection.close();
});

describe('Routes testing', function () {
    it('content route works', () => {
        return request(app)
            .get('/content')
            .expect('Content-type', /json/)
            .expect({ title: 'Soli' })
            .expect(200)
    });

    it('all projects route works', () => {
        return request(app)
            .get('/content/projects')
            .expect('Content-type', /json/)
            .expect(hasTitle)
            .expect(hasProjects)
            .expect(isProject)
            .expect(200)
        
        function hasTitle(res) {
            if (!(res.body.title === 'List of all Projects')) {
                throw new Error("Wrong title");  
            } 
        }

        function hasProjects(res) {
            if (!(Object.keys(res.body.projects).length === 7)) {
                throw new Error("Doesn\'t have all the db projects");
            }
        }

        function isProject(res) {
            for (let key in res.body.projects) {
                if (!(Object.keys(res.body.projects[key]).length === 21)) {
                    throw new Error("Not an instance of Project");
                }
            }
        }
    });

    it('unique project route works', () => {
        return request(app)
            .get(`/content/projects`)
            .expect('Content-type', /json/)
            .expect(200)
            .then((res) => {
                let keys = Object.keys(res.body.projects);
                let id = res.body.projects[keys[0]]._id;

                return request(app)
                .get(`/content/project/${id}`)
                .expect('Content-type', /json/)
                .expect(hasTitle)
                .expect(isProject)
                .expect(200)
            });

            function hasTitle(res) {
                if (!(res.body.title === `Unique Project with id ${res.body.project._id}`)) {
                    throw new Error("Wrong title");  
                } 
            }
    
            function isProject(res) {
                if (!(Object.keys(res.body.project).length === 21)) {
                    throw new Error("Not an instance of Project");
                }
            }
    });

    it('route to get data to update project works', () => {
        return request(app)
            .get('/content/user/xpto/project/12345/update')
            .expect('Content-type', /json/)
            .expect({ message: 'Unauthorized: User not logged in' })
            .expect(401)
    });
    
    it('route to update project works', () => {
        return request(app)
            .put('/content/user/xpto/project/12345/update')
            .expect('Content-type', /json/)
            .expect({ message: 'Unauthorized: User not logged in' })
            .expect(401)
    });

    it('route to delete project works', () => {
        return request(app)
            .delete('/content/user/xpto/project/12345/delete')
            .expect('Content-type', /json/)
            .expect({ message: 'Unauthorized: User not logged in' })
            .expect(401)
    });

    it('has route to invest in project', () => {
        return request(app)
            .put('/content/user/xpto/project/12345/invest')
            .expect('Content-type', /json/)
            .expect({ message: 'Unauthorized: User not logged in' })
            .expect(401)
    });

    it('all locations route works', () => {
        return request(app)
            .get('/content/locations')
            .expect('Content-type', /json/)
            .expect(hasTitle)
            .expect(hasLocations)
            .expect(isLocation)
            .expect(200)
        
        function hasTitle(res) {
            if (!(res.body.title === 'List of all locations')) {
                throw new Error("Wrong title");  
            } 
        }

        function hasLocations(res) {
            if (!(Object.keys(res.body.locations).length === 5)) {
                throw new Error("Doesn\'t have all the db locations");
            }
        }

        function isLocation(res) {
            for (let key in res.body.locations) {
                if (!(Object.keys(res.body.locations[key]).length === 5)) {
                    throw new Error("Not an instance of Location");
                }
            }
        }
    });

    it('route for user sign up works', () => {
        return request(app)
            .post('/content/user/signup')
            .type('form')
            .send({ name: 'Miss Zoe', contact: 'zoe@gmail.com', password: '12345678' })
            .expect(function(res) {
                if (res.body.userId) res.body.userId = '555666777';
              })
            .expect('Content-type', /json/)
            .expect({ title: 'Miss Zoe signed up', userId: '555666777' })
            .expect(200)
    });

    it('route for user log in works', () => {
        return request(app)
            .post('/content/user/login')
            .type('form')
            .send({ username: 'zoe@gmail.com', password: '12345678' })
            .expect(function(res) {
                if (res.body.userId) res.body.userId = '555666777';
              })
            .expect('Content-type', /json/)
            .expect({ title: 'Miss Zoe logged in', userId: '555666777' })
            .expect(200)
    });

    it('route for user log out works', () => {
        return request(app)
            .post('/content/user/logout')
            .expect('Content-type', /json/)
            .expect({ title: 'User logged out' })
            .expect(200)
    });

    it('route to check the log in auth check works', () => {
        return request(app)
            .get('/content/user/checkAuth')
            .expect('Content-type', /json/)
            .expect({ message: 'Unauthorized: User not logged in' })
            .expect(401)
    });

    it('has route for getting a user\'s data', () => {
        return request(app)
            .get('/content/user/5f80744b1a698848220d9e1e')
            .expect('Content-type', /json/)
            .expect({ message: 'Unauthorized: User not logged in' })
            .expect(401)
    });

    it('route for getting a user\'s list of projects available for investment', () => {
        return request(app)
            .get('/content/user/5f80744b1a698848220d9e1e/projects')
            .expect('Content-type', /json/)
            .expect({ "message": "Unauthorized: User not logged in" })
            .expect(401)
    });

    it('route for sending message to user works', () => {
        return request(app)
            .post('/content/user/12345/contact')
            .type('form')
            .send({ to: 'tomasa.hintz99@ethereal.email', subject: '', from: '', text: '' })
            .expect('Content-type', /json/)
            .expect({ title: 'Contact user with id 12345' })
            .expect(200)
    });

    it('testing route works', () => {
        return request(app)
            .post('/content/test')
            .type('form')
            .send({ item: 'hello' })
            .then(() => {
                return request(app)
                    .get('/content/test')
                    .expect({ testArray: ['hello'] })
            })
    });
});
