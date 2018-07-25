import React from 'react';
import { Link } from 'react-router-dom';

const GuestLinks = () => {
  const redirectUrl = window.location.pathname + window.location.search + window.location.hash;

  return (
    <div className="guest">
      <Link className="sign-in" to={`/login?redirectUrl=${redirectUrl}`}>Sign in</Link>
      <a className="btn" href="https://medium.com/m/signin?redirect=https%3A%2F%2Fblog.kentcdodds.com%2F&operation=register" target="_blank" rel="noopener noreferrer">
        Get started
      </a>
    </div>
  );
};

export default GuestLinks;
