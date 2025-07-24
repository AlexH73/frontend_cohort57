const categoriesList = document.getElementById("categories");

async function fetchCategories() {
  const res = await fetch("https://api.escuelajs.co/api/v1/categories");
  if (!res.ok) {
    throw Error("Failed to fetch categories");
  }
  const categories = await res.json();

  categories.forEach((category) => {
    const { id, image, name, slug } = category;
    const categoryItem = document.createElement("li");
    const img = document.createElement("img");
    img.src = image;

    const p = document.createElement("p");
    p.textContent = name;

    categoryItem.append(p, img);
    categoryItem.classList.add("category-item");
    categoriesList.append(categoryItem);

    const form = document.createElement("form");
    form.style.display = "none";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      if (form.style.display === "block") {
        form.style.display = "none";
      } else {
        form.style.display = "block";
      }
    };

    form.innerHTML = `<input type="text" name="name" placeholder="name" value="${name}" /><input type="text" name="image" placeholder="image" value="${image}" /><button type="submit">Save</button>`;
    categoryItem.append(editBtn, form);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      // console.log(event.target.name.value);
      // console.log(event.target.image.value);
      fetchUpdateCategory(
        id,
        event.target.name.value,
        event.target.image.value,
        categoryItem
      );
    });
  });
}

fetchCategories();

async function fetchUpdateCategory(id, name, image, categoryItem) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name, image }),
    headers: { "Content-Type": "application/json" },
  });
  if (res.ok) {
    categoryItem.firstChild.textContent = name;
    categoryItem.getElementsByTagName("img")[0].src = image;
  }
}
