const index = document.querySelector('.overlay')
const modalClose = document.querySelector('.closeBtn')
const instructionsBtn = document.getElementById('instructions')
let allKeys = document.querySelectorAll('.keypadKey')
let wordInput = document.getElementById('wordInput')
let guessedWord
let randomWord
let matchResult

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
    document.querySelector('.submitFormButton').style.display = 'none'
    document.querySelector('form').style.justifyContent = 'center'
    let pTag = document.createElement('p')
    if(bool) {
        let correctText = document.createTextNode(inputWord.toUpperCase() + ' was correct')
        pTag.appendChild(correctText)
        document.querySelector('form').appendChild(pTag)
    } else {
        let incorrectText = document.createTextNode(inputWord.toUpperCase() + ' was incorrect')
        pTag.appendChild(incorrectText)
        document.querySelector('form').appendChild(pTag)
    }
    document.querySelector('form').style.flexDirection = 'row-reverse'
}

fetch('words.json')
    .then((data)=> {
        return data.json()
    }).then((result) => {
    let randomNumber = getRandom(result.fiveLetterWords)
    randomWord = result.fiveLetterWords[randomNumber]
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
            wordInput.value += key.dataset.letter.toUpperCase()
        }
        enableEnterButton(wordInput.value.length)
    })
})

document.getElementById("enterButton").addEventListener('click', (e) => {
    e.preventDefault();
    guessedWord = wordInput.value

    if (guessedWord === randomWord) {
        matchResult = true
    } else {
        matchResult = false
    }
    outcomeOutput(matchResult, guessedWord)

})

wordInput.addEventListener('input', (e) => {
    let strippedInput = wordInput.value.replace(/[\W_]+/g,"")
    wordInput.value = strippedInput
    enableEnterButton(wordInput.value.length)
})
