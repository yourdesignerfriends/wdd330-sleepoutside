import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  
  const { Id, Images, Name, Brand, FinalPrice, SuggestedRetailPrice } = product;
  
  
  let discountTag = "";
  
  
  if (FinalPrice < SuggestedRetailPrice) {
    
    const discountPercentage = ((SuggestedRetailPrice - FinalPrice) / SuggestedRetailPrice) * 100;
    
    discountTag = `<span class="discount-badge">-${Math.round(discountPercentage)}% OFF</span>`;
  }
  
  
  return `
    <li class="product-card">
      <a href="../product_pages/index.html?product=${Id}">
        <div class="product-image-container">
          <img src="${Images?.PrimaryMedium || '../images/no-image.png'}" alt="${Name}">
          ${discountTag}
        </div>    
        <h2>${Brand.Name}</h2>
        <h3>${Name}</h3>
        <p class="product-card__price">$${FinalPrice.toFixed(2)}</p>
      </a>
    </li>
  `;
}

// AD- Retrieve search results from local storage
const searchResults = JSON.parse(localStorage.getItem("searchResults")) || [];

// AD- Render the search results if available
const listElement = document.querySelector(".product-list");

if (searchResults.length > 0) {
  renderListWithTemplate(productCardTemplate, listElement, searchResults);
}


// AD- Class responsible for managing the product list on the page
export default class ProductList {
  
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  
  }


  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    this.updateTitle();
  }


  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  updateTitle() {
    const titleElement = document.querySelector("h2");
    if (!titleElement) return;
    
    const displayMap = {
      tents: "Tents",
      "sleeping-bags": "Sleeping Bags",
      backpacks: "Backpacks",
      hammocks: "Hammocks",
      search: "Search Results",
    };

    if (this.category === "search") {
      titleElement.textContent = "Search Results";
    } else {
      const formatted = this.category.replace("-", " ");
      titleElement.textContent = `Top Products: ${formatted.charAt(0).toUpperCase() + formatted.slice(1)}`;
    }
  }
}
