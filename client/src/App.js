import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { Provider } from "react-redux";
import store from "./store";

import { setCurrentUser, logoutUser } from "./actions/authActions";

import PrivateRoute from "./components/common/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import AqTable from "./components/main/AqTable";
import OcTable from "./components/main/OcTable";
import AddChar from "./components/main/AddChar";
import DeleteChar from "./components/main/DeleteChar";
import EditBosses from "./components/main/EditBosses";
import BossRespawns from "./components/main/BossRespawns";
import RemovePoints from "./components/main/RemovePoints";
import NewEvent from "./components/main/NewEvent";

import "./App.css";

//Check for token
if (localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());
    //Redirect to login
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App mb-5">
            <Navbar />
            <Route exact path="/" component={AqTable} />
            <Route exact path="/oc" component={OcTable} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/bosses" component={BossRespawns} />
            <Switch>
              <PrivateRoute exact path="/addchar/:group" component={AddChar} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/deletechar/:group"
                component={DeleteChar}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/bosses/edit" component={EditBosses} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/removepoints/:group"
                component={RemovePoints}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/newevent/:group"
                component={NewEvent}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
