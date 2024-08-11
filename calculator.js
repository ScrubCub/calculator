let currentOperations = [];
let currentNumbers = [];

let operations = {
    add: function(firstNumber, secondNumber) {
        return firstNumber + secondNumber;
    },
    subtract: function(firstNumber, secondNumber) {
        return firstNumber - secondNumber;
    },
    multiply: function(firstNumber, secondNumber) {
        return firstNumber * secondNumber;
    },
    divide: function(firstNumber, secondNumber) {
        return firstNumber / secondNumber;
    },
    raise: function(firstNumber, secondNumber) {
        return firstNumber ** secondNumber;
    }
}

function evaluation(finalNumbers, finalOperations) {

    while (finalOperations.length) {

        let currentIndex = 0;
        let nextIndex = currentIndex + 1;
        let currentOperation = finalOperations[currentIndex];
        let nextOperation = finalOperations[nextIndex];

        if (nextOperation == "multiply" || nextOperation == "divide") {

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

console.log(evaluation([3,4,5,2,2,5], ['add', 'multiply', 'multiply', 'add', 'subtract']));