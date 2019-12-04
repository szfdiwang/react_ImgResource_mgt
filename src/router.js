import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import imgMgt from "./pages/imgMgt/index.jsx";
import textMgt from "./pages/textMgt/index.jsx";
import dictMgt from "./pages/dictMgt/index.jsx";
import Login from "./pages/login/index.jsx";
import App from "./App";

export default class ERouter extends React.Component {
  render(h) {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/login" exact component={Login}></Route>
          <Redirect exact from="/" to="/login" />
          <App>
            <Switch>
              {/* <Route path="/login" component={Login}></Route> */}
              <Route exact path="/imgMgt" component={imgMgt}></Route>
              <Route exact path="/textMgt" component={textMgt}></Route>
              <Route exact path="/dictMgt" component={dictMgt}></Route>
              <Redirect to="/404" />
              {/* <Route component={NoMatch} /> */}
            </Switch>
          </App>
        </Switch>
      </HashRouter>
    );
  }
}
