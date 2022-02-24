const index = document.querySelector('.overlay')
const modalClose = document.querySelector('.closeBtn')
const instructionsBtn = document.getElementById('instructions')
let allKeys = document.querySelectorAll('.keypadKey')
let wordInput = document.getElementById('wordInput')
let guessedWord
let randomWord
let matchResult
let counter = 0

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
    /*document.querySelector('.submitFormButton').style.display = 'none'
    document.querySelector('.retry').style.display = 'block'*/
    document.querySelector('form').style.justifyContent = 'center'
    let pTag = document.createElement('p')
    let resultDiv = document.createElement('div')
    resultDiv.classList.add('textInput', 'retryInput')
    if(bool) {
        let correctText = document.createTextNode(inputWord.toLowerCase() + ' was correct')
        pTag.appendChild(correctText)
        resultDiv.appendChild(pTag)
        document.querySelector('form').appendChild(resultDiv)
        buttonSwitchToRetry()
    } else {
        let incorrectText = document.createTextNode(inputWord.toLowerCase() + ' was incorrect')
        pTag.appendChild(incorrectText)
        resultDiv.appendChild(pTag)
        document.querySelector('form').appendChild(resultDiv)
    }
    document.querySelector('form').style.flexDirection = 'row-reverse'
}

function addTileRow() {
    let rowId = "tileRow" + counter
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

function buttonSwitchToRetry () {
    document.querySelector('.submitFormButton').style.display = 'none'
    document.querySelector('.retryButton').style.display = 'block'
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
    console.log(randomWord)
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
    e.preventDefault()
    guessedWord = wordInput.value.toLowerCase()
    counter++
    if (counter === 6) {
        buttonSwitchToRetry()
        if (guessedWord === randomWord) {
            matchResult = true
        } else {
            matchResult = false
        }
        outcomeOutput(matchResult, guessedWord)
    }
    if (guessedWord === randomWord) {
        matchResult = true
        outcomeOutput(matchResult, guessedWord)
        console.log('bananas')
    }



    addTileRow(guessedWord)
})

wordInput.addEventListener('input', (e) => {
    let strippedInput = wordInput.value.replace(/[\W_]+/g,"")
    wordInput.value = strippedInput
    enableEnterButton(wordInput.value.length)
})