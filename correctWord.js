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

function check(input, word) {
    document.querySelector('.textInput').style.display = 'none'
    if(input) {
        let correctTag = document.createElement('p')
        let correctText = document.createTextNode(word + ' was correct')
        correctTag.appendChild(correctText)

        document.querySelector('form').appendChild(correctTag)
        console.log('it worked')
    } else {
        let correctTag = document.createElement('p')
        let correctText = document.createTextNode(word + ' was incorrect')
        correctTag.appendChild(correctText)

        document.querySelector('.wordInput').appendChild(correctTag)
        console.log('it worked')
    }
    document.querySelector('form').style.flexDirection = 'row-reverse'
}

check(true, 'hello')
