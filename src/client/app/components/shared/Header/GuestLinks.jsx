import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

const GuestLinks = () => {
  const decodedParams = queryString.parse(window.location.search);
  const hasRedirectUrl = Boolean(decodedParams.redirectUrl);

  let redirectUrl;
  if (hasRedirectUrl) {
    // eslint-disable-next-line prefer-destructuring
    redirectUrl = decodedParams.redirectUrl;
  } else {
    redirectUrl = window.location.pathname + window.location.search + window.location.hash;
  }

  const encodedRedirectUrl = window.encodeURIComponent(redirectUrl);

  return (
    <div className="guest">
      <Link className="sign-in" to={`/login?redirectUrl=${encodedRedirectUrl}`}>Sign in</Link>
      <Link className="btn" to={`/register?redirectUrl=${encodedRedirectUrl}`}>Get started</Link>
    </div>
  );
};

export default GuestLinks;
