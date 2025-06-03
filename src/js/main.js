import Alert from "./Alert.js";
import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const alert = new Alert("/json/alerts.json");
alert.showAlerts();

loadHeaderFooter().then(() => {
    const searchForm = document.getElementById("searchForm");

    if (!searchForm) {
        console.error("El formulario de búsqueda no se encontró en el DOM.");
        return;
    }

    searchForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const query = document.getElementById("searchInput").value.trim().toLowerCase();
        if (!query) {
            return;
        }

        try {
            const dataSource = new ProductData("tents"); 
            const products = await dataSource.getData();
            const filteredProducts = products.filter(product =>
                product.Name.toLowerCase().includes(query) ||
                product.Brand.Name.toLowerCase().includes(query)
            );

            localStorage.setItem("searchResults", JSON.stringify(filteredProducts));
            localStorage.setItem("searchActive", "true");
            window.location.href = "product-list.html";
        } catch (error) {
            console.error("Error en la búsqueda:", error);
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.href.includes("product-list.html")) {
        const searchResults = JSON.parse(localStorage.getItem("searchResults"));
        const searchActive = localStorage.getItem("searchActive");

        if (!searchActive) {
            localStorage.removeItem("searchResults");
            const dataSource = new ProductData("tents"); 
            const element = document.querySelector(".product-list");
            const productList = new ProductList("tents", dataSource, element);
            productList.init();
        }
    }

    localStorage.removeItem("searchActive");
});

const searchResults = JSON.parse(localStorage.getItem("searchResults"));
const searchActive = localStorage.getItem("searchActive");
const dataSource = searchResults && searchActive ? { getData: async () => searchResults } : new ProductData("tents");
const element = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, element);
productList.init();
