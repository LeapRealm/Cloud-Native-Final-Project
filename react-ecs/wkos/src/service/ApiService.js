import {API_BASE_URL} from "../config/api-config";

export function call(api, method, request) {

  const headers = new Headers({
    "Content-Type": "application/json"
  });

  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken !== null && typeof accessToken !== "undefined" && accessToken !== "") {
    headers.append("Authorization", "Bearer " + accessToken);
  } else {
    localStorage.setItem("ACCESS_TOKEN", "");
  }

  const options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method
  };

  if (request) {
    options.body = JSON.stringify(request);
  }

  return fetch(options.url, options)
    .then((response) =>
      response.json().then((json) => {
        if (!response.ok) {
          alert("권한이 없거나 서버 연결에 실패했습니다");
          return Promise.reject(json);
        }
        if (json.error === "No authorized user") {
          alert("권한이 없습니다");
          return Promise.reject(json);
        } else {
          return json;
        }
      })
    ).catch((error) => {
      return Promise.reject(error);
    });
}