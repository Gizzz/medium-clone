import React from 'react';

const LoginScreen = () => (
  <main className="login">
    <div className="container">
      <div className="inner-box">
        <h1>Welcome back.</h1>
        <h2>Sign in to access your personalized homepage, follow authors and topics you love, and clap for stories that matter to you.</h2>
        <form>
          <input type="text" name="username" placeholder="Username" />
          <input type="password" name="password" placeholder="Password" />
          <div className="button-box">
            <button className="btn btn--inverted">Sign in</button>
          </div>
        </form>
        <div className="create-account">
          No account?
          {' '}
          <a href="https://medium.com/m/signin?redirect=https%3A%2F%2Fblog.kentcdodds.com%2F&operation=register" target="_blank" rel="noopener noreferrer">
            Create one
          </a>.
        </div>
        <div className="terms">
          To make Medium work, we log user data and share it with service providers. Click "Sign in" above to accept Medium’s
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
  </main>
);

export default LoginScreen;

/* eslint max-len: off */
/* eslint react/no-unescaped-entities: off */
