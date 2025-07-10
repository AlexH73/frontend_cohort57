const heading = document.getElementById("heading");
const shipTitle = document.getElementById("ship-title");
const cannonInfo = document.getElementById("cannon-number");
const weaponList = document.getElementById("weapon-list");

// Promise<Respone> -json-> Promise<Pirate>
fetch("https://alexh73.github.io/pirate-api/jack-sparrow.json") // Promise<Response>
  .then((res) => res.json()) // Promise<Pirate>
  .then((obj) => {
    // console.log(obj.age);
    heading.textContent = obj.name;
    shipTitle.textContent += obj.ship.title;
    cannonInfo.textContent += obj.ship.numberOfCanons;

    obj.weapons.forEach((el) => {
      const li = document.createElement("li"); //<li></li>
      li.textContent = el;
      weaponList.appendChild(li);
    });
  })
  .catch((e) => {
    console.log(e);
  });
