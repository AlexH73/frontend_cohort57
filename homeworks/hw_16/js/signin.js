const signinForm = document.getElementById("signin-form");
const messageEl = document.getElementById("message");

signinForm.addEventListener("submit", (event) => {
  event.preventDefault();

  messageEl.textContent = "";
  messageEl.classList.remove("error", "success");

  const user = {
    email: event.target.email.value,
    password: event.target.password.value,
  };

  // Выводим объект в консоль как требуется в задании
  //console.log(user);

  // Отправляем запрос на авторизацию
  fetchSignin(user);
});

async function fetchSignin(user) {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (response.ok) {
      messageEl.textContent = "Login successful!";
      messageEl.classList.add("success");

      // Сохраняем токен доступа (для последующих запросов)
      localStorage.setItem("accessToken", data.access_token);
      console.log("Access Token:", data.access_token);

      // Перенаправляем на главную
      // window.location.href = "../../lessons/lesson_16/code/fake-store-app/";
    } else {
      throw new Error(data.message || "Login failed");
    }
  } catch (error) {
    messageEl.textContent = error.message;
    messageEl.classList.add("error");
  }
}
