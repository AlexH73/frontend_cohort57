const categoryContainer = document.getElementById("category-container");
const loadingElement = document.getElementById("loading");
const errorElement = document.getElementById("error-message");

// функция для получения и отображения категорий
async function fetchCategories() {
  try {
    // Показываем "Loading..." при загрузке.
    loadingElement.style.display = "block";
    errorElement.style.display = "none";
    categoryContainer.innerHTML = "";

    const response = await fetch("https://api.escuelajs.co/api/v1/categories");

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }

    const categories = await response.json();

    // Скрываем индикатор загрузки
    loadingElement.style.display = "none";

    // ограничиваем количество категорий
    const limitedCategories = categories.slice(0, 20);

    // создаем карточки для каждой категории
    limitedCategories.forEach((category) => {
      const { id, name, image } = category;

      const categoryCard = document.createElement("article");
      categoryCard.className = "category-card";

      // создаем элемент изображения
      const img = document.createElement("img");
      img.className = "category-image";
      img.src = image;
      img.alt = `Изображение категории: ${name}`;
      img.referrerPolicy = "no-referrer"; // защита от реферера
      img.loading = "lazy"; // ленивая загрузка для оптимизации

      // обработчик ошибок загрузки изображения
      img.onerror = function () {
        // Заменяем битое изображение на SVG-заглушку
        this.src =
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23cccccc' d='M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14L6 17h12l-3.86-5.14z'/%3E%3C/svg%3E";
        this.alt = "Изображение недоступно";
      };

      // создаем контейнер для текстового контента
      const contentDiv = document.createElement("div");
      contentDiv.className = "category-content";

      // Создаем заголовок категории
      const title = document.createElement("h2");
      title.className = "category-title";
      title.textContent = name;

      // Создаем элемент для отображения ID
      const idSpan = document.createElement("span");
      idSpan.className = "category-id";
      idSpan.textContent = `ID: ${id}`;

      // Добавляем элементы в блок
      contentDiv.appendChild(title);
      contentDiv.appendChild(idSpan);

      // Собираем карточку
      categoryCard.appendChild(img);
      categoryCard.appendChild(contentDiv);

      // Добавляем карточку в контейнер
      categoryContainer.appendChild(categoryCard);
    });
  } catch (error) {
    // Обработка ошибок
    console.error("Ошибка при загрузке категорий:", error);
    loadingElement.style.display = "none"; // Скрываем индикатор загрузки
    errorElement.style.display = "block"; // Показываем сообщение об ошибке
    errorElement.textContent = `Ошибка: ${error.message}. Пожалуйста, попробуйте позже.`;
  }
}

// не забудем вызвать функцию
fetchCategories();