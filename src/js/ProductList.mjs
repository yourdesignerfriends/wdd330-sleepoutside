import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  // AD- Extract product details for cleaner code
  const { Id, Images, Name, Brand, FinalPrice, SuggestedRetailPrice } = product;
  
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
  return `
    <li class="product-card">
      <a href="../product_pages/?product=${Id}">
      <img src="${Images.PrimaryMedium}" alt="${Name}">
      <h2>${Brand.Name}</h2>
      <h3>${Name}</h3>
      <p class="product-card__price">$${FinalPrice.toFixed(2)}</p>
      ${discountTag} <!-- Agregamos el indicador de descuento -->
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
  }

  // AD- Method to initialize product loading
  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }

  // AD- Method that renders the product list on the page
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
