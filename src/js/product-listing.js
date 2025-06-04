import Alert from "./Alert.js";
import {loadHeaderFooter, getParam} from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const producList = new ProductList(category, dataSource, element);
producList.init();

loadHeaderFooter()
const alert = new Alert("/json/alerts.json");
alert.showAlerts();
