import Alert from "./Alert.js";

import { cartCounter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProducList from "./ProductList.mjs";

const alert = new Alert("/json/alerts.json");
alert.showAlerts();

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const producList = new ProducList("tents", dataSource, element);
producList.init();

cartCounter();


