import { setLocalStorage, getLocalStorage, cartCounter, loadHeaderFooter } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || []; //     || [] added
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  getCartTotal();
}
// AD- // AD- I make the "X" detectable in JavaScript and associate the item with its ID
function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>
    <span class="qty">qty: 1</span> <span class="remove-item" data-id="${item.Id}">X</span>
  </p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function getCartTotal() {
  const cartItems = getLocalStorage("so-cart") || [];
  let total = 0;
  if (cartItems.length > 0) {
    cartItems.forEach((item) => (total += item.FinalPrice));
    document.querySelector(".cart-footer-hide").style.display = "block";
    document.querySelector(".cart-total").innerHTML =
      `Total: ${total.toFixed(2)}`;
  } else {
    document.querySelector(".cart-footer-hide").style.display = "none";
  }
}
// AD- This ensures that each item in the cart can be properly deleted.
function setEraser() {
  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", (event) => {
      const productId = event.target.dataset.id;
      eraseProduct(productId);
    });
  });
}
// AD- Removes a specific product from the cart and updates the interface to reflect the change.
function eraseProduct(productId) {
  let cart = getLocalStorage("so-cart") || [];  
  cart = cart.filter(item => item.Id !== productId);  
  setLocalStorage("so-cart", cart);  

  cartCounter();  
  renderCartContents();  
  setEraser();  
}

renderCartContents();
setEraser();
loadHeaderFooter();
