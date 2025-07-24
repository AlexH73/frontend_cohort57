// https://www.amazon.com/gp/video/search?phrase=asd&k=asd&ref=atv_rs_redirect

// URL Uniform Resourse Locator
// Resourse ->           любой файл, например картинка, html или любой другой код
// www.amazon.com ->     Domain
// https ->              протокол - правила - как мы можем делать запросы
//  - http                  - основные правила
// /gp/video/search ->   Путь - path
// ?phrase=asd&k=asd&ref=atv_rs_redirect -> query параметры
//      вопросительный знак и дальше пары ключ значение через амперсант без пробелов
//      phrase: asd
//      k: asd
//      ref: atv_rs_redirect

// /products/1
// /products/25 - path variable - параметр пути - переменная пути - получить один продукт под id25
// /products?color=red  -> получить все продукты удовлетоворяющие условию

const loginForm = document.getElementById("login-form");
const messageEl = document.getElementById("message");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //   console.log(event.target.email.value);
  const credentials = {
    email: e.target.email.value,
    password: e.target.password.value,
  };
  //   console.log(credentials);
  fetchLogin(credentials);
});

async function fetchLogin(credentials) {
  const res = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const err = await res.json();
    const { message } = err;
    messageEl.textContent = message;
    messageEl.style.color = "red";
  } else {
    const tokenObj = await res.json();
    console.log(tokenObj);
    const { access_token } = tokenObj;
    localStorage.setItem("accessToken", access_token);
    window.location.href = "/profile";
  }
}

// POST https://api.escuelajs.co/api/v1/auth/login
// Content-Type: application/json

// {
//   "email": "john@mail.com",
//   "password": "changeme"
// }

// {
//     message: "",
//     statusCode:""
// }

// Cookies, localStorage, sessionStorage
