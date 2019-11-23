import React from "react";
import {
  BrowserRouter,
  HashRouter,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import imgMgt from "./pages/imgMgt/index.jsx";
import textMgt from "./pages/textMgt/index.jsx";
import App from "./App";

export default class ERouter extends React.Component {
  render(h) {
    return (
      <BrowserRouter>
        <App>
          <Switch>
            <Route path="/imgMgt" component={imgMgt}></Route>
            <Route path="/textMgt" component={textMgt}></Route>
            {/* <Route path="/self" component={Self}></Route>
            <Route path="/nodes" component={Nodes}></Route>
            <Route path="/score" component={Score}></Route> */}
            <Redirect to="/imgMgt" />
            {/* <Route component={NoMatch} /> */}
          </Switch>
        </App>
      </BrowserRouter>
    );
  }
}
