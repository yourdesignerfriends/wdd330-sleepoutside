import Alert from "./Alert.js";
import { loadHeaderFooter } from "./utils.mjs";


//show alerts
const alert = new Alert("/json/alerts.json");
alert.showAlerts();

//loadHeader and footer
loadHeaderFooter().then(() => {
    const searchForm = document.getElementById("searchForm");

    if (!searchForm) {
        console.error("El formulario de búsqueda no se encontró en el DOM.");
        return;
    }

    searchForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const query = document.getElementById("searchInput").value.trim().toLowerCase();
        if (!query) return;

        try {
            const dataSource = new ProductData(); 
            const products = await dataSource.getData("tents");
            const filteredProducts = products.filter(product =>
                product.Name.toLowerCase().includes(query) ||
                product.Brand.Name.toLowerCase().includes(query)
            );

            localStorage.setItem("searchResults", JSON.stringify(filteredProducts));
            localStorage.setItem("searchActive", "true");
            window.location.href = "product_listing/index.html?";
        } catch (error) {
            console.error("Error en la búsqueda:", error);
        }
    });
});

