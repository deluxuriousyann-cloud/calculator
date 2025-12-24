const calcDisplay = document.querySelector('.calcDisplay');
const calcButtons = document.querySelectorAll('.calcButtons');
const miniCalcDisplay = document.querySelector('.miniDisplay');

let expression = '';
let advancedDisplay = '';
let key = '';
let allowedNumbers = /^[0-9]+$/;
let allowEvaluation = true;
let userEntered = false;
let allowedSymbols = /^[+\-*/.()]+$/;

if (!userEntered) {
    setInterval(() => {
        try {
            miniCalcDisplay.style.opacity = 1;
            advancedDisplay = eval(expression);
            miniDisplay();
        } catch {
            miniCalcDisplay.textContent = `error`;
        }
    }, 100);
}

if (expression.includes('(') && expression.includes (')')) {
    miniCalcDisplay.textContent = `() is ❌`;
}

if (userEntered) {
    miniCalcDisplay.style.opacity = 0;
}

function miniDisplay() {
    miniCalcDisplay.textContent = advancedDisplay;
}

function solveInput() {
 expression = eval(expression);
 expression = Number(expression.toFixed(2));
 allowEvaluation = true;
 updateDisplay();
}

function updateDisplay() {
    if (!expression) calcDisplay.textContent = 0;
    calcDisplay.textContent = `${expression}`;
}

calcButtons.forEach(calcButton => {
    calcButton.addEventListener('click', () => {
        key = calcButton.dataset.value;
        handleInput();
        return;
    });
});


function handleInput() {
    if (allowedSymbols.test(key)) {
        expression += key;
        updateDisplay();
        return;
    }

    if (key === '=' || key === 'Enter') {
        allowEvaluation = false;
        userEntered = true;
        solveInput();
        return;
    } 

    if (key === 'Backspace') {
        expression = expression.slice(0, -1);
        updateDisplay();
        return;
    }
    
    if (key == 'c' || key == 'C') {
        expression = '';
        console.log('c pressed');
        userEntered = false;
        updateDisplay();
        return;
    }

    if (allowedNumbers.test(key)) {
        expression += key;
        updateDisplay();
        console.log(key);
        return;
    }
}

document.addEventListener('keydown', (e) => {
    key = e.key;
    handleInput();
});