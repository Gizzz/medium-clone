import PropTypes from 'prop-types';

const contextShape = PropTypes.shape({
  // user can be null, so it is not required
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
});

export default contextShape;
