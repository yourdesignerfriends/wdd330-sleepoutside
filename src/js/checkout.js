import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

let checkoutProcess;

// Load the header and footer
document.addEventListener('DOMContentLoaded', async () => {
  await loadHeaderFooter();
  
  // Initialize checkout process
  checkoutProcess = new CheckoutProcess('so-cart', '.order-summary');
  checkoutProcess.init();
  // Calculate order total immediately after initialization
  checkoutProcess.calculateOrderTotal();
  
  // Add form validation
  const form = document.getElementById('checkout-form');
  if (form) {
    form.addEventListener('submit', validateForm);
  }

  // Add zip code change listener
  const zipInput = document.getElementById('zip');
  if (zipInput) {
    zipInput.addEventListener('change', () => {
      checkoutProcess.calculateOrderTotal();
    });
  }
});

function validateForm(event) {
  event.preventDefault();
  
  // Get all required inputs
  const inputs = document.querySelectorAll('input[required]');
  let isValid = true;

  // Check if all required fields are filled
  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }
  });

  if (isValid) {
    // In a real application, you would send this data to your server
    alert('Order placed successfully!');
    // Clear the cart
    localStorage.removeItem('so-cart');
    // Redirect to home page
    window.location.href = '/index.html';
  }

  return false;
}