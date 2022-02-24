const index = document.querySelector('.overlay')
const modalClose = document.querySelector('.closeBtn')
const instructionsBtn = document.getElementById('instructions')
let allKeys = document.querySelectorAll('.keypadKey')
let wordInput = document.getElementById('wordInput')
let guessedWord
let randomWord
let matchResult
let counter = 0
wordInput.value = ""
document.getElementById("enterButton").setAttribute('disabled', '')

function getRandom(array) {
    return Math.floor(Math.random() * parseInt(array.length))
}

function enableEnterButton (length) {
    if (length === 5) {
        document.getElementById("enterButton").removeAttribute('disabled')
    } else {
        document.getElementById("enterButton").setAttribute('disabled', '')
    }
}

function outcomeOutput(bool, inputWord) {
    document.querySelector('.textInput').style.display = 'none'
    document.querySelector('form').style.justifyContent = 'center'
    let pTag = document.createElement('p')
    let resultDiv = document.createElement('div')
    resultDiv.classList.add('textInput', 'retryInput')
    if(bool) {
        let correctText = document.createTextNode(inputWord.toLowerCase() + ' was correct')
        pTag.appendChild(correctText)
        buttonSwitchToRetry()
    } else {
        let incorrectText = document.createTextNode(inputWord.toLowerCase() + ' was incorrect')
        pTag.appendChild(incorrectText)
    }
    resultDiv.appendChild(pTag)
    document.querySelector('form').appendChild(resultDiv)
    document.querySelector('form').style.flexDirection = 'row-reverse'
}

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
                secondPass += 'rightLetter,';
                let replaceIndex = checkAnswer.findIndex((letter) => letter === value)
                checkAnswer[replaceIndex] = '/'
            } else {
                secondPass += 'correct,';
            }
        } else {
            secondPass += 'wrongLetter,';
        }
    })

    let output = secondPass.split(",");
    output.pop();
    return output;
}

function addTileRow(guessedWord) {
    let guessedWordTile = guessedWord
    let rowId = "tileRow" + counter
    let letterArray = guessedWordTile.split("")
    let classArray = checkMatches(randomWord, guessedWord)
    letterArray.forEach((letter, index) => {
        let divTag = document.createElement('div')
        let resultClass = classArray[index]
        divTag.classList.add('tile', resultClass)
        let pTag = document.createElement('p')
        pTag.innerText = letter.toUpperCase()
        divTag.appendChild(pTag)
        document.getElementById(rowId).appendChild(divTag)
        let letterSelector = "[data-letter=" + letter + "]"
        let keypadKey = document.querySelector(letterSelector)
        let classKeyArray = keypadKey.className.split(' ')
        if ( !classKeyArray.includes('correct')) {
            let keypadClass = 'keypadKey ' + resultClass
            keypadKey.setAttribute('class', keypadClass)
        }
        if ( classKeyArray.includes('rightLetter') && resultClass === 'wrongLetter') {
            keypadKey.setAttribute('class', 'keypadKey rightLetter')
        }

    })
}

function buttonSwitchToRetry () {
    document.querySelector('.submitFormButton').style.display = 'none'
    document.querySelector('.retryButton').style.display = 'block'
    document.querySelector('.retryButton').addEventListener('click', () => {
        window.location.reload()
    })
}

fetch('words.json')
    .then((data)=> {
        return data.json()
    }).then((result) => {
    let randomNumber = getRandom(result.fiveLetterWords)
    randomWord = result.fiveLetterWords[randomNumber]
    if(randomWord === document.cookie.split('=')[1]){
        window.location.reload()
    }
    document.cookie = "word=" + randomWord + ";expiry = Thu, 31 Dec 2037 12:00:00 UTC;"
})

instructionsBtn.addEventListener('click', (e) => {
    index.style.display = 'flex'
})

modalClose.addEventListener('click', (e) => {
    index.style.display = 'none'
})

window.addEventListener('click', (e) => {
    if (e.target == index) {
        index.style.display = "none"
    }
})


allKeys.forEach((key) => {
    key.addEventListener('click', () => {
        if (key.dataset.letter === 'delete') {
            wordInput.value = wordInput.value.substring(0, wordInput.value.length - 1)
        } else {
            if (wordInput.value.length < 5) {
                wordInput.value += key.dataset.letter.toLowerCase()
            }
        }
        enableEnterButton(wordInput.value.length)
    })

})

document.getElementById("enterButton").addEventListener('click', (e) => {
    e.preventDefault()
    guessedWord = wordInput.value.toLowerCase()
    counter++
    if (counter === 6) {
        buttonSwitchToRetry()
        if (guessedWord !== randomWord) {
            matchResult = false
            outcomeOutput(matchResult, guessedWord)
        }
    }
    if (guessedWord === randomWord) {
        matchResult = true
        outcomeOutput(matchResult, guessedWord)
    }
    addTileRow(guessedWord)
    wordInput.value = ""
    document.getElementById("enterButton").setAttribute('disabled', '')
})

wordInput.addEventListener('input', (e) => {
    let strippedInput = wordInput.value.replace(/[\W_]+/g,"")
    wordInput.value = strippedInput
    enableEnterButton(wordInput.value.length)

})