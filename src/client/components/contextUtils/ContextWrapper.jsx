import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import GlobalContext from './GlobalContext';

class ContextWrapper extends React.Component {
  // eslint-disable-next-line react/sort-comp
  setUser = (user) => {
    this.setState({ user });
  }

  state = {
    user: null,
    setUser: this.setUser,
  }

  componentDidMount() {
    const token = window.localStorage.getItem('token');
    const user = JSON.parse(window.localStorage.getItem('user'));
    const isDataAvailable = token && user;

    if (isDataAvailable) {
      this.setUser(user);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }

  render() {
    return (
      <GlobalContext.Provider value={this.state}>
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}

ContextWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextWrapper;

/* eslint react/no-unused-state: off */
