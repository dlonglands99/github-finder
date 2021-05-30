import React, { Component } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';

class User extends Component {
    static propTypes = {
        getUserDetails: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        loading: PropTypes.bool.isRequired,
        getRepos: PropTypes.func.isRequired,
        repos: PropTypes.array.isRequired,
    };

    componentDidMount() {
        this.props.getUserDetails(this.props.match.params.login);
    }

    render() {
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
        } = this.props.user;

        const { loading, user, getRepos, repos } = this.props;

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
                <Repos user={user} getRepos={getRepos} repos={repos} />
            </>
        );
    }
}

const avatarStyle = {
    width: '150px',
};

export default User;