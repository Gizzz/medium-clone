import React from 'react';
import { Link } from 'react-router-dom';

const GuestLinks = () => {
  const redirectUrl = window.location.pathname + window.location.search + window.location.hash;
  const encodedRedirectUrl = encodeURIComponent(redirectUrl);

  return (
    <div className="guest">
      <Link className="sign-in" to={`/login?redirectUrl=${encodedRedirectUrl}`}>Sign in</Link>
      <Link className="btn" to={`/register?redirectUrl=${encodedRedirectUrl}`}>Get started</Link>
    </div>
  );
};

export default GuestLinks;
