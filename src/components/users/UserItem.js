import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserItem = ({ user: { avatar_url, login, html_url } }) => {
    return (
        <div className='card text-center'>
            <img
                src={avatar_url}
                className='round-img'
                style={{ width: '60px' }}
            />
            <h3>{login}</h3>
            <Link className='btn btn-dark btn-sm my-1' to={`/user/${login}`}>
                More
            </Link>
        </div>
    );
};

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
};

export default UserItem;
