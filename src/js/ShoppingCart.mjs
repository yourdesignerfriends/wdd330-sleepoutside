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
      clone.querySelector(".cart-card__image img").src = item.Images.PrimaryLarge;
      clone.querySelector(".cart-card__image img").alt = item.Name;
      clone.querySelector(".card__name").textContent = item.Name;
      clone.querySelector(".cart-card__color").textContent = item.Colors[0].ColorName;
      // AD- Delete this clone.querySelector(".cart-card__quantity .qty").textContent = `qty: 1`;
      // Update to show actual quantity
      clone.querySelector(".cart-card__quantity .qty").textContent = `qty: ${item.quantity || 1}`;
      clone.querySelector(".remove-item").dataset.id = item.Id;
      // AD- Delete this clone.querySelector(".cart-card__price").textContent = `$${item.FinalPrice}`;
      // AD- Update price to reflect quantity
      const totalPrice = item.FinalPrice * (item.quantity || 1);
      clone.querySelector(".cart-card__price").textContent = `$${totalPrice.toFixed(2)}`;
      this.cartContainer.appendChild(clone);
    });
    this.getCartTotal();
  }

  getCartTotal() {
    // AD- Delete this: let total = this.cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
    let total = this.cartItems.reduce((sum, item) => sum + (item.FinalPrice * (item.quantity || 1)), 0);
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
