import Alert from "./Alert.js";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, element);
productList.init();

document.querySelector("#sortSelect").addEventListener("change", (e) => {
  const selected = e.target.value;
  if (selected) {
    productList.sortProducts(selected);
  }
});

const alert = new Alert("/json/alerts.json");
alert.showAlerts();
