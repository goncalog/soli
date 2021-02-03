import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Projects from './Projects';
import Contact from './Contact';
import Auth from './Auth';
import Navigation from './Navigation';
import Project from './Project';
import LogOut from './LogOut';
import withAuth from '../support/withAuth';
import OwnerProjects from './OwnerProjects';
import OwnerProject from './OwnerProject';
import Form from './Form';
import Invest from './Invest';

function AppRouter() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState(undefined);

    const handleAuthChange = (userId) => {setUserId(userId)};

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        let url = (process.env.NODE_ENV === 'production')
                ? '/content/user/checkAuth' 
                : `${process.env.REACT_APP_SERVER_URL}/content/user/checkAuth`;

        fetch(url, { credentials: 'include' })
            .then(res => {
                if (res.status === 200) {
                    setLoggedIn(true);
                    return res.json();
                } else {
                    console.log('User not logged in');
                    setLoggedIn(false);
                    setUserId(undefined);
                    return;
                }
            })
            .then(res => {
                if (res) {
                    setUserId(res.userId);
                }
            })
            .catch(err => {
                console.error(err);
            });
      });

      let projectsUrl = (process.env.NODE_ENV === 'production')
                ? '/content/projects'
                : `${process.env.REACT_APP_SERVER_URL}/content/projects`;

    return (
        <Router>
            <Navigation loggedIn={loggedIn} userId={userId}/>
            <Switch>
                <Route 
                    path='/' 
                    exact
                    render={(props) => (<Home loggedIn={loggedIn} userId={userId} {...props} />)} 
                >
                </Route>
                <Route 
                    path='/projects' 
                    exact 
                    render={(props) => (<Projects fetchUrl={projectsUrl} {...props} />)}
                >
                </Route>
                <Route path='/project/:id' exact component={Project}></Route>
                <Route path='/contact' exact component={Contact}></Route>
                <Route 
                    path='/project/:id/invest' 
                    exact
                    render={(props) => (<Invest loggedIn={loggedIn} userId={userId} {...props} />)} 
                >
                </Route>
                <Route 
                    path='/user/signup'
                    exact
                    render={(props) => (<Auth onAuth={handleAuthChange} {...props} />)}
                >
                </Route>
                <Route 
                    path='/user/login'
                    exact
                    render={(props) => (<Auth onAuth={handleAuthChange} {...props} />)}
                >
                </Route>
                <Route 
                    path='/user/logout'
                    exact 
                    render={(props) => (<LogOut onAuth={handleAuthChange} {...props} />)}
                >
                </Route>
                <Route path='/user/:id/projects' component={withAuth(OwnerProjects)}></Route>
                <Route path='/user/:id/project/create' component={withAuth(Form)}></Route>
                <Route path='/user/:id/project/:id/update' component={withAuth(Form)}></Route>
                <Route path='/user/:id/project/:id' component={withAuth(OwnerProject)}></Route>
            </Switch>
        </Router>
    );
}

export default AppRouter;
