
const baseURL = import.meta.env.VITE_SERVER_URL;

// Convert the response to JSON.
function convertToJson(response) {
  if (response.ok) {
    return response.json();
  }

  throw new Error("Bad Response");
}

export default class ProductData {
  // Get products by category.
  async getData(category) {
    const response = await fetch(
      `${baseURL}products/search/${encodeURIComponent(category)}`
    );

    const data = await convertToJson(response);
    return data.Result;
  }

  // Search products by name or brand.
  async searchProducts(searchTerm) {
    const response = await fetch(`${baseURL}products`);
    const data = await convertToJson(response);

    const products = data.Result || data;
    const search = searchTerm.toLowerCase();

    return products.filter((product) => {
      return (
        product.Name.toLowerCase().includes(search) ||
        product.NameWithoutBrand.toLowerCase().includes(search) ||
        product.Brand.Name.toLowerCase().includes(search)
      );
    });
  }

  // Find one product by ID.
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);

    return data.Result;
  }
}
