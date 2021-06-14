import React from 'react';
import PropTypes from 'prop-types';

class LoginWrapper extends React.Component {

  componentDidMount() {
    const { dispatch, isLoggedIn, setRedirectUrlAction } = this.props;

    if (!isLoggedIn) {
      dispatch(setRedirectUrlAction(this.props.history.location.pathname));
      this.props.history.push("/login");
    }
  }

  render() {
    if (this.props.isLoggedIn) {
      return this.props.children
    } else {
      return null
    }
  }
}

LoginWrapper.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  setRedirectUrlAction: PropTypes.func.isRequired,
};

export default LoginWrapper;
