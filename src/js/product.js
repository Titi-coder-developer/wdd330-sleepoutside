import {
  getLocalStorage,
  setLocalStorage,
  updateCartCount,
  loadHeaderFooter,
} from "./utils.mjs";

import ProductData from "./ProductData.mjs";

const dataSource = new ProductData();

// Get the product ID from the URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("product");

// Create a unique storage key for each product's comments
const commentsKey = `product-comments-${productId}`;

// Get comments saved for this product
function getComments() {
  try {
    return JSON.parse(localStorage.getItem(commentsKey)) || [];
  } catch (error) {
    console.error("Could not load comments:", error);
    return [];
  }
}

// Display comments
function renderComments() {
  const commentsList = document.querySelector("#comments-list");

  if (!commentsList) return;

  const comments = getComments();
  commentsList.innerHTML = "";

  if (comments.length === 0) {
    commentsList.innerHTML =
      "<p>No comments yet. Be the first to comment!</p>";
    return;
  }

  comments.forEach((comment) => {
    const commentCard = document.createElement("article");
    commentCard.classList.add("comment-card");

    const name = document.createElement("h3");
    name.textContent = comment.name;

    const text = document.createElement("p");
    text.textContent = comment.text;

    const date = document.createElement("small");
    date.textContent = new Date(comment.date).toLocaleString();

    commentCard.append(name, text, date);
    commentsList.appendChild(commentCard);
  });
}

// Save a new comment
function addComment(event) {
  event.preventDefault();

  const nameInput = document.querySelector("#comment-name");
  const commentInput = document.querySelector("#comment-text");

  const name = nameInput.value.trim();
  const text = commentInput.value.trim();

  if (!name || !text) return;

  const comments = getComments();

  comments.push({
    name,
    text,
    date: new Date().toISOString(),
  });

  localStorage.setItem(commentsKey, JSON.stringify(comments));

  document.querySelector("#comment-form").reset();
  renderComments();
}

// Add product to cart
function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];

  const existingItem = cartItems.find((item) => item.Id === product.Id);

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    product.quantity = 1;
    cartItems.push(product);
  }

  setLocalStorage("so-cart", cartItems);
  updateCartCount();
}

// Display product details
async function renderProductDetails() {
  const productSection = document.querySelector(".product-detail");

  if (!productId) {
    productSection.innerHTML = "<p>No product was selected.</p>";
    return;
  }

  try {
    const product = await dataSource.findProductById(productId);

    if (!product) {
      productSection.innerHTML = "<p>Sorry, product not found.</p>";
      return;
    }

    document.title = `Sleep Outside | ${product.Name}`;

    document.querySelector("#product-brand").textContent =
      product.Brand.Name;

    document.querySelector("#product-name").textContent =
      product.NameWithoutBrand;

    const image = document.querySelector("#product-image");
    image.src = product.Images.PrimaryLarge;
    image.alt = product.Name;

    document.querySelector("#product-price").textContent =
      `$${product.FinalPrice}`;

    document.querySelector("#product-color").textContent =
      product.Colors?.[0]?.ColorName || "";

    document.querySelector("#product-description").innerHTML =
      product.DescriptionHtmlSimple;

    // Add product to cart
    document.querySelector("#addToCart").addEventListener("click", () => {
      addProductToCart(product);
    });
    // Display and handle comments
    renderComments();

    const commentForm = document.querySelector("#comment-form");

    if (commentForm) {
      commentForm.addEventListener("submit", addComment);
    }
  } catch (error) {
    console.error("Error loading product:", error);
    productSection.innerHTML =
      "<p>Sorry, we could not load this product. Please try again.</p>";
  }
}

// Run the functions
renderProductDetails();
loadHeaderFooter().catch(console.error);