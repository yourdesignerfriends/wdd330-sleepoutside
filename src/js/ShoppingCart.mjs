import { setLocalStorage, getLocalStorage, cartCounter } from "./utils.mjs";

export default class ShoppingCart {
  constructor() {
    this.cartItems = this.loadCartItems();
    this.cartContainer = document.querySelector(".product-list");
    this.template = document.querySelector("#cart-item-template");
    this.renderCart();
    this.setEraser();
  }

  loadCartItems() {
    return getLocalStorage("so-cart") || [];
  }

  renderCart() {
    this.cartContainer.innerHTML = "";
    this.cartItems.forEach((item) => {
      const clone = this.template.content.cloneNode(true);
      clone.querySelector(".cart-card__image img").src = item.Image;
      clone.querySelector(".cart-card__image img").alt = item.Name;
      clone.querySelector(".card__name").textContent = item.Name;
      clone.querySelector(".cart-card__color").textContent = item.Colors[0].ColorName;
      clone.querySelector(".cart-card__quantity .qty").textContent = `qty: 1`;
      clone.querySelector(".remove-item").dataset.id = item.Id;
      clone.querySelector(".cart-card__price").textContent = `$${item.FinalPrice}`;
      this.cartContainer.appendChild(clone);
    });
    this.getCartTotal();
  }

  getCartTotal() {
    let total = this.cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
    document.querySelector(".cart-footer-hide").style.display = total > 0 ? "block" : "none";
    document.querySelector(".cart-total").textContent = `Total: $${total.toFixed(2)}`;
  }

  setEraser() {
    this.cartContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove-item")) {
        this.eraseProduct(event.target.dataset.id);
      }
    });
  }

  eraseProduct(productId) {
    this.cartItems = this.cartItems.filter(item => item.Id !== productId);
    setLocalStorage("so-cart", this.cartItems);
    cartCounter();
    this.renderCart();
  }
}
