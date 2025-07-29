const dog = {
  "my breed": "tax",
  age: 3,
};

console.log(dog.age); // 3

const key = "age";
console.log(dog.key); // undefined - dot syntax  .
console.log(dog[key]); // 3         - brakets syntax []

function interprete(code) {
  const codesAndInterpretations = {
    0: "Clear sky",
    1: "Mainly cloudy",
    2: "Partly cloudy",
  };

  return codesAndInterpretations[code] || "Wrong code";
}

console.log(interprete(0)); // Clear sky
console.log(interprete(2)); // Partly cloudy

console.log(interprete(10000)); // Wrong code

const x = 9 || 10; // OR is a lazy operator

console.log(x);

// falsy значения преобразуются в фолс: undefined, null, NaN, 0, ''
const y = undefined || 10;
console.log(y); // 10
