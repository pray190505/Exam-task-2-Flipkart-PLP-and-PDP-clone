// Fetch products from the Fake Store API
const apiUrl = 'https://fakestoreapi.com/products';
let products = [];

// Fetch products and display them
async function fetchProducts() {
  const response = await fetch(apiUrl);
  products = await response.json();
  displayProducts(products);
}

// Convert the price to INR and display the products
function convertToINR(price) {
  return `₹${(price * 80).toFixed(2)}`; // Approximate 1 USD = 80 INR
}

// Display products on the PLP
function displayProducts(products) {
  const productsContainer = document.getElementById('products');
  productsContainer.innerHTML = '';

  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.onclick = () => openModal(product);

    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p class="product-price">${convertToINR(product.price)}</p>
    `;

    productsContainer.appendChild(productDiv);
  });
}

// Open PDP modal
function openModal(product) {
  document.getElementById('productModal').style.display = 'block';
  document.getElementById('modalTitle').textContent = product.title;
  document.getElementById('modalImage').src = product.image;
  document.getElementById('modalPrice').textContent = `Price: ${convertToINR(product.price)}`;
  document.getElementById('modalDescription').textContent = product.description;
  document.getElementById('modalCategory').textContent = `Category: ${product.category}`;
  document.getElementById('modalRating').textContent = `Rating: ${product.rating.rate} / 5`;
}

// Close PDP modal
function closeModal() {
  document.getElementById('productModal').style.display = 'none';
}

// Sorting products
function sortProducts() {
  const sortBy = document.getElementById('sortBy').value;
  let sortedProducts = [...products];

  if (sortBy === 'priceAsc') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'priceDesc') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
  }

  displayProducts(sortedProducts);
}

// Filter products
document.getElementById('category').addEventListener('change', (e) => {
  const category = e.target.value;
  const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
  displayProducts(filteredProducts);
});

// Initial fetch
fetchProducts();
