import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

import { GlobalContextConsumer } from '../../../contextUtils';
import storageHelper from '../../../utils/storageHelper';
import GuestLinks from './GuestLinks';
import UserLinks from './UserLinks';

const Header = ({ history }) => (
  <GlobalContextConsumer>
    {(context) => {
      const { user } = context;

      const handleLogout = (e) => {
        e.preventDefault();

        axios.post('/api/auth/logout')
          .then(() => {
            storageHelper.removeData();
            axios.defaults.headers.common.Authorization = undefined;
            context.setUser(null);

            history.push('/');
          }, window.alert);
      };

      return (
        <header className="page">
          <div className="inner">
            <div className="link-set">
              <Link className="logo" to="/" />
            </div>
            <div className="actions">
              {
                user
                  ? <UserLinks user={user} onLogout={handleLogout} />
                  : <GuestLinks />
              }
            </div>
          </div>
        </header>
      );
    }}
  </GlobalContextConsumer>
);

Header.propTypes = {
  history: PropTypes.object.isRequired,
};

const HeaderWithRouter = withRouter(Header);

export default HeaderWithRouter;

/* eslint max-len: off */
