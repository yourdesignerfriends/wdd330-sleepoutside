import ProductData from "./ProductData.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    try {
      this.product = await this.dataSource.findProductById(this.productId);
      
      if (!this.product) {
        console.error("Product not found!");
        return;
      }

      this.renderProductDetails();
      document.getElementById("addToCart").addEventListener("click", this.addProductToCart.bind(this));

    } catch (error) {
      console.error("Error loading product details:", error);
    }
  }

  renderProductDetails() {
    if (!this.product) {
      console.error("Product details missing!");
      return;
    }

    document.querySelector("#product-name").textContent = this.product.Name;
    document.querySelector("#product-description").textContent = this.product.DescriptionHtmlSimple;
    document.querySelector("#product-image").src = this.product.Image;
  }

  addProductToCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(this.product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${this.product.Name} added to cart!`);
  }
}
