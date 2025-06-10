import Alert from "./Alert.js";
import {loadHeaderFooter, getParam} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
loadHeaderFooter()

const category = getParam("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const producList = new ProductList(category, dataSource, element);
producList.init();

const alert = new Alert("/json/alerts.json");
alert.showAlerts();