
import ProductData from "./ProductData.mjs";
import ProductList from "./productList.mjs";
import { getParam, updateCartCount } from "./utils.mjs";

// Get the category from the URL
const category = getParam("category");

// Format the category name
const categoryName = category
    ? category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Products";

// Update the page heading and browser tab title
document.querySelector("#category-title").textContent =
    `Top Products: ${categoryName}`;

document.title = `Top Products: ${categoryName}`;

// Create the data source
const dataSource = new ProductData();

// Create the product list
const productList = new ProductList(
    category,
    dataSource,
    document.querySelector(".product-list")
);

// Display the products
productList.init();

// Update the cart count
updateCartCount();
