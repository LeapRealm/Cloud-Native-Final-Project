let frontendHost;
let backendHost;
let loginBaseUrl;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
  frontendHost = "http://localhost:3000";
  backendHost = "http://localhost";
  loginBaseUrl = "http://localhost";
} else {
  frontendHost = "https://whatsports.site";
  backendHost = "https://apieks.whatsports.site";
  loginBaseUrl = "https://user.whatsports.site";
}

export const CLIENT_BASE_URL = `${frontendHost}`;
export const API_BASE_URL = `${backendHost}`;
export const LOGIN_BASE_URL = `${loginBaseUrl}`;