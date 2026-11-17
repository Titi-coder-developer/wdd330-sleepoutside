import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter().catch(console.error);

const searchTerm = getParam("search");
const category = getParam("category") || "tents";

const categoryNames = {
  tents: "Tents",
  backpacks: "Backpacks",
  "sleeping-bags": "Sleeping Bags",
  hammocks: "Hammocks",
};

const heading = document.querySelector("#category-title");

if (searchTerm) {
  heading.textContent = `Search Results for: ${searchTerm}`;
} else {
  heading.textContent = `Top Products: ${categoryNames[category] || category}`;
}

document.title = heading.textContent;

const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");

const productList = new ProductList(
  searchTerm || category,
  dataSource,
  listElement
);

if (searchTerm) {
  productList.initSearch(searchTerm).catch(console.error);
} else {
  productList.init().catch(console.error);
}