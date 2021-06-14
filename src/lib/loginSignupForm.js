import React from 'react';
import PropTypes from 'prop-types';
import Loader from './loader.js';
import LoginForm from './loginForm.js';
import SignupForm from './signupForm.js';

let backgroundStyle = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  backgroundColor: '#3498DB',
};

let containerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  backgroundColor: '#2E86C1D8',
  padding: '3rem 2rem',
  'msTransform': 'translateX(-50%) translateY(-50%)',
  'webkitTransform': 'translate(-50%,-50%)',
  'transform': 'translate(-50%,-50%)',
  borderTopLeftRadius: '1rem',
};

class LoginSignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignupForm: false,
    };
  }

  componentWillMount() {
    this._updateStyles();
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.isLoggedIn !== nextProps.isLoggedIn && nextProps.isLoggedIn) {
      this.props.history.replace(this.props.redirectUrl);
    }
  }

  _login = (username, password) => {
    this.props.dispatch(this.props.tryLoginAction(username, password));
  }

  _openLoginForm = () => {
    this.setState({ showSignupForm: false });
  }

  _signup = (email, password) => {
    this.props.dispatch(this.props.trySignupAction(email, password));
  }

  _openSignupForm = () => {
    this.setState({ showSignupForm: true });
  }

  _updateStyles() {
    // Background Styles
    if (this.props.backgroundStyle !== null) {
      backgroundStyle = this.props.backgroundStyle;
    } else {
      if (this.props.backgroundColor !== null) {
        backgroundStyle.backgroundColor = this.props.backgroundColor;
      }
      if (this.props.backgroundImageUrl !== null) {
        backgroundStyle.backgroundImage = `url('${this.props.backgroundImageUrl}')`;
      }
      if (this.props.backgroundRepeat !== null) {
        backgroundStyle.backgroundRepeat = this.props.backgroundRepeat ? 'repeat' : 'no-repeat';
      }
      if (this.props.backgroundSize !== null) {
        backgroundStyle.backgroundSize = this.props.backgroundSize;
      }
    }

    // Login Container Box Styles
    if (this.props.containerStyle !== null) {
      containerStyle = this.props.containerStyle;
    } else {
      if (this.props.containerColor !== null) {
        containerStyle.backgroundColor = this.props.containerColor;
      }
      if (this.props.containerPosition !== null) {
        if (this.props.containerPosition <= 1 && this.props.containerPosition >= 0) {
          containerStyle.left = `${this.props.containerPosition*100}%`
        }
      }
    }
  }

  render() {
    return (
      <div>
        <Loader
          loading={this.props.isLoading}
        />

        <div style={backgroundStyle}>
          <div style={containerStyle}>
            {
              !this.state.showSignupForm ? (
                <LoginForm
                  loginButton={this.props.loginButton}
                  errorFontColor={this.props.errorFontColor}
                  errorFontSize={this.props.errorFontSize}
                  errorFontStyle={this.props.errorFontStyle}
                  errorStyle={this.props.errorStyle}
                  inputBorderColor={this.props.inputBorderColor}
                  inputBorderFocusedColor={this.props.inputBorderFocusedColor}
                  inputElement={this.props.inputElement}
                  inputFontColor={this.props.inputFontColor}
                  inputHintColor={this.props.inputHintColor}
                  inputHintFocusedColor={this.props.inputHintFocusedColor}
                  inputWidth={this.props.inputWidth}
                  login={this._login}
                  openSignupForm={this._openSignupForm}
                  signupButton={this.props.signupButton}
                />
              ) : (
                <SignupForm
                  loginButton={this.props.loginButton}
                  errorFontColor={this.props.errorFontColor}
                  errorFontSize={this.props.errorFontSize}
                  errorFontStyle={this.props.errorFontStyle}
                  errorStyle={this.props.errorStyle}
                  inputBorderColor={this.props.inputBorderColor}
                  inputBorderFocusedColor={this.props.inputBorderFocusedColor}
                  inputElement={this.props.inputElement}
                  inputFontColor={this.props.inputFontColor}
                  inputHintColor={this.props.inputHintColor}
                  inputHintFocusedColor={this.props.inputHintFocusedColor}
                  inputWidth={this.props.inputWidth}
                  openLoginForm={this._openLoginForm}
                  signup={this._signup}
                  signupButton={this.props.signupButton}
                />
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

LoginSignupForm.propTypes = {
  backgroundColor: PropTypes.string,
  backgroundImageUrl: PropTypes.string,
  backgroundRepeat: PropTypes.bool,
  backgroundSize: PropTypes.string,
  backgroundStyle: PropTypes.object,
  loginButton: PropTypes.node,
  containerColor: PropTypes.string,
  containerPosition: PropTypes.number,
  containerStyle: PropTypes.object,
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
  isLoading: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  redirectUrl: PropTypes.string.isRequired,
  signupButton: PropTypes.node,
  tryLoginAction: PropTypes.func.isRequired,
  trySignupAction: PropTypes.func.isRequired,
};

LoginSignupForm.defaultProps = {
  backgroundColor: null,
  backgroundImageUrl: null,
  backgroundRepeat: null,
  backgroundSize: null,
  backgroundStyle: null,
  loginButton: null,
  containerColor: null,
  containerPosition: null,
  containerStyle: null,
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

export default LoginSignupForm;
