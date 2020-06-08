// DOM elements
const buttons = document.querySelectorAll('.number-button');
const screen = document.getElementById('screen');
const equals = document.getElementById('equals-btn');
const clearBtn = document.getElementById('clear-btn');
const backspaceBtn = document.getElementById('backspace-btn');

let operatorsPressed = [];
let prevNum = '';
let currentNum = '';
let resultValue = '';

// Operate
function operate(operator, num1, num2) {

    if(operator === '+') {
        return num1 + num2;
    } else if(operator === '-') {
        return num1 - num2;
    } else if(operator === 'x') {
        return num1 * num2;
    } else if(operator === '/') {
        return num1 / num2;
    } else {
        return;
    }
}

// Display numbers pressed on screen
function displayOnScreen(input) {
    // Changes screen text to whatever input is passed in
    screen.innerText = input;
}

// Operator pressed function
function opPressed() {
    // When operator is pressed the previous number is set to the current number without the operator
    prevNum = currentNum.slice(0, currentNum.length -1);
    // Current number is cleared to allow the new number to be input
    currentNum = '';
}

// Clear everything      
function clear() {
    screen.innerText = 0;
    previousNum = '';
    currentNum = '';
    resultValue = '';
    operatorsPressed = [];

    screen.style.fontSize = '2rem'
}

// Backspace
function backspace() {
    // Sets current number to whatever it is with the last digit taken off the end
    currentNum = currentNum.slice(0, currentNum.length -1);
    // Display updated number
    displayOnScreen(currentNum)
}

// Check for decimal
function checkDecimal(input) {
    // Checks if number on screen already has a decimal and won't allow another to be added
    if(input == '.' && screen.innerText.includes('.') ) {
        // When second decimal is entered it is taken off the end and current number is reset
        currentNum = currentNum.slice(0, currentNum.length - 1);
    }
}

// Check length of number
function checkLengthOfNum(input) {
    // Changes font size when numbers are large
    input.length > 12 ? screen.style.fontSize = '1.2rem' : screen.style.fontSize = '2rem';
    input.length > 18 ? screen.style.fontSize = '1rem' : screen.style.fontSize = '2rem';
}

// Event listeners
buttons.forEach(btn => btn.addEventListener('click', () => {
    // Sets current number
    currentNum += btn.innerText;

    if(screen.innerText === '0') {
        screen.innerText = '';
    }

    checkDecimal(btn.innerText);

    displayOnScreen(currentNum);

    checkLengthOfNum(currentNum);

    // Checks if operator is pressed
    if(btn.innerText === '/' ||
       btn.innerText === 'x' ||
       btn.innerText === '-' ||
       btn.innerText === '+') {
            // Store operator pressed
            operatorsPressed.push(btn.innerText);
            opPressed();
    }

    // If there is no previous number 
    if(prevNum === '') return;

    // Checks if the problem is stringed together one e.g. 2 + 2 - 1
    if(operatorsPressed.length > 1) {
        // Updates the previous value to the result of the sum
        prevNum = resultValue;
        // Removes the first stored operator so the new one is at index [0]
        operatorsPressed.shift();
        // Call operate
        resultValue = operate(operatorsPressed[0], prevNum, +currentNum);
        displayOnScreen(resultValue);
    } else {
        displayOnScreen(currentNum);
        resultValue = operate(operatorsPressed[0], +prevNum, +currentNum);
    }

}));


equals.addEventListener('click', () => {
    // Doesn't allow division by 0
    if(currentNum == 0 && operatorsPressed[0] == '/') {
        alert('Don\'t do that');
        clear();
    }

    // Previous number set to nothing
    prevNum = '';

    currentNum = resultValue;

    // If there is a decimal this makes sure it is to 3 decimal places 
    resultValue.toString().includes('.') ? resultValue = resultValue.toFixed(3) : resultValue;

    // Display result on screen
    displayOnScreen(resultValue);
});

clearBtn.addEventListener('click', clear);

backspaceBtn.addEventListener('click', backspace);