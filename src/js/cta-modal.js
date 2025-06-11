export default function setupCTAModal() {
  console.log("CTA Modal setup called");

  const modal = document.getElementById("cta-modal");
  const closeBtn = document.getElementById("cta-close");

  if (!modal || !closeBtn) {
    console.error("Modal or close button not found.");
    return;
  }

  const hasVisited = localStorage.getItem("cta_shown");

  if (!hasVisited) {
    modal.classList.remove("hidden");
    localStorage.setItem("cta_shown", "true");
  }

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
}
