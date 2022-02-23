const index = document.querySelector('.overlay')
const modalClose = document.querySelector('.closeBtn')
const instructionsBtn = document.getElementById('instructions')
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

let allKeys = document.querySelectorAll('.keypadKey')
let wordInput = document.getElementById('wordInput')

allKeys.forEach((key) => {
    key.addEventListener('click', () => {
        if (key.dataset.letter === 'delete') {
            wordInput.value = wordInput.value.substring(0, wordInput.value.length - 1)
        } else {
            wordInput.value += key.dataset.letter
        }
        enableEnterButton(wordInput.value.length)
    })
})

document.getElementById("enterButton").addEventListener('click', (e) => {

    e.preventDefault();
    guessedWord = wordInput.value
    console.log(guessedWord)
    console.log(randomWord)

     if (guessedWord === randomWord) {
        matchResult = true
    } else {
        matchResult = false
    }
    outcomeOutput(matchResult, guessedWord)

})

function outcomeOutput(bool, inputWord) {
    document.querySelector('.textInput').style.display = 'none'
    document.querySelector('.submitFormButton').style.display = 'none'
    document.querySelector('form').style.justifyContent = 'center'
    if(bool) {
        let correctTag = document.createElement('p')
        let correctText = document.createTextNode(inputWord + ' was correct')
        correctTag.appendChild(correctText)

        document.querySelector('form').appendChild(correctTag)
    } else {
        let incorrectTag = document.createElement('p')
        let incorrectText = document.createTextNode(inputWord + ' was incorrect')
        incorrectTag.appendChild(incorrectText)

        document.querySelector('form').appendChild(incorrectTag)
    }
    document.querySelector('form').style.flexDirection = 'row-reverse'
}


wordInput.addEventListener('input', (e) => {
    let strippedInput = wordInput.value.replace(/\s+/g, '')
    wordInput.value = strippedInput
    enableEnterButton(wordInput.value.length)
})
