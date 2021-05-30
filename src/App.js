import React, { Component } from 'react';
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

class App extends Component {
    state = {
        users: [],
        user: {},
        loading: false,
        alert: null,
        repos: [],
    };

    searchUsers = async (text) => {
        this.setState({ loading: true, alert: null });

        const res = await axios.get(
            `${GITHUB_API_URL}/search/users?q=${text}&client_id=${clientId}&client_secret=${clientSecret}`
        );

        this.setState({ users: res.data.items, loading: false });
    };

    getUserDetails = async (username) => {
        this.setState({ loading: true, alert: null });

        const res = await axios.get(
            `${GITHUB_API_URL}/users/${username}?client_id=${clientId}&client_secret=${clientSecret}`
        );

        this.setState({ user: res.data, loading: false });
    };

    getRepos = async (username) => {
        this.setState({ loading: true, alert: null });

        const res = await axios.get(
            `${GITHUB_API_URL}/users/${username}/repos?per_page=5&sort=created:asc&client_id=${clientId}&client_secret=${clientSecret}`
        );

        this.setState({ repos: res.data, loading: false });
    };

    clearUsers = () => {
        this.setState({ users: [], loading: false });
    };

    setAlert = (message, type) => {
        this.setState({ alert: { message, type } });

        setTimeout(() => {
            this.setState({ alert: null });
        }, 5000);
    };

    render() {
        const { users, loading, alert, user, repos } = this.state;

        return (
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
                                        <Search
                                            searchUsers={this.searchUsers}
                                            clearUsers={this.clearUsers}
                                            showClear={
                                                users.length > 0 ? true : false
                                            }
                                            setAlert={this.setAlert}
                                        />
                                        <Users
                                            loading={loading}
                                            users={users}
                                        />
                                    </>
                                )}
                            />
                            <Route exact path='/about' component={About} />
                            <Route
                                exact
                                path='/user/:login'
                                render={(props) => (
                                    <>
                                        <User
                                            {...props}
                                            getUserDetails={this.getUserDetails}
                                            user={user}
                                            loading={loading}
                                            getRepos={this.getRepos}
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
    }
}

export default App;
