// import React from "react";
// import { render } from "react-dom";
import { AppRegistry } from "react-native";
import App from "./boot/setup";
AppRegistry.registerComponent("houseApp", () => App);
AppRegistry.runApplication("houseApp", {
  rootTag: document.getElementById("root")
});
