const form = document.getElementById("add-category-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(event.target.name.value);
  console.log(event.target.image.value);
  fetchAddCategory({
    name: event.target.name.value,
    image: event.target.image.value,
  });
});

async function fetchAddCategory(newCategory) {
//   const res = await fetch("https://api.escuelajs.co/api/v1/categories", {
//     method: "POST",
//     body: JSON.stringify(newCategory),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch categories");
//   }

//   console.log(res.status);
const {data, status} = await axios.post("https://api.escuelajs.co/api/v1/categories", newCategory, {
  headers: { "Content-Type": "application/json" },
});
console.log(data);
console.log(status);

}
