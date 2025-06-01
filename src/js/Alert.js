export default class Alert {
  constructor(jsonUrl) {
    this.jsonUrl = jsonUrl;
  }

  async showAlerts() {
    try {
      const response = await fetch(this.jsonUrl);
      const alerts = await response.json();

      const section = document.createElement("section");
      section.classList.add("alert-list");

      alerts.forEach((alert) => {
        const p = document.createElement("p");
        p.textContent = alert.message;
        p.style.backgroundColor = alert.background;
        p.style.color = alert.color;
        p.classList.add("alert");
        section.appendChild(p);
      });

      document.querySelector("main").prepend(section);
    } catch (err) {
      console.error("Failed to load alerts:", err);
    }
  }
}
