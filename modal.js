let modal = document.querySelector('.overlay')
let modalClose = document.querySelector('.closeBtn')
let instructionsBtn = document.querySelector('.instructions')

instructionsBtn.addEventListener('click', (e) => {
    modal.style.display = 'flex';
    console.log('first')
})

modalClose.addEventListener('click', (e) => {
    modal.style.display = 'none'
    console.log('third')
})

window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
})
