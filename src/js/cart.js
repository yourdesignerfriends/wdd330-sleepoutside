import { setLocalStorage, getLocalStorage, cartCounter } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || []; //     || [] added
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  getCartTotal();
}

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
  <p class='cart-card__quantity'>qty: 1 <spam id="${item.Id}">&#x274C</spam></p>
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
function setEraser() {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.forEach((product) => {
    document
      .getElementById(product.Id)
      .addEventListener("click", () => eraseProduct(product));
  });
}

function eraseProduct(item) {
  let newCart = [];
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.forEach((product) => {
    if (product.Id !== item.Id) {
      newCart.push(product);
    }
  });
  setLocalStorage("so-cart", newCart);

  cartCounter();
  renderCartContents();
  setEraser();
}

renderCartContents();
cartCounter();
setEraser();
