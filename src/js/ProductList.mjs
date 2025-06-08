import { renderListWithTemplate, showBreadCrumb} from "./utils.mjs";

function productCardTemplate(product) {
  // AD- Extract product details for cleaner code
  // add responsiveImage and delete imagen
  const { Id, responsiveImage, Name, Brand, FinalPrice, SuggestedRetailPrice } = product;
  
  // AD- Initialize discountTag to avoid reference errors
  let discountTag = "";
  
  // AD- Check if the product is discounted
  if (FinalPrice < SuggestedRetailPrice) {
    // AD- Calculate the discount percentage dynamically
    const discountPercentage = ((SuggestedRetailPrice - FinalPrice) / SuggestedRetailPrice) * 100;
    // AD- Create an HTML tag displaying the discount percentage
    discountTag = `<span class="discount-badge">-${Math.round(discountPercentage)}% OFF</span>`;
  }
  // AD- Return the product card structure with the discount indicator if applicable
  // I change this <img src="${Images.PrimaryMedium}" alt="${Name}"> for this: <img src="${responsiveImage}" alt="${Name}">
  return `
    <li class="product-card">
      <a href="../product_pages/?product=${Id}">
      <img src="${responsiveImage}" alt="${Name}">
      <h2>${Brand.Name}</h2>
      <h3>${Name}</h3>
      <p class="product-card__price">$${FinalPrice.toFixed(2)}</p>
      ${discountTag} <!-- AD- add discount tag -->
      </a>
    </li>
  `;
}

// AD- Class responsible for managing the product list on the page
export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = []; // Store the original list of products
  }

  async init() {
    this.products = await this.dataSource.getData(this.category);
    this.renderList(this.products);
    this.rendertitle(this.category);
    showBreadCrumb(this.products.length);
    this.initSortControls(); // Initialize sorting controls
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  rendertitle(category){
    document.querySelector(".title").innerHTML =`Top Products: ${category}`;
  }

  initSortControls() {
    const sortByElement = document.getElementById("sort-by");
    if (sortByElement) {
      sortByElement.addEventListener("change", (event) => {
        this.sortProducts(event.target.value);
      });
    }
  }

  sortProducts(sortByValue) {
    let sortedList = [...this.products]; // Create a copy to sort

    switch (sortByValue) {
      case "name-asc":
        sortedList.sort((a, b) => a.Name.localeCompare(b.Name));
        break;
      case "name-desc":
        sortedList.sort((a, b) => b.Name.localeCompare(a.Name));
        break;
      case "price-asc":
        sortedList.sort((a, b) => a.FinalPrice - b.FinalPrice);
        break;
      case "price-desc":
        sortedList.sort((a, b) => b.FinalPrice - a.FinalPrice);
        break;
    }
    this.renderList(sortedList);
  }
}