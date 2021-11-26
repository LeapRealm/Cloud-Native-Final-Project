import React, {Component} from "react";
import {CLIENT_BASE_URL, LOGIN_BASE_URL} from "../../config/api-config";
import "./Login.css"
import 'antd/dist/antd.css';
import WkosLayout from "../layout/WkosLayout";

class Login extends Component {

  render() {
    const content = (
      <div>
        <div className="inner">
          <div className="login">
            <a href="/">
              <img className="imgbtn" src="/img/logo.png" alt={""}/>
            </a>
            <div className="login-type">
              <a className="btn btn2"
                 href={LOGIN_BASE_URL + "/oauth2/authorization/google?redirect_uri=" + CLIENT_BASE_URL + "/oauth/redirect"}>
                구글로 로그인
              </a>
              <a className="btn btn3"
                 href={LOGIN_BASE_URL + "/oauth2/authorization/naver?redirect_uri=" + CLIENT_BASE_URL + "/oauth/redirect"}>
                네이버로 로그인
              </a>
              <a className="btn btn4"
                 href={LOGIN_BASE_URL + "/oauth2/authorization/kakao?redirect_uri=" + CLIENT_BASE_URL + "/oauth/redirect"}>
                카카오로 로그인
              </a>
              <a className="btn btn5"
                 href={LOGIN_BASE_URL + "/oauth2/authorization/facebook?redirect_uri=" + CLIENT_BASE_URL + "/oauth/redirect"}>
                페이스북으로 로그인
              </a>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div>
        <WkosLayout content={content} defaultSelectedKeys={'4'}/>
      </div>
    );
  }
}

export default Login;