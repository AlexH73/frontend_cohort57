const img = document.getElementById("picture");

fetch("https://api.thecatapi.com/v1/images/search")
  .then((res) => res.json())
  .then((obj) => {
    console.log(obj[0].url);
    img.src = obj[0].url;
  });
