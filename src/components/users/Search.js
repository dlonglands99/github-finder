import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
    const githubContext = useContext(GithubContext);
    const alertConext = useContext(AlertContext);

    const { users, searchUsers, clearUsers } = githubContext;
    const { showAlert } = alertConext;

    const [text, setText] = useState('');

    const onChange = (event) => setText(event.target.value);

    const onSubmit = (event) => {
        event.preventDefault();
        if (text === '') {
            showAlert('Please enter something', 'light');
        } else {
            searchUsers(text);
            setText('');
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit} className='form'>
                <input
                    name='text'
                    type='text'
                    plaeholder='Search Users'
                    value={text}
                    onChange={onChange}
                />
                <input
                    type='submit'
                    value='Search'
                    className='btn btn-dark btn-block'
                />
            </form>
            {users.length > 0 && (
                <button
                    className='btn btn-light btn-block'
                    onClick={clearUsers}
                >
                    Clear
                </button>
            )}
        </div>
    );
};

export default Search;
