import { getLocalStorage, setLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

// Get the product ID from the URL
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

// Display the selected product
async function displayProduct() {
  const product = await dataSource.findProductById(productId);

  if (!product) {
    document.querySelector('.product-detail').innerHTML =
      '<p>Product not found.</p>';
    return;
  }

  document.getElementById('product-brand').textContent = product.Brand.Name;
  document.getElementById('product-name').textContent = product.Name;
  document.getElementById('product-image').src = product.Image;
  document.getElementById('product-image').alt = product.Name;
  document.getElementById('product-price').textContent =
    `$${product.FinalPrice}`;
  document.getElementById('product-color').textContent =
    product.Colors[0].ColorName;
  document.getElementById('product-description').innerHTML =
    product.DescriptionHtmlSimple;

  document.getElementById('addToCart').dataset.id = product.Id;
}

displayProduct();

function addProductToCart(product) {
  const cartItems = getLocalStorage('so-cart') || [];
  cartItems.push(product);
  setLocalStorage('so-cart', cartItems);
}

async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
