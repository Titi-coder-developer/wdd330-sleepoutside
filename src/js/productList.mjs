
import { renderListWithTemplate } from "./utils.mjs";

function getProductLink(id) {
    return `product_pages/index.html?id=${id}`;
}

function productCardTemplate(product) {
    return `
    <li class="product-card">
      <a href="${getProductLink(product.Id)}">
        <img src="${product.Image}" alt="${product.Name}" />
        <h2 class="card__brand">${product.Brand.Name}</h2>
        <h3 class="card__name">${product.NameWithoutBrand}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const data = await this.dataSource.getData();

        const products = data.filter((product) =>
            ["880RR", "985RF", "985PR", "344YJ"].includes(product.Id)
        );

        renderListWithTemplate(
            productCardTemplate,
            this.listElement,
            products
        );
    }
}
