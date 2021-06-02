import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/layout/NavBar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/users/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/github/GithubState';

const App = () => {
    const [alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
        setAlert({ message, type });

        setTimeout(() => {
            setAlert(null);
        }, 5000);
    };

    return (
        <GithubState>
            <Router>
                <div className='App'>
                    <NavBar />
                    <div className='container'>
                        <Switch>
                            <Route
                                exact
                                path='/'
                                render={(props) => (
                                    <>
                                        <Alert alert={alert} />
                                        <Search setAlert={showAlert} />
                                        <Users />
                                    </>
                                )}
                            />
                            <Route exact path='/about' component={About} />
                            <Route
                                exact
                                path='/user/:login'
                                component={User}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        </GithubState>
    );
};

export default App;
