let currentOperations = [];
let currentNumbers = [];
let numberEntered = '';
let recentlyEvaled = false;

let operations = {
    '+': function(firstNumber, secondNumber) {
        return firstNumber + secondNumber;
    },
    '-': function(firstNumber, secondNumber) {
        return firstNumber - secondNumber;
    },
    'x': function(firstNumber, secondNumber) {
        return firstNumber * secondNumber;
    },
    '/': function(firstNumber, secondNumber) {
        return firstNumber / secondNumber;
    },
    '^': function(firstNumber, secondNumber) {
        return firstNumber ** secondNumber;
    }
}

function evaluation(finalNumbers, finalOperations) {

    while (finalOperations.length) {

        let currentIndex = 0;
        let nextIndex = currentIndex + 1;
        let currentOperation = finalOperations[currentIndex];
        let nextOperation = finalOperations[nextIndex];

        if (nextOperation == "x" || nextOperation == "/") {

            let result = operations[nextOperation](finalNumbers[nextIndex], finalNumbers[nextIndex + 1]);
            finalNumbers.splice(nextIndex, 2, result);
            finalOperations.splice(nextIndex, 1)

        } else {

            let result = operations[currentOperation](finalNumbers[currentIndex], finalNumbers[nextIndex]);
            finalNumbers.splice(currentIndex, 2, result);
            finalOperations.splice(currentIndex, 1);
        }
    }

    return finalNumbers;

    
}

function createDiv() {
    return document.createElement('div');
}

// console.log(evaluation([3.5,4.33,5,2,2,5], ['add', 'multiply', 'multiply', 'add', 'subtract']));

let body = document.querySelector("body");

let entireContainer = {
    container: createDiv(),
    screen: createDiv(),
    rowOne: createDiv(),
    rowTwo: createDiv(),
    rowThree: createDiv(),
    rowFour: createDiv(),
    rowFive: createDiv()
}

let buttons = {};
let operationSymbols = ['/', 'x', '-', '+'];

entireContainer['container'].setAttribute('style', 'display: flex; flex-direction: column; background-color: salmon; height: 500px; width: 500px');
entireContainer['screen'].setAttribute('style', 'background-color: salmon; height: 100px; width: 500px');

entireContainer['container'].appendChild(entireContainer['screen']);
body.appendChild(entireContainer['container']);

let clearButton = createDiv();
let backspaceButton = createDiv();
let divideButton = createDiv();

entireContainer['rowOne'].setAttribute('style', 'display: flex; flow-direction: row; flex: 1')

clearButton.setAttribute('style', 'background-color: gray; border: solid red 2px; flex: 1')
clearButton.textContent = 'AC'
clearButton.addEventListener('click', function() {
    if (recentlyEvaled) {
        entireContainer['screen'].textContent = "";
        recentlyEvaled = false;
    }
    numberEntered = '';
    currentNumbers = [];
    currentOperations = [];
    entireContainer['screen'].textContent = '';
})


backspaceButton.setAttribute('style', 'background-color: gray; border: solid red 2px; flex: 2');
backspaceButton.textContent = '<-'
backspaceButton.addEventListener('click', function() {
    if (recentlyEvaled) {
        entireContainer['screen'].textContent = "";
        recentlyEvaled = false;
    }

    if (entireContainer['screen'].textContent.at(-1).endsWith(" ")) {
        let tempText = entireContainer['screen'].textContent;
        tempText = tempText.slice(0,-3);
        entireContainer['screen'].textContent = tempText;
        currentOperations.pop();
        numberEntered = `${currentNumbers.pop()}`

    } else {
        let tempText = entireContainer['screen'].textContent;
        tempText = tempText.slice(0, -1);
        entireContainer['screen'].textContent = tempText;
        numberEntered = numberEntered.slice(0, -1);
    }
    
    
})



divideButton.setAttribute('style', 'background-color: gray; border: solid red 2px; flex: 1');
divideButton.textContent = operationSymbols.shift();
divideButton.addEventListener('click', function() {
    if (recentlyEvaled) {
        entireContainer['screen'].textContent = "";
        recentlyEvaled = false;
    }
    if (entireContainer['screen'].textContent.at(-1).endsWith(" ")) {
        let tempText = entireContainer['screen'].textContent;
        tempText = tempText.slice(0,-3);
        tempText += ` ${divideButton.textContent} `
        entireContainer['screen'].textContent = tempText;
        currentOperations.pop();
        currentOperations.push(divideButton.textContent);
        
    } else {
        entireContainer['screen'].textContent += ` ${divideButton.textContent} `
        currentOperations.push(divideButton.textContent);
        currentNumbers.push(Number(numberEntered));
        numberEntered = '';

    }
})


