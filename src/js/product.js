import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = getParam("product");
console.log("Product ID from URL:", productId);

const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);
product.init();

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}

async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

document.getElementById("addToCart").addEventListener("click", addToCartHandler);