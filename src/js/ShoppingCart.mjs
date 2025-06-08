import { setLocalStorage, getLocalStorage, cartCounter } from "./utils.mjs";

export default class ShoppingCart {
  constructor() {
    this.cartItems = this.loadCartItems();
    this.cartContainer = document.querySelector(".product-list");
    this.template = document.querySelector("#cart-item-template");
    this.renderCart();
    this.setEraser();
    this.setQuantityControls(); // Ensure this is called
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
      
      item.quantity = item.quantity || 1;
      clone.querySelector(".qty").textContent = item.quantity;
      
      const minusButton = clone.querySelector(".quantity-btn.minus");
      const removeButton = clone.querySelector(".remove-item");
      const plusButton = clone.querySelector(".quantity-btn.plus");

      minusButton.dataset.id = item.Id;
      removeButton.dataset.id = item.Id;
      plusButton.dataset.id = item.Id;

      // Conditional display of minus and remove buttons
      if (item.quantity > 1) {
        minusButton.style.display = "inline-block";
        removeButton.style.display = "none";
      } else {
        minusButton.style.display = "none";
        removeButton.style.display = "inline-block";
      }
      
      const totalPrice = item.FinalPrice * item.quantity;
      clone.querySelector(".cart-card__price").textContent = `$${totalPrice.toFixed(2)}`;
      this.cartContainer.appendChild(clone);
    });
    this.getCartTotal();
  }

  getCartTotal() {
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
    // When a product is erased, its quantity effectively becomes 0.
    // We'll remove it and re-render.
    this.cartItems = this.cartItems.filter(item => item.Id !== productId);
    setLocalStorage("so-cart", this.cartItems);
    cartCounter();
    this.renderCart();
  }

  setQuantityControls() {
    this.cartContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("quantity-btn")) {
        const productId = event.target.dataset.id;
        const isIncrease = event.target.classList.contains("plus");
        this.updateQuantity(productId, isIncrease);
      }
    });
  }

  updateQuantity(productId, isIncrease) {
    const itemIndex = this.cartItems.findIndex(item => item.Id === productId);
    if (itemIndex !== -1) {
      if (typeof this.cartItems[itemIndex].quantity === 'undefined') {
        this.cartItems[itemIndex].quantity = 1;
      }
      
      if (isIncrease) {
        this.cartItems[itemIndex].quantity++;
      } else {
        if (this.cartItems[itemIndex].quantity > 1) {
          this.cartItems[itemIndex].quantity--;
        }
      }
      
      setLocalStorage("so-cart", this.cartItems);
      cartCounter();
      this.renderCart(); // This will re-render and update button visibility
    }
  }
}