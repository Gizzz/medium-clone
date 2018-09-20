import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

import { GlobalContextConsumer } from '../../../utils/context';
import storageHelper from '../../../utils/storageHelper';
import GuestLinks from './components/GuestLinks';
import UserLinks from './components/UserLinks';

import styles from './Header.module.scss';

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
        <header className={styles.page}>
          <div className={styles.inner}>
            <div className={styles['link-set']}>
              <Link className={styles.logo} to="/" />
            </div>
            <div className={styles.actions}>
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
