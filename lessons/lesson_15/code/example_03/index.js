const productsList = document.getElementById("products-list");

//GET запрос на сервер
fetch("https://api.escuelajs.co/api/v1/products")
  .then((res) => res.json())
  .then((products) => {
    console.log(products);
    products.forEach((product) => {
      // destructuring assignment
      const { title, price, images } = product;
      const productItem = document.createElement("li");
      const h3 = document.createElement("h3");
      h3.textContent = title;
      productItem.appendChild(h3);
      productsList.appendChild(productItem);

      const priceSpan = document.createElement("span");
      priceSpan.textContent = `${price} €`;

      productItem.appendChild(priceSpan);

      images.forEach((url) => {
        const img = document.createElement("img");
        img.src = url;
        img.width = "200";
        img.referrerPolicy = "no-referrer";
        img.crossOrigin = "anonymous";
        productItem.appendChild(img);
      });
    });
  });
