let operator = "";
let previousValue = "";
let currentValue = "";

document.addEventListener("DOMContentLoaded", function () {
    //Store components on HTML in js
    let clear = document.querySelector(".btn-clear-button");
    let equal = document.querySelector(".btn-equal");
    let decimal = document.querySelector(".btn-decimal");

    let numbers = document.querySelectorAll(".btn-number");
    let operators = document.querySelectorAll(".btn-operator");

    let previousScreen = document.querySelector(".previous");
    let currentScreen = document.querySelector(".current");

    numbers.forEach(function (number) {
        number.addEventListener("click", function (e) {
            handleNumber(e.target.textContent);
            currentScreen.textContent = currentValue;
        });
    });

    operators.forEach(function (operatorz) {
        operatorz.addEventListener("click", function (e) {
            handleOperator(e.target.textContent);
            previousScreen.textContent = previousValue + " " + operator;
            currentScreen.textContent = currentValue;
        })
    })

    clear.addEventListener("click", function () {
        previousValue = " ";
        currentValue = " ";
        operator = " ";
        previousScreen.textContent = previousValue; 
        currentScreen.textContent = currentValue;
    })

    equal.addEventListener("click", function () {
        if (currentValue !== " " && previousValue !== " ") {
            calculate()
            previousScreen.textContent = " ";
            currentScreen.textContent = previousValue;
        }
    })

    decimal.addEventListener("click", function () {
        addDecimal();
        currentScreen.textContent = currentValue;
    })
});

function handleNumber (num) {
    if (currentValue.length <= 8) {
        currentValue += num;
    }
}

function handleOperator (operatorz) {
    operator = operatorz;
    previousValue = currentValue;
    currentValue = " ";
}

function calculate () {
    previousValue = Number (previousValue);
    currentValue = Number (currentValue);

    if (operator === "+") {
        previousValue += currentValue;
    } else if (operator === "-") {
        previousValue -= currentValue;
    } else if (operator === "x") {
        previousValue *= currentValue;
    } else {
        previousValue /= currentValue;
    }
    
    previousValue = roundNumber(previousValue);
    previousValue = previousValue.toString();
    currentValue = previousValue.toString();
}

function roundNumber(num) {
    return Math.round(num * 100000000)/ 100000000;
}

function addDecimal () {
    if (!currentValue.includes(".")) {
        currentValue += ".";
    }
}
