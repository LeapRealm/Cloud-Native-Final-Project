import {Component} from "react";
import qs from "qs";

class OauthRedirect extends Component {

  componentDidMount() {
    const query = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
    localStorage.setItem("ACCESS_TOKEN", query.token);
    window.location.href = "/";
  }

  render() {
    return <h1>...</h1>;
  }
}

export default OauthRedirect;