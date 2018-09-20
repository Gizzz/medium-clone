import React from 'react';
import { Link } from 'react-router-dom';

import urlHelper from '../../../../utils/urlHelper';
import styles from '../Header.module.scss';

const GuestLinks = () => {
  const encodedRedirectUrl = urlHelper.computeEncodedRedirectUrl();

  return (
    <div className={styles.guest}>
      <Link className={styles['sign-in']} to={`/login?redirectUrl=${encodedRedirectUrl}`}>Sign in</Link>
      <Link className="btn" to={`/register?redirectUrl=${encodedRedirectUrl}`}>Get started</Link>
    </div>
  );
};

export default GuestLinks;
