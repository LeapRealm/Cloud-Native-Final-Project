import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import OauthRedirect from "./components/user/OauthRedirect";
import Login from "./components/user/Login";
import Facility from "./components/facility/Facility";
import Map from "./components/map/Map";
import Logout from "./components/user/Logout";
import Homepage from "./components/homepage/Homepage";
import FacilityTable from "./components/facility/FacilityTable";
import Mypage from "./components/mypage/Mypage";

class App extends React.Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Switch>
              <Route path={"/"} exact={true} component={Homepage}/>
              <Route path={"/list"} exact={true} component={FacilityTable}/>
              <Route path={"/facility/**"} exact={true} component={Facility}/>
              <Route path={"/map"} exact={true} component={Map}/>
              <Route path={"/mypage"} exact={true} component={Mypage}/>
              <Route path={"/login"} exact={true} component={Login}/>
              <Route path={"/logout"} exact={true} component={Logout}/>
              <Route path={"/oauth/redirect"} exact={true} component={OauthRedirect}/>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
