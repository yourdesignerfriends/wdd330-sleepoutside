import { cartCounter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProducList from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const producList = new ProducList("tents", dataSource, element);
producList.init();

cartCounter();

const closeBtn = document.getElementById("close-alert");
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    document.getElementById("site-alert").style.display = "none";
  });
}
