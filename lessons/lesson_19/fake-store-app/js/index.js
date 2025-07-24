const productsList = document.getElementById("products-list");

// объявим асинхронную функцию
async function fetchProducts() {
  // await - это синтаксический сахар
  const { data } = await axios.get("https://api.escuelajs.co/api/v1/products");
  data.forEach((product) => {
    const { title, description, images, id, price } = product;

    const productCard = document.createElement("li");
    productCard.id = "product-" + id;
    productCard.classList.add("product-card");

    const titleEl = document.createElement("h2");
    const descriptionEl = document.createElement("p");
    const img = document.createElement("img");
    img.referrerPolicy = "no-referrer";

    titleEl.textContent = title;
    descriptionEl.textContent = description;
    img.src = images[0];

    const priceElement = document.createElement("p");
    priceElement.textContent = "Price: " + price;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      fetchDeleteProduct(id);
    };

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      const form = document.createElement("form");
      form.id = "edit-product-" + id;

      form.innerHTML =
        '<input type="text" name="title" placeholder="title" /><input type="text" name="price" placeholder="price" /><button type="submit">Save</button>';

      productCard.appendChild(form);

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        fetchUpdateProduct(
          id,
          event.target.title.value,
          Number(event.target.price.value)
        );
      });
    };

    productCard.append(
      titleEl,
      img,
      descriptionEl,
      priceElement,
      deleteBtn,
      editBtn
    );
    productsList.appendChild(productCard);
  });
}

// не забудем вызвать функцию
fetchProducts();

// CRUD = Create Read Update Delete

async function fetchDeleteProduct(productId) {
  const productCard = document.getElementById("product-" + productId);
  const res = await fetch(
    `https://api.escuelajs.co/api/v1/products/${productId}`,
    {
      method: "DELETE",
    }
  );

  if (res.ok) {
    productsList.removeChild(productCard);
    // window.location.href = "/";
  }
}

async function fetchUpdateProduct(id, title, price) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, price }),
    headers: { "Content-Type": "application/json", accept: "application/json" },
  });
}
