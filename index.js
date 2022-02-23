const index = document.querySelector('.overlay')
const modalClose = document.querySelector('.closeBtn')
const instructionsBtn = document.getElementById('instructions')

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
            console.log(wordInput.value)
        } else {
            wordInput.value += key.dataset.letter
            console.log(wordInput.value)
        }
    })
})


