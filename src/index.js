import React from "react";
import ReactDOM from "react-dom";
import Router from "./router";
import "antd/dist/antd.css";
import * as serviceWorker from "./serviceWorker";
import "./assets/css/layout.scss";
import "./assets/css/reset.scss";

window.onresize = setHtmlFontSize;

function setHtmlFontSize() {
  const htmlWidth =
    document.documentElement.clientWidth || document.body.clientWidth;
  const htmlDom = document.getElementsByTagName("html")[0];
  htmlDom.style.fontSize = htmlWidth / 19.2 + "px";
}
setHtmlFontSize();

console.log(process.env.NODE_ENV);

ReactDOM.render(<Router />, document.getElementById("root"));

serviceWorker.unregister();
