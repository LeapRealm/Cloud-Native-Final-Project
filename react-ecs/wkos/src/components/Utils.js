import jwtDecode from "jwt-decode";

export function getUserId() {
  const token = localStorage.getItem("ACCESS_TOKEN");
  if (token !== null && token !== "undefined" && token !== "") {
    return jwtDecode(token).sub;
  } else {
    localStorage.setItem("ACCESS_TOKEN", "");
    return null;
  }
}

export function getUsername() {
  const token = localStorage.getItem("ACCESS_TOKEN");
  if (token !== null && token !== "undefined" && token !== "")
    return jwtDecode(token).username;
  else {
    localStorage.setItem("ACCESS_TOKEN", "");
    return null;
  }
}