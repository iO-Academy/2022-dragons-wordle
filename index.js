const index = document.querySelector('.overlay')
const modalClose = document.querySelector('.closeBtn')
const instructionsBtn = document.getElementById('instructions')

instructionsBtn.addEventListener('click', (e) => {
    index.style.display = 'flex';
    console.log('first')
})

modalClose.addEventListener('click', (e) => {
    index.style.display = 'none'
    console.log('third')
})

window.addEventListener('click', (e) => {
    if (e.target == index) {
        index.style.display = "none";
    }
})
