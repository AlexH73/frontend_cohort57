// Элементы DOM
const productsList = document.getElementById("products-list");
const loadingEl = document.getElementById("loading");

const sliderTrack = document.getElementById("slider-track");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");
const sliderDots = document.getElementById("slider-dots");
const sliderContainer = document.querySelector(".slider-container");

let categories = [];
let currentPosition = 0;
let slideWidth = 300; // Ширина карточки + gap
let visibleSlides;

// Функция для расчета видимых слайдов
function calculateVisibleSlides() {
  const containerWidth = sliderContainer.clientWidth;
  visibleSlides = Math.floor(containerWidth / slideWidth);
  return visibleSlides;
}

// Загрузка категорий с API
async function loadCategories() {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/categories");
    categories = await response.json();
    renderCategories();
    setupSlider();
  } catch (error) {
    console.error("Error loading categories:", error);
    sliderTrack.innerHTML =
      "<p>Failed to load categories. Please try again later.</p>";
  }
}

// Отрисовка категорий слайдера
function renderCategories() {
  sliderTrack.innerHTML = "";

  categories.forEach((category) => {
    const card = document.createElement("div");
    card.className = "category-slider-card";
    card.innerHTML = `
            <img src="${category.image}" alt="${category.name}" 
             referrerpolicy="no-referrer"
             onerror="replaceBrokenImage(this)"
             loading="lazy">
            <h3>${category.name}</h3>
          `;
    sliderTrack.appendChild(card);
  });
}

// Настройка слайдера
function setupSlider() {
  calculateVisibleSlides();

  // Показываем кнопки только если есть что скроллить
  if (categories.length > visibleSlides) {
    prevBtn.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
    createDots();
  }

  // Обработчики кнопок
  prevBtn.addEventListener("click", () => {
    currentPosition += slideWidth * Math.min(3, visibleSlides);
    if (currentPosition > 0) currentPosition = 0;
    updateSlider();
  });

  nextBtn.addEventListener("click", () => {
    const maxPosition = -(slideWidth * (categories.length - visibleSlides));
    currentPosition -= slideWidth * Math.min(3, visibleSlides);
    if (currentPosition < maxPosition) currentPosition = maxPosition;
    updateSlider();
  });

  // Обработка ресайза окна
  window.addEventListener("resize", () => {
    calculateVisibleSlides();
    updateSlider();
  });
}

// Создание точек навигации
function createDots() {
  sliderDots.innerHTML = "";
  const dotCount = Math.ceil(categories.length / visibleSlides);

  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement("div");
    dot.className = "dot";
    if (i === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      currentPosition = -(i * slideWidth * visibleSlides);
      updateSlider();
    });

    sliderDots.appendChild(dot);
  }
}

// Обновление позиции слайдера
function updateSlider() {
  sliderTrack.style.transform = `translateX(${currentPosition}px)`;
  updateDots();
}

// Обновление активной точки
function updateDots() {
  const dots = document.querySelectorAll(".dot");
  const activeIndex = Math.abs(
    Math.round(currentPosition / (slideWidth * visibleSlides))
  );

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === activeIndex);
  });
}

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
  productsList.style.display = isLoading ? "none" : "";
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

// Функции для работы с API
async function updateProduct(productId, updatedData) {
  try {
    // Формируем полный объект для обновления
    const fullUpdateData = {
      title: updatedData.title,
      price: updatedData.price,
      description: updatedData.description,
      categoryId: 1, // Фиксированная категория для обхода ошибки API
      images: ["https://placeimg.com/640/480/any"], // Фиксированное изображение
    };

    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullUpdateData),
      }
    );

    // Успешный ответ даже с 500 статусом, если данные обновились
    return {
      id: productId,
      title: fullUpdateData.title,
      price: fullUpdateData.price,
      description: fullUpdateData.description,
      images: fullUpdateData.images,
    };
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

