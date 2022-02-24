const answer = 'leech';
const userInput = 'belee';
let word = document.querySelector('.answer')
let guess = document.querySelector('.guess')
let check = document.querySelector('.check')

word.textContent = answer.toUpperCase()
guess.textContent = userInput.toUpperCase();

function checkMatches(answer, userWord) {
    let checkAnswer = answer.split("");
    let checkUserWord = userWord.split("");
    let firstPass = '';
    let secondPass = '';
    checkUserWord.forEach((value, index) => {
        if (value === checkAnswer[index]) {
            checkAnswer[index] = '*';
            firstPass += '*';
        } else {
            firstPass += value;
        }
    })
    let firstPassArray = firstPass.split('');
    firstPassArray.forEach((value) => {
        if (checkAnswer.includes(value)) {
            if (value !== '*') {
                secondPass += '@';
                let replaceIndex = checkAnswer.findIndex((letter) => letter === value)
                checkAnswer[replaceIndex] = '/'
            } else {
                secondPass += '*';
            }
        } else {
            secondPass += 'X';
        }
    })

    return secondPass.split("");
}


let checked = checkMatches(answer, userInput)
console.log(checked)
// check.textContent = checked.toUpperCase()

