import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

let checkoutProcess;

// Load the header and footer
document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();

  // Initialize checkout process
  checkoutProcess = new CheckoutProcess("so-cart", ".order-summary");
  checkoutProcess.init();
  // Calculate order total immediately after initialization
  checkoutProcess.calculateOrderTotal();

  // Add form validation
  const form = document.getElementById("checkout-form");
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      console.log("Form submitted"); // Debug log

      // Get all required inputs
      const inputs = document.querySelectorAll("input[required]");
      let isValid = true;

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add("error");
        } else {
          input.classList.remove("error");
        }
      });

      if (isValid) {
        try {
          console.log("Form is valid, submitting..."); // Debug log
          const response = await checkoutProcess.checkout(form);
          console.log("Order response:", response); // Debug log
          alert("Order placed successfully!");
          localStorage.removeItem("so-cart");
          window.location.href = "/index.html";
        } catch (error) {
          console.error("Checkout error:", error); // Debug log
          alert("There was an error processing your order. Please try again.");
        }
      }
    });
  }

  // Add zip code change listener
  const zipInput = document.getElementById("zip");
  if (zipInput) {
    zipInput.addEventListener("change", () => {
      checkoutProcess.calculateOrderTotal();
    });
  }
});
