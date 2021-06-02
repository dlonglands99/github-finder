import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/layout/NavBar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/users/Alert';
import About from './components/pages/About';
import User from './components/users/User';

const GITHUB_API_URL = 'https://api.github.com';
const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

const App = () => {
    
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const [repos, setRepos] = useState([]);

    const searchUsers = async (text) => {
        setLoading(true);
        setAlert(null);

        const res = await axios.get(
            `${GITHUB_API_URL}/search/users?q=${text}&client_id=${clientId}&client_secret=${clientSecret}`
        );

        setUsers(res.data.items);
        setLoading(false);
    };

    const getUserDetails = async (username) => {
        setLoading(true);
        setAlert(null);

        const res = await axios.get(
            `${GITHUB_API_URL}/users/${username}?client_id=${clientId}&client_secret=${clientSecret}`
        );

        setUser(res.data);
        setLoading(false);
    };

    const getRepos = async (username) => {
        setLoading(true);
        setAlert(null);

        const res = await axios.get(
            `${GITHUB_API_URL}/users/${username}/repos?per_page=5&sort=created:asc&client_id=${clientId}&client_secret=${clientSecret}`
        );

        setRepos(res.data);
        setLoading(false);
    };

    const clearUsers = () => {
        setUsers([]);
        setLoading(false);
    };

    const showAlert = (message, type) => {
        setAlert({message, type});

        setTimeout(() => {
            setAlert(null);
        }, 5000);
    };

    return (
        <Router>
            <div className="App">
                <NavBar />
                <div className="container">
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={(props) => (
                                <>
                                    <Alert alert={alert} />
                                    <Search
                                        searchUsers={searchUsers}
                                        clearUsers={clearUsers}
                                        showClear={
                                            users.length > 0 ? true : false
                                        }
                                        setAlert={showAlert}
                                    />
                                    <Users loading={loading} users={users} />
                                </>
                            )}
                        />
                        <Route exact path="/about" component={About} />
                        <Route
                            exact
                            path="/user/:login"
                            render={(props) => (
                                <>
                                    <User
                                        {...props}
                                        getUserDetails={getUserDetails}
                                        user={user}
                                        loading={loading}
                                        getRepos={getRepos}
                                        repos={repos}
                                    />
                                </>
                            )}
                        />
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default App;
