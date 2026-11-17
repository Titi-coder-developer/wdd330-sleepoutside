
// Find an element.
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Retrieve data from localStorage.
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Save data to localStorage.
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Listen for touch and click events.
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });

  qs(selector).addEventListener("click", callback);
}

// Get a parameter from the URL.
export function getParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

// Render a list using a template function.
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// Update the number displayed above the cart icon.
export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartCount = document.querySelector(".cart-count");

  if (cartCount) {
    cartCount.textContent = cartItems.length;
  }
}

// Render an HTML template.
export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback
) {
  parentElement.innerHTML = template;

  if (callback) {
    callback(data);
  }
}

// Load an HTML template.
export async function loadTemplate(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Could not load template from ${path}`);
  }

  return await response.text();
}

// Load the shared header and footer.
export async function loadHeaderFooter() {
  const base = import.meta.env.BASE_URL;

  const [headerHTML, footerHTML] = await Promise.all([
    loadTemplate(`${base}partials/header.html`),
    loadTemplate(`${base}partials/footer.html`),
  ]);

  const header = qs("#main-header");
  const footer = qs("#main-footer");

  if (header) {
    renderWithTemplate(headerHTML, header);

    const searchForm = header.querySelector("#search-form");

    if (searchForm) {
      searchForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const searchInput = searchForm.querySelector("#search-input");
        const searchTerm = searchInput.value.trim();

        if (!searchTerm) return;

        window.location.href =
          `${base}product_listing/index.html?search=${encodeURIComponent(searchTerm)}`;
      });
    }
  }

  if (footer) {
    renderWithTemplate(footerHTML, footer);
  }

  updateCartCount();
}
