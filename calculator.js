let runningTotal = 0;
let buffer = '0'; // buffer, which displays the num
let previousOperator = null; // previous actions

const screen = document.querySelector('.screen');
screen.style.color = 'white'

// when user clicks a button show in the screen
// NaN = Not a Number
function buttonClick(value) {
    if (isNaN(value)){
        //this is not a number
        handleSymbol(value);
    } else {
        // this is a number
        handleNumber(value); 
    }
     // displaying the user enter values in the screen 
     screen.innerText = buffer;
}

function handleNumber(numberString) {
    if (buffer === '0') {
         buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function handleSymbol(symbol) {
    /* if (symbol === 'C') {
        buffer = '0';
        runningTotal = 0;
    } else if (symbol = '+') {
        handleMath(symbol)
    } */
    
    // Instead of using if statements above we can use switch!
    switch(symbol) {
        case "C":
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '+':
        case '-':
        case '÷':
        case '×':
            handleMath(symbol);
            break;
    }
} 

function backFunction() {
    if (buffer.length === 1) {
        buffer = '0';
    } else {
        buffer = buffer.slice(0, -1); // Remove the last character from the buffer
    }
}

// handleMath
function handleMath(symbol) {
    if (buffer === '0') {
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        // keep track of the last operation
        flushOperation(intBuffer);
    }
    
    previousOperator = symbol;
    /* we made the buffer '0', if we wanna show the last operation, 
    we can do that too with some logic */
    buffer = '0';
}

function flushOperation(intBuffer) {
    // you can also use switch here
    if (previousOperator === '+'){
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer
    } else {
        runningTotal /= intBuffer
    }
    // console.log(runningTotal)
}

// main button click js function
// Even when the init function is removed it will work!
function init() {
    document.querySelector('.calc-buttons')
        .addEventListener('click', function(event){
            buttonClick(event.target.innerText);
        });
}

init();