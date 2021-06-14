function requestLogin() {
  return {
    type: 'REQUEST_LOGIN',
  };
}

function receiveLoginSuccessful() {
  return {
    type: 'RECEIVE_LOGIN_SUCCESSFUL',
  };
}

function requestSignup() {
  return {
    type: 'REQUEST_SIGNUP',
  };
}

function receiveSignupSuccessful() {
  return {
    type: 'RECEIVE_SIGNUP_SUCCESSFUL',
  };
}

export function login(username, password) {
  return dispatch => {
    dispatch(requestLogin());
    setTimeout(() => {
      dispatch(receiveLoginSuccessful());
    }, 1000);
  };
}

export function setRedirectUrl(url) {
  return {
    type: 'SET_REDIRECT_URL',
    url,
  }
}

export function signup(email, password) {
  return dispatch => {
    dispatch(requestSignup());
    setTimeout(() => {
      dispatch(receiveSignupSuccessful());
    }, 2000);
  };
}