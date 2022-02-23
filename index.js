const index = document.querySelector('.overlay')
const modalClose = document.querySelector('.closeBtn')
const instructionsBtn = document.getElementById('instructions')

fetch('words.json')
    .then((data)=> {
        return data.json()
    }).then((result) => {
        console.log(result)
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
