// 1. Отправить запрос на https://api.sampleapis.com/wines/whites
//  и получить (вывести в консоль) массив с данными о белых винах
// 2. Отрисовать карточки вин с рейтингом 4.8 и более (image, wine, winery, rating)
// 3. Стилизовать карточки (border, padding, border-radius).
//  Из контейнера сделать grid - 5 колонок + отступы
//  display: grid;
//  grid-template-columns: repeat(5, 1fr);
//  gap: 40px;
// 4. Если у вина рейтинг 4.9 и больше то покрасить карточку
//  в светло-зеленый. А если 4.8 - то в светло-голубой

// 1. Отправка запроса и получение данных
async function fetchWines() {
  try {
    const response = await fetch("https://api.sampleapis.com/wines/whites");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const wines = await response.json();
    console.log("Wines data:", wines);
    return wines;
  } catch (error) {
    console.error("Error fetching wines:", error);
    return [];
  }
}

// 2-4. Отрисовка карточек с стилизацией
function renderWines(wines) {
  const container = document.querySelector(".container");
  container.innerHTML = "";

  // Фильтруем вина с рейтингом 4.8 и выше
  const filteredWines = wines.filter((wine) => {
    const rating = parseFloat(wine.rating.average);
    return rating >= 4.8;
  });

  if (filteredWines.length === 0) {
    container.innerHTML =
      '<p class="no-wines">No wines found with rating 4.8+</p>';
    return;
  }

  // Создаем grid-контейнер
  const gridContainer = document.createElement("div");
  gridContainer.className = "wines-grid";

  // Создаем карточки для каждого вина
  filteredWines.forEach((wine) => {
    const rating = parseFloat(wine.rating.average);

    const wineCard = document.createElement("div");
    wineCard.className = "wine-card";

    // Добавляем класс в зависимости от рейтинга
    if (rating >= 4.9) {
      wineCard.classList.add("high-rating");
    } else {
      wineCard.classList.add("medium-rating");
    }

    wineCard.innerHTML = `
            <img src="${wine.image}" alt="${wine.wine}" class="wine-image"
                 onerror="replaceBrokenImage(this)">
            <h3 class="wine-name">${wine.wine}</h3>
            <p class="winery">${wine.winery}</p>
            <p class="rating">★ ${wine.rating.average} (${wine.rating.reviews} reviews)</p>
        `;

    gridContainer.appendChild(wineCard);
  });

  container.appendChild(gridContainer);
}

// Функция для замены битых изображений
function replaceBrokenImage(img) {
  const placeholder = getPlaceholderImage();
  img.src = placeholder;
  img.alt = "Image not available";
}

// Функция для получения placeholder-изображения
function getPlaceholderImage() {
  return "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgMTIwIDMwMCI+PHJlY3Qgd2lkdGg9IjEyMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNmZmYiLz48Zz48cmVjdCB4PSI1MCIgeT0iMTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSI0MCIgZmlsbD0iIzMxMzEzMSIvPjxwYXRoIGQ9Ik00MCw1MCBDNDAuMiwxMDAgMzAuNSwxOTUgMzUsMjQ1IEMzOCwyNzAgNjAsMjcwIDg1LDI0NSBDODgsMTk1IDc4LDEwMCA4MCw1MCBaIiBmaWxsPSIjZGRkIi8+PHJlY3QgeD0iNDciIHk9IjEyNSIgd2lkdGg9IjI2IiBoZWlnaHQ9IjQ1IiByeD0iNSIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZGRkIi8+PHJlY3QgeD0iNTQiIHk9IjE0NSIgd2lkdGg9IjEyIiBoZWlnaHQ9IjI1IiBmaWxsPSIjZDUwM2M0Ii8+PC9nPjwvc3ZnPg==";
}

// Инициализация приложения
async function init() {
  const wines = await fetchWines();
  renderWines(wines);
}

// Запускаем при загрузке страницы
document.addEventListener("DOMContentLoaded", init);
