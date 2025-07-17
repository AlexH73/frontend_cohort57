const select = document.getElementById("categoryId");
const form = document.getElementById("add-product-form");

async function fetchCategories() {
  const res = await fetch("https://api.escuelajs.co/api/v1/categories");
  const categories = await res.json();
  console.log(categories);
  //  пример  <option value="1">Electronics</option>
  categories.forEach((category) => {
    const option = document.createElement("option"); // <option></option>
    option.value = category.id; // <option value="44"></option>
    option.textContent = category.name; // <option value="44">Furniture 670</option>
    select.appendChild(option);
  });
}

fetchCategories();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newProduct = {
    title: event.target.title.value,
    price: Number(event.target.price.value),
    description: event.target.desc.value,
    categoryId: Number(event.target.categoryId.value),
    images: [event.target.image.value],
  };
console.log("Sending:", newProduct);
  fetchCreateProduct(newProduct);
});

async function fetchCreateProduct(product) {
  const res = await fetch("https://api.escuelajs.co/api/v1/products/", {
    method: "POST",
    body: JSON.stringify(product),
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    window.location.href = "../";
  }
}
