import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import queryString from 'query-string';

import { contextShape } from '../../../../utils/context';
import storageHelper from '../../../../utils/storageHelper';
import MarkupWrapper from './MarkupWrapper';

import styles from '../shared/AuthScreen.module.scss';

class RegisterScreen extends React.Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
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

    axios.post('/api/auth/register', {
      username: this.state.username,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    })
      .then((response) => {
        storageHelper.setData({
          user: response.data.user,
          token: response.data.token,
        });
        axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
        this.props.context.setUser(response.data.user);

        const decodedParams = queryString.parse(window.location.search);
        this.props.history.push(decodedParams.redirectUrl);
      }, (error) => {
        const isValidationError = error.response.status >= 400 && error.response.status < 500;
        if (isValidationError) {
          this.setState({ error: error.response.data.error });
        } else {
          // eslint-disable-next-line no-alert
          window.alert(error);
        }
      });
  }

  render() {
    const errorBox = (
      <div className={styles.error}>
        {this.state.error}
      </div>
    );

    return (
      <MarkupWrapper>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.username} onChange={this.handleInputChange} name="username" placeholder="Username" required />
          <input type="password" value={this.state.password} onChange={this.handleInputChange} name="password" placeholder="Password" required />
          <input type="password" value={this.state.confirmPassword} onChange={this.handleInputChange} name="confirmPassword" placeholder="Confirm Password" required />
          <div className={styles['button-box']}>
            <button className="btn btn--inverted">Sign up</button>
          </div>
          {this.state.error && errorBox}
        </form>
      </MarkupWrapper>
    );
  }
}

RegisterScreen.propTypes = {
  history: PropTypes.object.isRequired,
  context: contextShape.isRequired,
};

export default RegisterScreen;
