import React from 'react';
import PropTypes from 'prop-types';
import Input from './input.js';

let buttonStyle = {
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

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
    };
  }

  componentWillMount() {
    this._updateStyles();
  }

  // From https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
  _isEmailValid(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  _resetError() {
    this.setState({ emailError: '', passwordError: '', confirmPasswordError: '' });
  }

  _isInputValid() {
    this._resetError();
    let isValid = true;

    if (this.state.email === '') {
      this.setState({ emailError: 'Email cannot be empty' });
      isValid = false;
    } else if (!this._isEmailValid(this.state.email)) {
      this.setState({ emailError: 'Email not valid' });
      isValid = false;
    }

    if (this.state.password === '') {
      this.setState({ passwordError: 'Password cannot be empty' });
      isValid = false;
    }

    if (this.state.confirmPassword === '') {
      this.setState({ confirmPasswordError: 'Password cannot be empty' });
      isValid = false;
    } else if (this.state.confirmPassword !== this.state.password) {
      this.setState({ confirmPasswordError: 'Passwords must match' });
      isValid = false;
    }

    return isValid;
  }

  _openLoginForm() {
    this.props.openLoginForm();
  }

  _signup() {
    if (this._isInputValid()) {
      const { email, password } = this.state;
      this.props.signup(email, password);
    }
  }

  _onEmailChange(val) {
    this.setState({ email: val });
  }

  onPasswordChange(val) {
    this.setState({ password: val });
  }

  onConfirmPasswordChange(val) {
    this.setState({ confirmPassword: val });
  }

  _updateStyles() {
    // Button Styles
    if (this.props.buttonColor !== null) {
      buttonStyle.color = this.props.buttonColor;
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

  _renderEmailInput() {
    return (
      <div>
        {
          React.cloneElement(this.props.inputElement, {
            onChange: (val) => this._onEmailChange(val),
            value: this.state.email,
          })
        }
        <div style={errorStyle}>
          {this.state.emailError}
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

  _renderConfirmPasswordInput() {
    return (
      <div>
        {
          React.cloneElement(this.props.inputElement, {
            onChange: (val) => this.onConfirmPasswordChange(val),
            value: this.state.confirmPassword,
            isPassword: true,
          })
        }
        <div style={errorStyle}>
          {this.state.confirmPasswordError}
        </div>
      </div>
    );
  }

  _renderLoginButton() {
    const style = {
      float: 'left',
      marginTop: '1rem',
    };

    return (
      <div style={style}>
        {
          React.cloneElement(this.props.loginButton, {
            onClick: () => this._openLoginForm()
          })
        }
      </div>
    );
  }

  _renderSignupButton() {
    const style = {
      float: 'right',
      marginTop: '1rem',
    };

    return (
      <div style={style}>
        {
          React.cloneElement(this.props.signupButton, {
            onClick: () => this._signup()
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
              {this._renderEmailInput()}
              {this._renderPasswordInput()}
              {this._renderConfirmPasswordInput()}
            </div>
          ) : (
            <div>
              <Input
                borderColor={this.props.inputBorderColor}
                borderFocusedColor={this.props.inputBorderFocusedColor}
                fontColor={this.props.inputFontColor}
                hintColor={this.props.inputHintColor}
                hintFocusedColor={this.props.inputHintFocusedColor}
                hintText="Email"
                onChange={(val) => this._onEmailChange(val)}
                value={this.state.email}
                width={this.props.inputWidth}
              />
              <div style={errorStyle}>
                {this.state.emailError}
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
              <Input
                borderColor={this.props.inputBorderColor}
                borderFocusedColor={this.props.inputBorderFocusedColor}
                fontColor={this.props.inputFontColor}
                hintColor={this.props.inputHintColor}
                hintFocusedColor={this.props.inputHintFocusedColor}
                hintText="Confirm Password"
                isPassword={true}
                onChange={(val) => this.onConfirmPasswordChange(val)}
                value={this.state.confirmPassword}
                width={this.props.inputWidth}
              />
              <div style={errorStyle}>
                {this.state.confirmPasswordError}
              </div>
            </div>
          )
        }

        {
          this.props.loginButton ? (
            this._renderLoginButton()
          ) : (
            <div
              onClick={() => this._openLoginForm()}
              style={{ ...buttonStyle, float: 'left' }}
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
              style={buttonStyle}
            >
              SIGNUP
            </div>
          )
        }
      </div>
    );
  }
}

SignupForm.propTypes = {
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
  openLoginForm: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  signupButton: PropTypes.node,
};

SignupForm.defaultProps = {
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

export default SignupForm;
