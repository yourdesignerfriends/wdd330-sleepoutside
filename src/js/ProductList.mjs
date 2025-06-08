import { renderListWithTemplate, showBreadCrumb } from "./utils.mjs";

function productCardTemplate(product) {
  const { Id, responsiveImage, Name, Brand, FinalPrice, SuggestedRetailPrice } = product;

  let discountTag = "";
  if (FinalPrice < SuggestedRetailPrice) {
    const discountPercentage = ((SuggestedRetailPrice - FinalPrice) / SuggestedRetailPrice) * 100;
    discountTag = `<span class="discount-badge">-${Math.round(discountPercentage)}% OFF</span>`;
  }

  return `
    <li class="product-card">
      <a href="../product_pages/?product=${Id}">
        <img src="${responsiveImage}" alt="${Name}">
        <h2>${Brand.Name}</h2>
        <h3>${Name}</h3>
        <p class="product-card__price">$${FinalPrice.toFixed(2)}</p>
        ${discountTag}
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.list = []; // ✅ store the list for sorting
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.list = list; // ✅ save to use later for sorting
    this.renderList(this.list);
    this.rendertitle(this.category);
    showBreadCrumb(list.length);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  rendertitle(category) {
    document.querySelector(".title").innerHTML = `Top Products: ${category}`;
  }

  // ✅ Sorting method
  sortProducts(criteria) {
    if (criteria === "name") {
      this.list.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (criteria === "price") {
      this.list.sort((a, b) => a.FinalPrice - b.FinalPrice);
    }
    this.renderList(this.list);
  }
}
