// Paralax avec Rellax.js
const rellax = new Rellax('.rellax');

// Event Menu
const body = document.querySelector('body');
const boxHamburger = document.querySelector('#box-hamburger');
const menu = document.querySelector('#menu');
const liens = document.querySelectorAll('#container-liens a');
const traitLien = document.querySelector('.trait');
const logo = document.querySelector('#logo circle');
const vagues = document.querySelector('#vagues');
const title = document.querySelector('h1');

// Box 3 traits
boxHamburger.addEventListener('click', event => {
    event.target.classList.toggle('active');
    menu.classList.toggle('visible');
    if(menu.classList.contains('visible')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'visible';
    };
});

// Event des liens
for (let i = 0; i < liens.length; i++) {
    liens[i].addEventListener("mouseover", event => {
      liens[i].classList.toggle("lien-actif");
    });

    liens[i].addEventListener("mouseleave", event => {
        liens[i].classList.toggle("lien-actif");
    });

    liens[i].addEventListener("click", event => {
        body.style.overflow = 'visible';
        traitLien.style.opacity= '0';
        // Décalage du repli du menu pour éviter le bug visuel
        setTimeout(() => {
            boxHamburger.classList.toggle('active');
            menu.classList.toggle('visible');
        }, 100);
        setTimeout(() => {
            traitLien.style.opacity = '1';
        }, 2000);
    });
}

// Pour l'animation du home
window.addEventListener('load', event => {
    logo.classList.add('visible');
    vagues.classList.add('visible');
    title.classList.add('visible');
});