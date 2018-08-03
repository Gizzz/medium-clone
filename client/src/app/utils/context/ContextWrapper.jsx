import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import GlobalContext from './GlobalContext';
import storageHelper from '../storageHelper';

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
    const globalData = storageHelper.getData();
    if (!globalData) { return; }

    const { user, token } = globalData;
    const tokenPayload = jwtDecode(token);
    // jwt's 'exp' prop must be multiplied by 1000 to represent date as number
    const tokenExpiryDate = new Date(tokenPayload.exp * 1000);
    const currentDate = new Date(Date.now());

    if (currentDate >= tokenExpiryDate) {
      storageHelper.removeData();
      return;
    }

    this.setUser(user);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
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
