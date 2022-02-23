const index = document.querySelector('.overlay')
const modalClose = document.querySelector('.closeBtn')
const instructionsBtn = document.getElementById('instructions')
let guessedWord
let randomWord
let matchResult

function getRandom(array) {
    return Math.floor(Math.random() * parseInt(array.length))
}

fetch('words.json')
    .then((data)=> {
        return data.json()
    }).then((result) => {
    let randomNumber = getRandom(result.fiveLetterWords)
    randomWord = result.fiveLetterWords[randomNumber]
})

instructionsBtn.addEventListener('click', (e) => {
    index.style.display = 'flex';
})

modalClose.addEventListener('click', (e) => {
    index.style.display = 'none'
})

window.addEventListener('click', (e) => {
    if (e.target == index) {
        index.style.display = "none";
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
})


