const categoryContainer = document.getElementById("category-container");
const loadingElement = document.getElementById("loading");
const errorElement = document.getElementById("error-message");

// функция для получения и отображения категорий
async function fetchCategories() {
  try {
    loadingElement.style.display = "block";
    errorElement.style.display = "none";
    categoryContainer.innerHTML = "";

    const response = await fetch("https://api.escuelajs.co/api/v1/categories");

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }

    const categories = await response.json();
    loadingElement.style.display = "none";

    const limitedCategories = categories.slice(0, 20);
    renderCategories(limitedCategories);
  } catch (error) {
    console.error("Error loading categories:", error);
    loadingElement.style.display = "none";
    errorElement.style.display = "block";
    errorElement.textContent = `Error: ${error.message}. Please try again later.`;
  }
}

function renderCategories(categories) {
  categoryContainer.innerHTML = "";

  categories.forEach((category) => {
    renderCategoryCard(category);
  });
}

// Функция для рендеринга отдельной карточки
function renderCategoryCard(category) {
  const { id, name, image, slug } = category;

  const categoryCard = document.createElement("article");
  categoryCard.className = "category-card";
  categoryCard.dataset.id = id;

  const imageContainer = document.createElement("div");
  imageContainer.className = "category-image";

  const categoryImageBg = document.createElement("div");
  categoryImageBg.className = "category-image-bg";
  categoryImageBg.style.backgroundImage = `url("${image}")`;

  const img = document.createElement("img");
  img.src = image;
  img.alt = `Category image: ${name}`;
  img.referrerPolicy = "no-referrer";
  img.loading = "lazy";
  img.onerror = function () {
    this.src =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23cccccc' d='M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14L6 17h12l-3.86-5.14z'/%3E%3C/svg%3E";
    this.alt = "Image not available";
  };
  imageContainer.appendChild(categoryImageBg);
  imageContainer.appendChild(img);

  const contentDiv = document.createElement("div");
  contentDiv.className = "category-content";

  const title = document.createElement("h2");
  title.className = "category-title";
  title.textContent = name;

  const idSpan = document.createElement("span");
  idSpan.className = "category-id";
  idSpan.textContent = `ID: ${id}, Slug: ${slug}`;

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "category-actions";

  const editButton = document.createElement("button");
  editButton.className = "btn-edit";
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () =>
    showEditForm(category, categoryCard)
  );

  const deleteButton = document.createElement("button");
  deleteButton.className = "btn-delete";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () =>
    deleteCategory(id, categoryCard)
  );

  actionsDiv.appendChild(editButton);
  actionsDiv.appendChild(deleteButton);

  contentDiv.appendChild(title);
  contentDiv.appendChild(idSpan);
  contentDiv.appendChild(actionsDiv);

  categoryCard.appendChild(imageContainer);
  categoryCard.appendChild(contentDiv);

  categoryContainer.appendChild(categoryCard);
}

async function deleteCategory(id, element) {
  if (!confirm("Are you sure you want to delete this category?")) return;

  try {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/categories/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      element.remove();
    } else {
      throw new Error("Failed to delete category");
    }
  } catch (error) {
    console.error("Delete error:", error);
    alert("Delete failed: " + error.message);
  }
}

function showEditForm(category, card) {
  const formHTML = `
    <form class="edit-form">
        <input type="text" name="name" value="${category.name}" required>
        <input type="url" name="image" value="${category.image}" required>
        <div class="form-actions">
            <button type="submit" class="btn-save">Save</button>
            <button type="button" class="btn-cancel">Cancel</button>
        </div>
    </form>
  `;

  card.querySelector(".category-content").innerHTML = formHTML;

  const form = card.querySelector(".edit-form");
  const cancelBtn = card.querySelector(".btn-cancel");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    updateCategory(
      category.id,
      {
        name: form.name.value,
        image: form.image.value,
      },
      card
    );
  });

  cancelBtn.addEventListener("click", () => {
    // Восстанавливаем исходное состояние карточки
    renderCategoryCardContent(category, card);
  });
}

async function updateCategory(id, data, card) {
  try {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/categories/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update category");
    }

    // Добавляем класс анимации
    card.classList.add("category-card-updating");

    const updatedCategory = await response.json();

    // Обновляем только текущую карточку
    renderCategoryCardContent(updatedCategory, card);

    // Убираем класс анимации после завершения
    setTimeout(() => {
      card.classList.remove("category-card-updating");
    }, 500);
  } catch (error) {
    console.error("Update error:", error);
    alert("Update failed: " + error.message);
    card.classList.remove("category-card-updating");
  }
}

// Функция для обновления контента карточки
function renderCategoryCardContent(category, card) {
  const contentDiv = card.querySelector(".category-content");
  contentDiv.innerHTML = "";

  const { id, name } = category;

  const title = document.createElement("h2");
  title.className = "category-title";
  title.textContent = name;

  const idSpan = document.createElement("span");
  idSpan.className = "category-id";
  idSpan.textContent = `ID: ${id}`;

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "category-actions";

  const editButton = document.createElement("button");
  editButton.className = "btn-edit";
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => showEditForm(category, card));

  const deleteButton = document.createElement("button");
  deleteButton.className = "btn-delete";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteCategory(id, card));

  actionsDiv.appendChild(editButton);
  actionsDiv.appendChild(deleteButton);

  contentDiv.appendChild(title);
  contentDiv.appendChild(idSpan);
  contentDiv.appendChild(actionsDiv);

  // Обновляем изображение, если оно изменилось
  const img = card.querySelector("img");
  if (img && img.src !== category.image) {
    img.src = category.image;
    img.alt = `Category image: ${name}`;

    const bg = card.querySelector(".category-image-bg");
    if (bg) {
      bg.style.backgroundImage = `url("${category.image}")`;
    }
  }
}

// Загружаем категории при загрузке страницы
fetchCategories();
