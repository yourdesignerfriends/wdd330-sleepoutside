import Alert from "./Alert.js";
import {loadHeaderFooter } from "./utils.mjs";
import setupCTAModal from "./cta-modal.js";

loadHeaderFooter();

const alert = new Alert("/json/alerts.json");
alert.showAlerts();

//setupNewsletterForm();

setupCTAModal();