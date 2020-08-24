/*
 * @Author: Song
 * @Date: 2018-10-30 21:33:40 
 * @Last Modified by: Song
 * @Last Modified time: 2018-10-31 10:41:41
 */
import Platform from "react-native-web/dist/exports/Platform";
import "./font.css";
import 'babel-polyfill';
const ReactNative = require("react-native");
const Modal = require("./ModalComponent/Modal");

ReactNative.Modal = Modal;

Platform.OS = "ios";

require("./main");
