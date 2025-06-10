import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
loadHeaderFooter()
//get the path to tents and save it on a variable
const dataSource = new ExternalServices("tents");
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);
product.init();