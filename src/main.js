// Event Menu
const boxHamburger = document.querySelector('#box-hamburger');
const menu = document.querySelector('#menu');
const liens = document.querySelectorAll('#container-liens a');
const logo = document.querySelector('#logo circle');

boxHamburger.addEventListener('click', event => {
    event.target.classList.toggle('active');
    menu.classList.toggle('visible');
});

for (let i = 0; i < liens.length; i++) {
    liens[i].addEventListener("mouseover", function() {
      liens[i].classList.toggle("lien-actif");
    });

    liens[i].addEventListener("mouseleave", function() {
        liens[i].classList.toggle("lien-actif");
    });
}

window.addEventListener('load', event => {
    logo.classList.add('visible');
});