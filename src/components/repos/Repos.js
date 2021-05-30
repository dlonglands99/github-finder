import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Repos extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        getRepos: PropTypes.func.isRequired,
        repos: PropTypes.array.isRequired,
    };

    componentDidMount() {
        this.props.getRepos(this.props.user.name);
    }

    render() {
        console.log(this.props.repos);
        return <div></div>;
    }
}

export default Repos;
