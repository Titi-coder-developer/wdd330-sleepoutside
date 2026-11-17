import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount, loadHeaderFooter } from "./utils.mjs";

// Load the shared header and footer
loadHeaderFooter().catch(console.error);

// Get the tent products
const dataSource = new ProductData();

const productList = new ProductList(
    "tents",
    dataSource,
    document.querySelector(".product-list")
);

// Display the products
productList.init().catch(console.error);

// Update the cart count
updateCartCount();