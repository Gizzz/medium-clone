import React from 'react';
import { Link } from 'react-router-dom';

const GuestLinks = () => (
  <div className="guest">
    <Link className="sign-in" to="/login">Sign in</Link>
    <a className="btn" href="https://medium.com/m/signin?redirect=https%3A%2F%2Fblog.kentcdodds.com%2F&operation=register" target="_blank" rel="noopener noreferrer">
      Get started
    </a>
  </div>
);

export default GuestLinks;
