export default function setupNewsletterForm() {
    const form = document.getElementById("newsletterForm");
    const emailInput = document.getElementById("newsletterEmail");
    const message = document.getElementById("newsletterMessage");
  
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
  
        if (email) {
          localStorage.setItem("newsletter-signup", email);
          message.classList.remove("hidden");
          form.reset();
        }
      });
    }
  }
  