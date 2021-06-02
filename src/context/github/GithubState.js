import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import githubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_REPOS,
    GET_USER,
} from '../types';

const GITHUB_API_URL = 'https://api.github.com';
const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

const GithubState = (props) => {
    const initialState = {
        users: [],
        user: {},
        loading: false,
        repos: [],
    };

    const [state, dispatch] = useReducer(githubReducer, initialState);

    //Search users
    const searchUsers = async (text) => {
        setLoading();

        const res = await axios.get(
            `${GITHUB_API_URL}/search/users?q=${text}&client_id=${clientId}&client_secret=${clientSecret}`
        );

        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items,
        })
    };


    //Get user
    const getUserDetails = async (username) => {
        setLoading();

        const res = await axios.get(
            `${GITHUB_API_URL}/users/${username}?client_id=${clientId}&client_secret=${clientSecret}`
        );

        dispatch({
            type: GET_USER,
            payload: res.data,
        })
    };

    //Get repos
    const getRepos = async (username) => {
        setLoading();

        const res = await axios.get(
            `${GITHUB_API_URL}/users/${username}/repos?per_page=5&sort=created:asc&client_id=${clientId}&client_secret=${clientSecret}`
        );

        dispatch({
            type: GET_REPOS,
            payload: res.data,
        })
    };

    //Clear users
    const clearUsers = () => dispatch({type: CLEAR_USERS});
    

    //Set loading
    const setLoading = () => dispatch({ type: SET_LOADING });
    

    return (
        <GithubContext.Provider
            value={{
                users: state.users,
                user: state.user,
                repos: state.repos,
                loading: state.loading,
                searchUsers,
                clearUsers,
                getUserDetails,
                getRepos,
            }}
        >
            {props.children}
        </GithubContext.Provider>
    );
};

export default GithubState;
