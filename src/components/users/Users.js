import React from 'react';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';
import PropTypes from 'prop-types';

const Users = ({ users, loading }) => {
    return (
        <div style={usersStyle}>
            {loading && <Spinner />}
            {users.map((user) => (
                <UserItem key={user.id} user={user} />
            ))}
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
};

const usersStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem',
};

export default Users;
