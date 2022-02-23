const index = document.querySelector('.overlay')
const modalClose = document.querySelector('.closeBtn')
const instructionsBtn = document.getElementById('instructions')

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
    let word = result.fiveLetterWords[0]
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
    e.preventDefault()
    let guessedWord = wordInput.value
    console.log(guessedWord)
})

wordInput.addEventListener('input', (e) => {
    let strippedInput = wordInput.value.replace(/\s+/g, '')
    wordInput.value = strippedInput
    enableEnterButton(wordInput.value.length)
})


