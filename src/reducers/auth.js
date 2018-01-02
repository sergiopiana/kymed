import {
  AUTH_SUCCESS,
  AUTH_REFRESH_TOKEN,
  LOCALSTORAGE_AUTH_KEY,
} from '../constants/index';

export default function auth(state = {}, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return action.data;
    case AUTH_REFRESH_TOKEN: {
      const authData = localStorage.getItem(LOCALSTORAGE_AUTH_KEY);
      const authJson = JSON.parse(authData);
      authJson.token = action.data.token;
      authJson.exp = action.data.exp;
      localStorage.setItem(LOCALSTORAGE_AUTH_KEY, JSON.stringify(authJson));
      return authJson;
    }

    default:
      return state;
  }
}
