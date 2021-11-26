import {Component} from "react";

class Logout extends Component {

  componentDidMount() {
    localStorage.setItem("ACCESS_TOKEN", "");
    window.location.href = "/";
  }

  render() {
    return (
      <div>...</div>
    );
  }
}

export default Logout;