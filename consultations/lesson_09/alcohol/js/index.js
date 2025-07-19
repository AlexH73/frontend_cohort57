function getRandomCocktail() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      .then((response) => response.json())
      .then((data) => {
        const cocktail = data.drinks[0];
        document.getElementById("coctail-image").src = cocktail.strDrinkThumb;
        document.getElementById("coctail-image").alt = cocktail.strDrink;
        document.getElementById("coctail-description").innerText = `Название: ${cocktail.strDrink}. Описание: ${cocktail.strInstructionsDE}.`;
      })
      .catch((error) => {
        console.error("Error fetching cocktail:", error);
        document.getElementById("coctail-description").innerText = "Не удалось загрузить коктейль. Попробуйте позже.";
      });
}
getRandomCocktail();