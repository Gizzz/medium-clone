import React from 'react';
import PropTypes from 'prop-types';

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
