let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    value = convertSymbol(value); // Sonderzeichen umwandeln

    if (!isNaN(value) || value === ".") {
        handleNumber(value);
    } else {
        handleSymbol(value);
    }
    screen.innerText = buffer;
}

function convertSymbol(symbol) {
    const symbolMap = {
        "÷": "/",
        "×": "*",
        "−": "-",
        "+": "+",
        "=": "=",
        "←": "←",
        "C": "C",
        ",": "." // Komma zu Punkt umwandeln
    };
    return symbolMap[symbol] || symbol;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            previousOperator = null;
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseFloat(buffer)); // Rechnen mit Float-Werten
            previousOperator = null;
            buffer = `${runningTotal}`;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return;
    }
    const floatBuffer = parseFloat(buffer);

    if (runningTotal === 0) {
        runningTotal = floatBuffer;
    } else if (previousOperator !== null) {
        flushOperation(floatBuffer);
    }

    previousOperator = symbol;
    buffer = "0";
}

function flushOperation(floatBuffer) {
    if (previousOperator === '+') {
        runningTotal += floatBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= floatBuffer;
    } else if (previousOperator === '*') {
        runningTotal *= floatBuffer;
    } else if (previousOperator === '/') {
        if (floatBuffer === 0) {
            alert("Fehler: Division durch 0 ist nicht erlaubt!");
            return;
        }
        runningTotal /= floatBuffer;
    }
}

function handleNumber(numberString) {
    if (numberString === "." && buffer.includes(".")) {
        return; // Kein zweites Komma erlauben
    }

    if (buffer === '0') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function(event) {
        if (event.target.tagName === "BUTTON") {
            buttonClick(event.target.innerText.trim()); // Leerzeichen entfernen
        }
    });
}

init();
