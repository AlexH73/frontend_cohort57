const productsList = document.getElementById("products-list");

// объявим асинхронную функцию
async function fetchProducts() {
  // await - это синтаксический сахар
  const res = await fetch("https://api.escuelajs.co/api/v1/products");
  const products = await res.json();
  console.log(products);

  products.forEach((product) => {
    const { title, price, description, images } = product;

    const productCard = document.createElement("li");
    productCard.classList.add("product-card");

    const titleEl = document.createElement("h2");
    const priceEl = document.createElement("span");
    const descriptionEl = document.createElement("p");
    const img = document.createElement("img");
    img.referrerPolicy = "no-referrer";

    titleEl.textContent = title;
    titleEl.title = title; 
    priceEl.textContent = `$${price}`;
    priceEl.className = "product-price";
    descriptionEl.textContent = description;
    img.src = images[0];
    img.alt = `Изображение товара: ${title}`;
    img.referrerPolicy = "no-referrer"; // защита от реферера
    img.loading = "lazy"; // ленивая загрузка для оптимизации

    // обработчик ошибок загрузки изображения
    img.onerror = function () {
      // Заменяем битое изображение на SVG-заглушку
      this.src =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23cccccc' d='M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14L6 17h12l-3.86-5.14z'/%3E%3C/svg%3E";
      this.alt = "Изображение недоступно";
    };

    productCard.append(titleEl, priceEl, img, descriptionEl);
    productsList.appendChild(productCard);
  });
}

// не забудем вызвать функцию
fetchProducts();

// CRUD = Create Read Update Delete
