// Regular Function
function checkOddEven(num) {
    if (num % 2 === 0) {
        console.log(`${num} es par`);
    } else {
        console.log(`${num} es impar`);
    }
}

// Arrow Function
const checkOddEvenArrow = (num) => {
    (num % 2 === 0)
        ? console.log(`${num} es par`)
        : console.log(`${num} es impar`);
};

// Ejemplos
checkOddEven(5);
checkOddEvenArrow(10);