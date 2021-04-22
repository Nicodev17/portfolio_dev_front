// Event Menu
const boxHamburger = document.querySelector('#box-hamburger');
const menu = document.querySelector('#menu');

boxHamburger.addEventListener('click', event => {
    event.target.classList.toggle('active');
    menu.classList.toggle('visible');
})