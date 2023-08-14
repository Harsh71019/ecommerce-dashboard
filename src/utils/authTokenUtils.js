// authTokenUtils.js
import { getCookie } from 'cookies-next';

// Function to get the authentication token from the cookie
export const getAuthTokenFromCookie = () => {
  return getCookie('authToken');
};
