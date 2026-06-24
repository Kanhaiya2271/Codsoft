// ===== Get all the elements =====

let currentDisplay = document.getElementById("current");
let previousDisplay = document.getElementById("previous");
let clearBtn = document.getElementById("clearBtn");
let deleteBtn = document.getElementById("deleteBtn");
let equalsBtn = document.getElementById("equalsBtn");
let numberBtns = document.querySelectorAll(".number");
let operatorBtns = document.querySelectorAll(".operator");

// variables to store calculator state
let currentValue = "0";
let previousValue = "";
let operator = "";
let shouldReset = false;


// ===== Number Button Click =====

for (let i = 0; i < numberBtns.length; i++) {
    numberBtns[i].addEventListener("click", function () {
        let value = this.getAttribute("data-value");

        // if we just calculated a result, start fresh
        if (shouldReset) {
            currentValue = "";
            shouldReset = false;
        }

        // dont allow multiple dots
        if (value === "." && currentValue.includes(".")) {
            return;
        }

        // replace the initial 0 with the number
        if (currentValue === "0" && value !== ".") {
            currentValue = value;
        } else {
            currentValue = currentValue + value;
        }

        updateDisplay();
    });
}


// ===== Operator Button Click =====

for (let i = 0; i < operatorBtns.length; i++) {
    operatorBtns[i].addEventListener("click", function () {
        let selectedOp = this.getAttribute("data-value");

        // if there's a pending calculation, do it first
        if (operator !== "" && !shouldReset) {
            calculate();
        }

        previousValue = currentValue;
        operator = selectedOp;
        shouldReset = true;

        // show the expression in the top line
        let displayOp = selectedOp;
        if (selectedOp === "*") displayOp = "×";
        if (selectedOp === "/") displayOp = "÷";

        previousDisplay.textContent = previousValue + " " + displayOp;
    });
}


// ===== Equals Button =====

equalsBtn.addEventListener("click", function () {
    if (operator === "" || shouldReset) return;
    calculate();
    previousDisplay.textContent = "";
    operator = "";
});


// ===== Clear Button =====

clearBtn.addEventListener("click", function () {
    currentValue = "0";
    previousValue = "";
    operator = "";
    shouldReset = false;
    previousDisplay.textContent = "";
    updateDisplay();
});


// ===== Delete Button =====

deleteBtn.addEventListener("click", function () {
    if (shouldReset) return;

    if (currentValue.length === 1 || currentValue === "0") {
        currentValue = "0";
    } else {
        currentValue = currentValue.slice(0, -1);
    }
    updateDisplay();
});


// ===== Calculate Function =====

function calculate() {
    let prev = parseFloat(previousValue);
    let curr = parseFloat(currentValue);
    let result;

    if (isNaN(prev) || isNaN(curr)) return;

    if (operator === "+") {
        result = prev + curr;
    } else if (operator === "-") {
        result = prev - curr;
    } else if (operator === "*") {
        result = prev * curr;
    } else if (operator === "/") {
        if (curr === 0) {
            result = "Error";
        } else {
            result = prev / curr;
        }
    } else if (operator === "%") {
        result = prev % curr;
    }

    // round to avoid floating point issues like 0.1 + 0.2 = 0.300000004
    if (typeof result === "number") {
        result = Math.round(result * 1000000) / 1000000;
    }

    currentValue = result.toString();
    shouldReset = true;
    updateDisplay();
}


// ===== Update the display =====

function updateDisplay() {
    currentDisplay.textContent = currentValue;
}
