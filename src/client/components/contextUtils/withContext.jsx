import React from 'react';

import GlobalContext from './GlobalContext';

const withContext = (Component) => {
  const wrapper = (props) => (
    <GlobalContext.Consumer>
      {(context) => (<Component {...props} context={context} />)}
    </GlobalContext.Consumer>
  );

  const componentName = Component.displayName || Component.name || 'Component';
  wrapper.displayName = `WithContext(${componentName})`;

  return wrapper;
};

export default withContext;
