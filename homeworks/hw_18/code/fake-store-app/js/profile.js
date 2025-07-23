const heading = document.getElementById("heading");
const img = document.getElementById("avatar");
const emailEl = document.getElementById("email");
const roleEl = document.getElementById("role");
const profileActions = document.querySelector(".profile-actions");
const profileContainer = document.querySelector(".profile-container");

// Функция для показа уведомлений
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

// Обработчик ошибок для изображения
function handleImageError() {
  img.src = "../../../../../assets/images/avatar-placeholder.png";
  img.alt = "Placeholder avatar";
  img.title = "Placeholder avatar";
}

// Функция выхода из системы
function logout() {
  localStorage.removeItem("accessToken");
  window.location.href = "../index.html";
}

// Функция переключения в режим редактирования
function toggleEditMode(isEditing) {
  const nameElement = heading; // Используем заголовок для имени
  const emailElement = emailEl; // Используем элемент email

  if (isEditing) {
    // Сохраняем оригинальные значения
    profileContainer.dataset.originalName = nameElement.textContent;
    profileContainer.dataset.originalEmail = emailElement.textContent;

    // Заменяем текст на поля ввода
    nameElement.innerHTML = `<input type="text" id="edit-name" value="${nameElement.textContent}" class="edit-input">`;
    emailElement.innerHTML = `<input type="email" id="edit-email" value="${emailElement.textContent}" class="edit-input">`;

    // Обновляем кнопки
    profileActions.innerHTML = `
      <button class="profile-btn save">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
        Save Changes
      </button>
      <button class="profile-btn cancel">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
        Cancel
      </button>
    `;

    // Добавляем обработчики для новых кнопок
    document
      .querySelector(".profile-btn.save")
      .addEventListener("click", saveProfileChanges);
    document
      .querySelector(".profile-btn.cancel")
      .addEventListener("click", cancelEdit);
  } else {
    // Восстанавливаем оригинальные значения
    nameElement.textContent = profileContainer.dataset.originalName;
    emailElement.textContent = profileContainer.dataset.originalEmail;

    // Восстанавливаем кнопки
    profileActions.innerHTML = `
      <button class="profile-btn edit">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
        </svg>
        Edit Profile
      </button>
      <button class="profile-btn logout">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
        </svg>
        Logout
      </button>
    `;

    // Добавляем обработчики для восстановленных кнопок
    document
      .querySelector(".profile-btn.edit")
      .addEventListener("click", () => toggleEditMode(true));
    document
      .querySelector(".profile-btn.logout")
      .addEventListener("click", logout);
  }
}

// Функция сохранения изменений профиля
async function saveProfileChanges() {
  const nameInput = document.getElementById("edit-name");
  const emailInput = document.getElementById("edit-email");
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  // Валидация
  if (!name || !email) {
    showNotification("Please fill in all fields", "error");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showNotification("Please enter a valid email address", "error");
    return;
  }

  try {
    const token = localStorage.getItem("accessToken");
    const userId = profileContainer.dataset.userId;

    const response = await fetch(
      `https://api.escuelajs.co/api/v1/users/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update profile");
    }

    const updatedUser = await response.json();

    // Обновляем данные на странице
    heading.textContent = updatedUser.name;
    emailEl.textContent = updatedUser.email;

    // Обновляем оригинальные значения для будущих редактирований
    profileContainer.dataset.originalName = updatedUser.name;
    profileContainer.dataset.originalEmail = updatedUser.email;

    showNotification("Profile updated successfully!", "success");
    toggleEditMode(false);
  } catch (error) {
    showNotification(`Failed to update profile: ${error.message}`, "error");
    console.error("Error updating profile:", error);
  }
}

// Функция отмены редактирования
function cancelEdit() {
  toggleEditMode(false);
}

// Основная функция получения профиля
async function fetchProfile() {
  const token = localStorage.getItem("accessToken");

  // Если нет токена, показываем состояние для неавторизованных пользователей
  if (!token) {
    showUnauthenticatedState();
    return;
  }

  try {
    const res = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) {
      // Неавторизованный доступ
      localStorage.removeItem("accessToken");
      showUnauthenticatedState();
      return;
    }

    if (!res.ok) {
      throw new Error("Failed to fetch profile");
    }

    const user = await res.json();
    console.log(user);

    // Сохраняем ID пользователя для будущих обновлений
    profileContainer.dataset.userId = user.id;

    const { avatar, email, name, role } = user;
    heading.textContent = name;
    img.src = avatar;
    img.alt = `Avatar of ${name}`;
    img.title = `Avatar of ${name}`;
    img.onerror = handleImageError;
    emailEl.textContent = email;
    roleEl.textContent = role;

    // Добавляем обработчики для кнопок
    document
      .querySelector(".profile-btn.edit")
      .addEventListener("click", () => toggleEditMode(true));
    document
      .querySelector(".profile-btn.logout")
      .addEventListener("click", logout);
  } catch (error) {
    console.error("Error fetching profile:", error);
    showNotification("Failed to load profile. Please try again.", "error");
    showUnauthenticatedState();
  }
}

// Функция для показа состояния неавторизованного пользователя
function showUnauthenticatedState() {
  heading.textContent = "Guest User";
  img.src = "../../../../../assets/images/placeholders/avatar-placeholder.png";
  img.alt = "Guest avatar";
  img.title = "Guest avatar";
  emailEl.textContent = "guest@example.com";
  roleEl.textContent = "guest";

  // Обновляем кнопки
  profileActions.innerHTML = `
    <a href="../signin/" class="profile-btn edit">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M10 17l5-5-5-5v10z"/>
        <path d="M0 24V0h24v24H0z" fill="none"/>
      </svg>
      Sign In
    </a>
    <a href="../signup/" class="profile-btn edit">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
      Sign Up
    </a>
  `;
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  // Устанавливаем обработчик ошибок для аватара
  img.onerror = handleImageError;

  // Загружаем профиль
  fetchProfile();
});
