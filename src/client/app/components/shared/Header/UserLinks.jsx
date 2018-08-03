import React from 'react';
import PropTypes from 'prop-types';

const UserLinks = ({ user, onLogout }) => (
  <div className="user">
    <a className="sign-out" href="#" onClick={onLogout}>Sign out</a>
    <div className="avatar avatar--small">
      <img src={user.avatarUrl} title={`Signed in as ${user.username}`} />
    </div>
  </div>
);

UserLinks.propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default UserLinks;
