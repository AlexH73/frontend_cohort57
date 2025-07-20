// Элементы DOM
const productsList = document.getElementById("products-list");
const loadingEl = document.getElementById("loading");

// Функция для получения placeholder-изображения
function getPlaceholderImage() {
  return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' fill='%23f0f0f0'/%3E%3Cpath d='M21 5v14H5V5h16m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12H8v-2h10v2zm-4 4H8v-2h6v2zm4-8H8V7h10v2z' fill='%23ccc'/%3E%3C/svg%3E";
}

// Функция для проверки изображения
function getProductImage(product) {
  // Базовые проверки
  if (!product.images || !Array.isArray(product.images)) {
    return getPlaceholderImage();
  }

  if (product.images.length === 0) {
    return getPlaceholderImage();
  }

  const imageUrl = product.images[0];

  // Дополнительные проверки URL
  if (typeof imageUrl !== "string") {
    return getPlaceholderImage();
  }

  if (imageUrl.trim() === "") {
    return getPlaceholderImage();
  }

  // Проверка известных проблемных паттернов
  const badPatterns = [
    '["',
    '"]',
    "placeholder",
    "example.com",
    "dummyimage",
    "fakestoreapi",
  ];

  if (badPatterns.some((pattern) => imageUrl.includes(pattern))) {
    return getPlaceholderImage();
  }

  return imageUrl;
}

// Функция для замены битых изображений
function replaceBrokenImage(img) {
  const placeholder = getPlaceholderImage();
  img.src = placeholder;

  const bg = img.parentNode.querySelector(".product-image-bg");
  if (bg) {
    bg.style.backgroundImage = `url(${placeholder})`;
  }
}

// Функция показа/скрытия индикатора загрузки
function showLoading(isLoading) {
  loadingEl.style.display = isLoading ? "block" : "none";
  productsList.style.display = isLoading ? "none" : "grid";
}

// Основная функция получения товаров
async function fetchProducts() {
  try {
    // Показать индикатор загрузки
    showLoading(true);

    // Запрос к API
    const response = await fetch("https://api.escuelajs.co/api/v1/products");

    // Проверка успешности запроса
    if (!response.ok) {
      throw new Error("Не удалось загрузить товары");
    }

    // Получение данных
    const products = await response.json();

    // Рендер товаров
    renderProducts(products);

    // Скрыть индикатор загрузки
    showLoading(false);
  } catch (error) {
    // Обработка ошибок
    showLoading(false);
    productsList.innerHTML = `
      <div class="no-results">
        <h3>Error loading products</h3>
        <p>${error.message}</p>
        <button onclick="fetchProducts()">Retry</button>
      </div>
    `;
    console.error("Error fetching products:", error);
  }
}

// Функция рендеринга товаров
function renderProducts(products) {
  if (products.length === 0) {
    productsList.innerHTML = `
      <div class="no-results">
        <h3>No products found</h3>
        <p>${error.message}</p>
        <button onclick="location.reload()">Retry</button>
      </div>
    `;
    return;
  }

  // Формирование HTML для списка товаров
  productsList.innerHTML = products
    .map((product) => {
      const imgUrl = getProductImage(product);
      return `
    <li class="product-card">
      <div class="product-image">
        <div class="product-image-bg" style="background-image: url('${imgUrl}')"></div>
        <img src="${imgUrl}" 
             alt="${product.title}" 
             referrerpolicy="no-referrer"
             onerror="replaceBrokenImage(this)"
             loading="lazy">
        <span class="product-price">$${product.price.toFixed(2)}</span>
      </div>
      <div class="product-info">
        <h2 class="product-title">${product.title}</h2>
        <p class="product-description">${product.description}</p>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    </li>
  `;
    })
    .join("");
}

// Инициализация приложения
document.addEventListener("DOMContentLoaded", () => {
  // Загрузка товаров
  fetchProducts();
});
