import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class LoginScreen extends React.Component {
  state = {
    username: '',
    password: '',
    error: null,
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/auth/login', {
      username: this.state.username,
      password: this.state.password,
    })
      .then((response) => {
        window.localStorage.setItem('token', response.data.token);
        this.props.context.setUser(response.data.user);

        this.props.history.push('/');
      }, (error) => {
        this.setState({ error: error.response.data.error });
      });
  }

  render() {
    const errorBox = (
      <div className="error">
        {this.state.error}
      </div>
    );

    return (
      <main className="login">
        <div className="container">
          <div className="outer-box">
            <div className="inner-box">
              <h1>Welcome back.</h1>
              <h2>Sign in to access your personalized homepage, follow authors and topics you love, and clap for stories that matter to you.</h2>
              <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.username} onChange={this.handleInputChange} name="username" placeholder="Username" />
                <input type="password" value={this.state.password} onChange={this.handleInputChange} name="password" placeholder="Password" />
                <div className="button-box">
                  <button className="btn btn--inverted">Sign in</button>
                </div>
                { this.state.error && errorBox }
              </form>
              <div className="create-account">
                No account?
                {' '}
                <a href="https://medium.com/m/signin?redirect=https%3A%2F%2Fblog.kentcdodds.com%2F&operation=register" target="_blank" rel="noopener noreferrer">
                  Create one
                </a>.
              </div>
              <div className="terms">
                To make original Medium work, they(Medium team) log user data and share it with service providers. Click "Sign in" above to accept Medium’s
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
  }
}

LoginScreen.propTypes = {
  history: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
};

export default LoginScreen;

/* eslint max-len: off */
/* eslint react/no-unescaped-entities: off */
