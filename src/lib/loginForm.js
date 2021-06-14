import React from 'react';
import PropTypes from 'prop-types';
import Input from './input.js';

let buttonStyle1 = {
  float: 'right',
  cursor: 'pointer',
  marginTop: '1rem',
  padding: '0.5rem 1rem',
  color: '#FFF',
  fontSize: '0.875rem',
  backgroundPosition: 'center',
  transition: 'background 0.8s',
};

let errorStyle = {
  fontSize: '0.875rem',
  height: '0.875rem',
  color: '#CC2C21',
  fontStyle: 'italic',
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameError: '',
      passwordError: '',
    };
  }

  componentWillMount() {
    this._updateStyles();
  }

  _resetError() {
    this.setState({ usernameError: '', passwordError: '' });
  }

  _isInputValid() {
    this._resetError();
    let isValid = true;

    if (this.state.username === '') {
      this.setState({ usernameError: 'Username cannot be empty' });
      isValid = false;
    }
    if (this.state.password === '') {
      this.setState({ passwordError: 'Password cannot be empty' });
      isValid = false;
    }

    return isValid;
  }

  _login() {
    if (this._isInputValid()) {
      const { username, password } = this.state;
      this.props.login(username, password);
    }
  }

  _openSignupForm() {
    this.props.openSignupForm();
  }

  _onUsernameChange(val) {
    this.setState({ username: val });
  }

  onPasswordChange(val) {
    this.setState({ password: val });
  }

  _updateStyles() {
    // Button Styles
    if (this.props.buttonColor !== null) {
      buttonStyle1.color = this.props.buttonColor;
    }

    // Error message Styles
    if (this.props.errorStyle !== null) {
      errorStyle = this.props.errorStyle;
      errorStyle.height = this.props.errorStyle.fontSize || '1rem';
    } else {
      if (this.props.errorFontColor !== null) {
        errorStyle.color = this.props.errorFontColor;
      }
      if (this.props.errorFontSize !== null) {
        errorStyle.fontSize = this.props.errorFontSize;
        errorStyle.height = this.props.errorFontSize;
      }
      if (this.props.errorFontStyle !== null) {
        errorStyle.fontStyle = this.props.errorFontStyle;
      }
    }
  }

  _renderUsernameInput() {
    return (
      <div>
        {
          React.cloneElement(this.props.inputElement, {
            onChange: (val) => this._onUsernameChange(val),
            value: this.state.username,
          })
        }
        <div style={errorStyle}>
          {this.state.usernameError}
        </div>
      </div>
    );
  }

  _renderPasswordInput() {
    return (
      <div>
        {
          React.cloneElement(this.props.inputElement, {
            onChange: (val) => this.onPasswordChange(val),
            value: this.state.password,
            isPassword: true,
          })
        }
        <div style={errorStyle}>
          {this.state.passwordError}
        </div>
      </div>
    );
  }

  _renderLoginButton() {
    const style = {
      float: 'right',
      marginTop: '1rem',
    };

    return (
      <div style={style}>
        {
          React.cloneElement(this.props.loginButton, {
            onClick: () => this._login()
          })
        }
      </div>
    );
  }

  _renderSignupButton() {
    const style = {
      float: 'left',
      marginTop: '1rem',
    };

    return (
      <div style={style}>
        {
          React.cloneElement(this.props.signupButton, {
            onClick: () => this._openSignupForm()
          })
        }
      </div>
    );
  }

  render() {
    return (
      <div>
        {
          this.props.inputElement ? (
            <div>
              {this._renderUsernameInput()}
              {this._renderPasswordInput()}
            </div>
          ) : (
            <div>
              <Input
                borderColor={this.props.inputBorderColor}
                borderFocusedColor={this.props.inputBorderFocusedColor}
                fontColor={this.props.inputFontColor}
                hintColor={this.props.inputHintColor}
                hintFocusedColor={this.props.inputHintFocusedColor}
                hintText="Username"
                onChange={(val) => this._onUsernameChange(val)}
                value={this.state.username}
                width={this.props.inputWidth}
              />
              <div style={errorStyle}>
                {this.state.usernameError}
              </div>
              <Input
                borderColor={this.props.inputBorderColor}
                borderFocusedColor={this.props.inputBorderFocusedColor}
                fontColor={this.props.inputFontColor}
                hintColor={this.props.inputHintColor}
                hintFocusedColor={this.props.inputHintFocusedColor}
                hintText="Password"
                isPassword={true}
                onChange={(val) => this.onPasswordChange(val)}
                value={this.state.password}
                width={this.props.inputWidth}
              />
              <div style={errorStyle}>
                {this.state.passwordError}
              </div>
            </div>
          )
        }

        {
          this.props.loginButton ? (
            this._renderLoginButton()
          ) : (
            <div
              onClick={() => this._login()}
              style={buttonStyle1}
            >
              LOGIN
            </div>
          )
        }

        {
          this.props.signupButton ? (
            this._renderSignupButton()
          ) : (
            <div
              onClick={() => this._openSignupForm()}
              style={{ ...buttonStyle1, float: 'left' }}
            >
              SIGNUP
            </div>
          )
        }
      </div>
    );
  }
}

LoginForm.propTypes = {
  loginButton: PropTypes.node,
  errorFontColor: PropTypes.string,
  errorFontSize: PropTypes.string,
  errorFontStyle: PropTypes.string,
  errorStyle: PropTypes.object,
  inputBorderColor: PropTypes.string,
  inputBorderFocusedColor: PropTypes.string,
  inputElement: PropTypes.node,
  inputFontColor: PropTypes.string,
  inputHintColor: PropTypes.string,
  inputHintFocusedColor: PropTypes.string,
  inputWidth: PropTypes.string,
  login: PropTypes.func.isRequired,
  openSignupForm: PropTypes.func.isRequired,
  signupButton: PropTypes.node,
};

LoginForm.defaultProps = {
  loginButton: null,
  errorFontColor: null,
  errorFontSize: null,
  errorFontStyle: null,
  errorStyle: null,
  inputBorderColor: null,
  inputBorderFocusedColor: null,
  inputElement: null,
  inputFontColor: null,
  inputHintColor: null,
  inputHintFocusedColor: null,
  inputWidth: null,
  signupButton: null,
};

export default LoginForm;
