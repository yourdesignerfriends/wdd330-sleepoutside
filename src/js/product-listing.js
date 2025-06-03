import Alert from "./Alert.js";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
// Show alert messages
const alert = new Alert("/json/alerts.json");
alert.showAlerts();

// Load the header and footer
loadHeaderFooter();

// Get category from URL query string
const category = getParam('category');

let dataSource;

if (category === "search") {
  const searchResults = JSON.parse(localStorage.getItem("searchResults"));
  dataSource = {
    getData: async () => searchResults
  };
} else {
  dataSource = new ProductData();
}


// Set up the product list
const element = document.querySelector(".product-list");
const producList = new ProductList(category, dataSource, element);
producList.init();


localStorage.removeItem("searchResults");

