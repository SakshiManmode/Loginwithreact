const initialState = {
  isLoggedIn: false,
  isLoading: false,
  redirectUrl: '',
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...state,
        isLoading: true,
      };
    case 'REQUEST_SIGNUP':
      return {
        ...state,
        isLoading: true,
      };
    case 'RECEIVE_LOGIN_SUCCESSFUL':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
      };
    case 'RECEIVE_SIGNUP_SUCCESSFUL':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
      };
    case 'SET_REDIRECT_URL':
      return {
        ...state,
        redirectUrl: action.url,
      };
    default:
      return state;
  }
}