entireContainer['rowOne'].appendChild(clearButton);
entireContainer['rowOne'].appendChild(backspaceButton);
entireContainer['rowOne'].appendChild(divideButton);
entireContainer['container'].appendChild(entireContainer['rowOne']);

for (let i = 3; i < 6; i++) {

    let key = Object.keys(entireContainer)[i];
    entireContainer[key].setAttribute('style', 'display: flex; flow-direction: row; flex: 1')

    for (let j = 3*(i-3) + 1; j <= 3*(i-3) + 3; j++ ) {
        
        let newDiv = createDiv();
        newDiv.setAttribute('style', 'background-color: gray; border: solid red 2px; flex: 1');
        newDiv.textContent = `${j}`
        newDiv.addEventListener('click', function() {
            if (recentlyEvaled) {
                entireContainer['screen'].textContent = '';
                recentlyEvaled = false;
            }
            numberEntered += `${j}`
            entireContainer['screen'].textContent += `${j}`;
            ;
        })
        entireContainer[key].appendChild(newDiv);
        
        if (j % 3 == 0) {
            newDiv = createDiv();
            newDiv.setAttribute('style', 'background-color: gray; border: solid red 2px; flex: 1');
            newDiv.textContent = `${operationSymbols.shift()}`;
            newDiv.addEventListener('click', function() {
                if (recentlyEvaled) {
                    entireContainer['screen'].textContent = "";
                    recentlyEvaled = false;
                }
                if (entireContainer['screen'].textContent.at(-1).endsWith(" ")) {
                    let tempText = entireContainer['screen'].textContent;
                    tempText = tempText.slice(0,-3);
                    tempText += ` ${newDiv.textContent} `
                    entireContainer['screen'].textContent = tempText;
                    currentOperations.pop();
                    currentOperations.push(newDiv.textContent);
                    
                } else {
                    entireContainer['screen'].textContent += ` ${newDiv.textContent} `
                    currentOperations.push(newDiv.textContent);
                    currentNumbers.push(Number(numberEntered));
                    numberEntered = '';

                }
            })
            entireContainer[key].appendChild(newDiv);

        }
        
    }
    entireContainer['container'].appendChild(entireContainer[key]);
}

let decimalButton = createDiv();
let zeroButton = createDiv();
let enterButton = createDiv();

decimalButton.setAttribute('style', 'background-color: gray; border: solid red 2px; flex: 1');
zeroButton.setAttribute('style', 'background-color: gray; border: solid red 2px; flex: 1');
enterButton.setAttribute('style', 'background-color: gray; border: solid red 2px; flex: 2');

decimalButton.textContent = '.';
zeroButton.textContent = '0';
enterButton.textContent = '=';

decimalButton.addEventListener('click', function() {
    if (recentlyEvaled) {
        entireContainer['screen'].textContent = "";
        recentlyEvaled = false;
    }
    if (numberEntered.indexOf('.')== -1 && numberEntered != '') {
        numberEntered += '.';
        entireContainer['screen'].textContent += '.';
    }
})

zeroButton.addEventListener('click', function() {
    if (recentlyEvaled) {
        entireContainer['screen'].textContent = "";
        recentlyEvaled = false;
    }
    numberEntered += '0'
    entireContainer['screen'].textContent += `0`;
})

enterButton.addEventListener('click', function() {
    if (!entireContainer['screen'].textContent.at(-1).endsWith(" ")) {
        currentNumbers.push(Number(numberEntered));
        entireContainer['screen'].textContent = `${evaluation(currentNumbers, currentOperations)}`;
        numberEntered = '';
        currentNumbers = [];
        currentOperations = [];
        recentlyEvaled = true;

    }
})

entireContainer['rowFive'].setAttribute('style', 'display: flex; flow-direction: row; flex: 1');
entireContainer['rowFive'].appendChild(decimalButton);
entireContainer['rowFive'].appendChild(zeroButton);
entireContainer['rowFive'].appendChild(enterButton);
entireContainer['container'].appendChild(entireContainer['rowFive']);

