const products = [
    {
        name: "Wireless Headphones",
        description: "Noise-cancelling, over-ear Bluetooth headphones.",
        price: "$99.99",
        image: "https://placehold.co/200x100?text=Headphones"
    },
    {
        name: "Smart Watch",
        description: "Track your fitness and stay connected.",
        price: "$149.99",
        image: "https://placehold.co/200x100?text=Smart Watch"
    },
    {
        name: "Portable Charger",
        description: "10,000mAh power bank with fast charging.",
        price: "$29.99",
        image: "https://placehold.co/200x100?text=Charger"
    }
];

const template = document.getElementById("product-card");
const productList = document.getElementById("product-list");

products.forEach((product) => {
    const clone = template.content.cloneNode(true);
    const [title, desc, price, img] = clone.querySelectorAll("h2, p, p, img");

    title.textContent = product.name;
    desc.textContent = product.description;
    price.textContent = product.price;
    img.src = product.image;
    img.alt = product.name;

    productList.appendChild(clone);
});
