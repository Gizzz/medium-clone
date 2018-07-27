import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MarkupWrapper = ({ children }) => (
  <main className="login login--register">
    <div className="container">
      <div className="outer-box">
        <div className="inner-box">
          <h1>Join Fedium.</h1>
          <h2>Create an account to personalize your homepage, follow your favorite authors and publications, applaud stories you love, and more.</h2>

          {children}

          <div className="account">
            Already have an account?
            {' '}
            <Link to="/login">Sign in</Link>.
          </div>
          <div className="terms">
            To make original Medium work, they(Medium team) log user data and share it with service providers. Click "Sign up" above to accept Medium’s
            {' '}
            <a href="https://medium.com/policy/medium-terms-of-service-9db0094a1e0f" target="_blank" rel="noopener noreferrer">
              Terms of Service
            </a>
            {' & '}
            <a href="https://medium.com/policy/medium-privacy-policy-f03bf92035c9" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>.
          </div>
        </div>
      </div>
    </div>
  </main>
);

MarkupWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MarkupWrapper;

/* eslint max-len: off */
/* eslint react/no-unescaped-entities: off */
