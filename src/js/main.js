import Alert from "./Alert.js";
import {loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const alert = new Alert("/json/alerts.json");
alert.showAlerts();

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const producList = new ProductList("tents", dataSource, element);
producList.init();

loadHeaderFooter()

