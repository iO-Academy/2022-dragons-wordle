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

outcomeOutput(true, 'hello')
