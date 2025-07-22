const form = document.getElementById("add-category-form");
const messageEl = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Очищаем предыдущие сообщения
  messageEl.textContent = "";
  messageEl.className = "";

  const formData = new FormData(form);
  const categoryData = {
    name: formData.get("name"),
    image: formData.get("image"),
  };

  try {
    const response = await fetch(
      "https://api.escuelajs.co/api/v1/categories/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      }
    );

    if (response.ok) {
      const data = await response.json();

      // Показываем сообщение об успехе
      messageEl.textContent = "Category created successfully!";
      messageEl.classList.add("success");

      // Очищаем форму
      form.reset();

      // Через 3 секунды убираем сообщение и перенаправляем на страницу категорий
      setTimeout(() => {
        messageEl.textContent = "";
        messageEl.className = "";
        window.location.href = "../categories";
      }, 3000);
    } else {
      // Если сервер вернул ошибку
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create category");
    }
  } catch (error) {
    console.error("Error:", error);

    // Показываем сообщение об ошибке
    messageEl.textContent =
      error.message || "An error occurred. Please try again.";
    messageEl.classList.add("error");

    // Через 5 секунд убираем сообщение
    setTimeout(() => {
      messageEl.textContent = "";
      messageEl.className = "";
    }, 5000);
  }
});