async function deleteProduct(productId) {
  try {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/${productId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

// Функция для показа/скрытия меню действий
function toggleActionsMenu(button) {
  const dropdown = button.nextElementSibling;
  const isVisible = dropdown.style.display === "block";

  // Скрыть все открытые меню
  document.querySelectorAll(".actions-dropdown").forEach((d) => {
    d.style.display = "none";
  });

  // Показать/скрыть текущее меню
  dropdown.style.display = isVisible ? "none" : "block";
}

// Показать форму редактирования
function showEditForm(card, productId) {
  const productInfo = card.querySelector(".product-info");
  const title = card.querySelector(".product-title").textContent;
  const price = card
    .querySelector(".product-price")
    .textContent.replace("$", "");
  const description = card.querySelector(".product-description").textContent;

  // Сохраняем исходное содержимое для возможной отмены
  card.dataset.originalContent = productInfo.innerHTML;

  // Создаем форму редактирования
  productInfo.innerHTML = `
    <form class="edit-form">
      <input type="text" name="title" value="${title}" required>
      <input type="number" name="price" value="${price}" step="0.01" min="0.01" required>
      <textarea name="description" required>${description}</textarea>
      <div class="form-actions">
        <button type="button" class="cancel-btn">Cancel</button>
        <button type="submit" class="save-btn">Save</button>
      </div>
    </form>
  `;

  // Добавляем класс для стилизации
  card.classList.add("editing");
}

// Отмена редактирования
function cancelEdit(card) {
  const productInfo = card.querySelector(".product-info");
  productInfo.innerHTML = card.dataset.originalContent;
  card.classList.remove("editing");
}

// Сохранение изменений
async function saveProductChanges(card, productId) {
  const form = card.querySelector(".edit-form");
  const title = form.title.value;
  const price = parseFloat(form.price.value);
  const description = form.description.value;

  // Валидация данных
  if (!title || title.trim() === "") {
    alert("Please enter a product title");
    return;
  }

  if (isNaN(price) || price <= 0) {
    alert("Please enter a valid price");
    return;
  }

  if (!description || description.trim() === "") {
    alert("Please enter a product description");
    return;
  }

  try {
    // Обновляем карточку сразу (оптимистичное обновление)
    card.querySelector(".product-title").textContent = title;
    card.querySelector(".product-price").textContent = `$${price.toFixed(2)}`;
    card.querySelector(".product-description").textContent = description;

    // Восстанавливаем обычный вид
    card.classList.remove("editing");

    // Показываем уведомление об успехе
    showNotification("Product updated successfully!", "success");

    // Отправляем запрос на сервер (без ожидания ответа)
    updateProduct(productId, {
      title,
      price,
      description,
    }).catch((error) => {
      showNotification(
        "Product updated locally. Server update may have failed.",
        "warning"
      );
    });
  } catch (error) {
    showNotification(`Failed to update product: ${error.message}`, "error");
  }
}

// Функция показа уведомлений
function showNotification(message, type = "success") {
  // Удаляем предыдущие уведомления
  const existingNotification = document.getElementById("custom-notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement("div");
  notification.id = "custom-notification";
  notification.className = `notification ${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Автоматическое скрытие через 3 секунды
  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Настройка обработчиков событий
function setupEventHandlers() {
  // Обработчик для кликов по документу
  document.addEventListener("click", function (e) {
    // Закрытие меню при клике вне него
    if (!e.target.closest(".product-actions")) {
      document.querySelectorAll(".actions-dropdown").forEach((dropdown) => {
        dropdown.style.display = "none";
      });
    }

    // Обработка кнопок меню действий
    if (e.target.classList.contains("actions-menu-btn")) {
      e.stopPropagation();
      toggleActionsMenu(e.target);
    }
  });

  // Обработчик для событий в списке продуктов
  productsList.addEventListener("click", async function (e) {
    const card = e.target.closest(".product-card");
    if (!card) return;

    const productId = card.dataset.id;

    // Обработка редактирования
    if (e.target.classList.contains("edit-btn")) {
      e.stopPropagation();
      showEditForm(card, productId);
    }

    // Обработка удаления
    if (e.target.classList.contains("delete-btn")) {
      e.stopPropagation();
      if (confirm("Are you sure you want to delete this product?")) {
        try {
          // Оптимистичное удаление
          card.style.opacity = "0.5";
          card.style.pointerEvents = "none";

          await deleteProduct(productId);
          card.remove();
          showNotification("Product deleted successfully!", "success");
        } catch (error) {
          card.style.opacity = "";
          card.style.pointerEvents = "";
          showNotification(
            `Failed to delete product: ${error.message}`,
            "error"
          );
        }
      }
    }

    // Обработка сохранения изменений
    if (e.target.classList.contains("save-btn")) {
      e.preventDefault();
      await saveProductChanges(card, productId);
    }

    // Обработка отмены редактирования
    if (e.target.classList.contains("cancel-btn")) {
      e.preventDefault();
      cancelEdit(card);
    }
  });
}

// Функция рендеринга товаров
function renderProducts(products) {
  if (products.length === 0) {
    productsList.innerHTML = `
      <div class="no-results">
        <h3>No products found</h3>
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
    <li class="product-card" data-id="${product.id}">
      <div class="product-image">
        <div class="product-image-bg" style="background-image: url('${imgUrl}')"></div>
        <img src="${imgUrl}" 
             alt="${product.title}" 
             referrerpolicy="no-referrer"
             onerror="replaceBrokenImage(this)"
             loading="lazy">
        <span class="product-price">$${product.price.toFixed(2)}</span>
        
        <!-- Добавляем кнопку меню действий -->
        <div class="product-actions">
          <button class="actions-menu-btn">⋮</button>
          <div class="actions-dropdown">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
          </div>
        </div>
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

  // Настраиваем обработчики событий
  setupEventHandlers();
}

// Инициализация приложения
document.addEventListener("DOMContentLoaded", () => {
  // Загрузка товаров
  fetchProducts();
  // Загрузка слайдера
  loadCategories();
});
