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
        let correctText = document.createTextNode(inputWord.toLowerCase() + ' was correct')
        pTag.appendChild(correctText)
        document.querySelector('form').appendChild(pTag)
    } else {
        let incorrectText = document.createTextNode(inputWord.toLowerCase() + ' was incorrect')
        pTag.appendChild(incorrectText)
        document.querySelector('form').appendChild(pTag)
    }
    document.querySelector('form').style.flexDirection = 'row-reverse'
}

function addTileRow() {
    let rowId = "tileRow1"
    let letterArray = guessedWord.split("")
    letterArray.forEach((letter) => {
        let divTag = document.createElement('div')
        divTag.setAttribute('class', 'tile')
        let pTag = document.createElement('p')
        pTag.innerText = letter.toUpperCase()
        divTag.appendChild(pTag)
        document.getElementById(rowId).appendChild(divTag)
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
            wordInput.value += key.dataset.letter.toLowerCase()
        }
        enableEnterButton(wordInput.value.length)
    })
})

document.getElementById("enterButton").addEventListener('click', (e) => {
    e.preventDefault();

    guessedWord = wordInput.value.toLowerCase()

    if (guessedWord === randomWord) {
        matchResult = true
    } else {
        matchResult = false
    }
    outcomeOutput(matchResult, guessedWord)
    addTileRow(guessedWord)
})

wordInput.addEventListener('input', (e) => {
    let strippedInput = wordInput.value.replace(/[\W_]+/g,"")
    wordInput.value = strippedInput
    enableEnterButton(wordInput.value.length)
})