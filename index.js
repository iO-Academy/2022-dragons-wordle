const index = document.querySelector('.overlay')
const modalClose = document.querySelector('.closeBtn')
const instructionsBtn = document.getElementById('instructions')

fetch('words.json')
    .then((data)=> {
        return data.json()
    }).then((result) => {
    let word = result.fiveLetterWords[0]
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
    let guessedWord = wordInput.value;
    console.log(guessedWord);
})

function outcomeOutput(bool, inputWord) {
    document.querySelector('.textInput').style.display = 'none'
    if(bool) {
        let correctTag = document.createElement('p')
        let correctText = document.createTextNode(inputWord + ' was correct')
        correctTag.appendChild(correctText)

        document.querySelector('form').appendChild(correctTag)
    } else {
        let correctTag = document.createElement('p')
        let correctText = document.createTextNode(inputWord + ' was incorrect')
        correctTag.appendChild(correctText)

        document.querySelector('.wordInput').appendChild(correctTag)
    }
    document.querySelector('form').style.flexDirection = 'row-reverse'
}
