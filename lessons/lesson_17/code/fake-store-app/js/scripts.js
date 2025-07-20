const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

// Обработчик для мобильного меню
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    navToggle.classList.toggle("active");
  });

  // Закрытие меню при клике вне его области
  document.addEventListener("click", (e) => {
    if (
      navLinks.classList.contains("active") &&
      !navToggle.contains(e.target) &&
      !navLinks.contains(e.target)
    ) {
      navLinks.classList.remove("active");
      navToggle.classList.remove("active");
    }
  });