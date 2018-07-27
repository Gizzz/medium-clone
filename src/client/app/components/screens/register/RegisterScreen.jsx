import React from 'react';

import MarkupWrapper from './MarkupWrapper';

class RegisterScreen extends React.Component {
  state = {
    error: 'error text',
  }

  render() {
    const errorBox = (
      <div className="error">
        {this.state.error}
      </div>
    );

    return (
      <MarkupWrapper>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.username} onChange={this.handleInputChange} name="username" placeholder="Username" />
          <input type="password" value={this.state.password} onChange={this.handleInputChange} name="password" placeholder="Password" />
          <input type="password" name="password-again" placeholder="Password again" />
          <div className="button-box">
            <button className="btn btn--inverted">Sign up</button>
          </div>
          {this.state.error && errorBox}
        </form>
      </MarkupWrapper>
    );
  }
}

export default RegisterScreen;

/* eslint max-len: off */
/* eslint react/no-unescaped-entities: off */
