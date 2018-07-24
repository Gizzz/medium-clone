import React from 'react';
import PropTypes from 'prop-types';

const GlobalContext = React.createContext();

class ContextWrapper extends React.Component {
  // eslint-disable-next-line
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

const withContext = (Component) => {
  const wrapper = (props) => (
    <GlobalContext.Consumer>
      {(context) => (<Component {...props} context={context} />)}
    </GlobalContext.Consumer>
  );

  return wrapper;
};

const { Consumer: GlobalContextConsumer } = GlobalContext;

export { ContextWrapper };
export { withContext };
export { GlobalContextConsumer };

/* eslint react/no-unused-state: off */
