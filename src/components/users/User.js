import React, { useEffect, useContext } from 'react';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';
import GithubContext from '../../context/github/githubContext';

const User = ({ match }) => {
    
    const githubContext = useContext(GithubContext);
    const { user, loading, getUserDetails, repos, getRepos } = githubContext;
    
    useEffect(() => {
        getUserDetails(match.params.login);
        getRepos(match.params.login);
    }, []);

    const {
        name,
        avatar_url,
        location,
        bio,
        blog,
        login,
        company,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable,
    } = user;

    return (
        <>
            {loading && <Spinner />}
            <Link to='/' className='btn btn-light'>
                Back to search
            </Link>
            Hireable: {''}
            {hireable ? (
                <i className='fas fa-check text-success' />
            ) : (
                <i className='fas fa-times-circle text-danger' />
            )}
            <div className='card grid-2'>
                <div className='all-center'>
                    <img
                        src={avatar_url}
                        className='round-img'
                        style={avatarStyle}
                    />
                    <h1>Name: {name}</h1>
                    <p>Location: {location}</p>
                </div>
                <div>
                    {bio && (
                        <>
                            <h3>Bio:</h3>
                            <p>{bio}</p>
                        </>
                    )}
                    <a href={html_url} className='btn btn-dark my-1'>
                        Visit Github Profile
                    </a>
                    <ul>
                        <li>
                            {login && (
                                <>
                                    <strong>Username: </strong>
                                    {login}
                                </>
                            )}
                        </li>
                        <li>
                            {company && (
                                <>
                                    <strong>Company: </strong>
                                    {company}
                                </>
                            )}
                        </li>
                        <li>
                            {blog && (
                                <>
                                    <strong>Website: </strong>
                                    {blog}
                                </>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
            <div className='card text-center'>
                <div className='badge badge-primary'>
                    Followers: {followers}
                </div>
                <div className='badge badge-success'>
                    Following: {following}
                </div>
                <div className='badge badge-light'>
                    Public Repos: {public_repos}
                </div>
                <div className='badge badge-dark'>
                    Public Gists: {public_gists}
                </div>
            </div>
            <Repos repos={repos} />
        </>
    );
};

const avatarStyle = {
    width: '150px',
};

export default User;
