import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { Provider } from "react-redux";
import store from "./store";

import { setCurrentUser } from "./actions/authActions";

import PrivateRoute from "./components/common/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import AqTable from "./components/main/AqTable";
import OcTable from "./components/main/OcTable";
import AddChar from "./components/main/AddChar";
import DeleteChar from "./components/main/DeleteChar";

import "./App.css";

//Check for token
if (localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={AqTable} />
            <Route exact path="/oc" component={OcTable} />
            <Route exact path="/login" component={Login} />
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
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
