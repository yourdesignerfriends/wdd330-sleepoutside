import Alert from "./Alert.js";
import {loadHeaderFooter } from "./utils.mjs";


loadHeaderFooter();

const alert = new Alert("/json/alerts.json");
alert.showAlerts();
