// --- Paralax avec Rellax.js ---
const rellax = new Rellax('.rellax');

// --- Handlers DOM ---
const body = document.querySelector('body');
const boxHamburger = document.querySelector('#box-hamburger');
const menu = document.querySelector('#menu');
const liens = document.querySelectorAll('#container-liens a');
const traitLien = document.querySelectorAll('.trait');
const logo = document.querySelector('#logo circle');
const vagues = document.querySelector('#vagues');
const title = document.querySelector('h1');
const softSkills = document.querySelectorAll('.item-soft-skills');
const cercleProjets = document.querySelector('#cercle-projet');
const filtreProjets = document.querySelectorAll('#navbar-projets a');

// ---------- Evenements box menu ----------
boxHamburger.addEventListener('click', event => {
    event.target.classList.toggle('active');
    menu.classList.toggle('visible');
    if (menu.classList.contains('visible')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'visible';
    };
});

// ---------- Evenements des liens du menu ----------
liens.forEach((element, index) => {
    element.addEventListener("mouseover", event => {
        element.classList.toggle("lien-actif");
    });

    element.addEventListener("mouseleave", event => {
        element.classList.toggle("lien-actif");
    });

    element.addEventListener("click", event => {
        traitLien[index].style.width = '0%';
        body.style.overflow = 'visible';
        // Décalage du repli du menu pour éviter le bug visuel
        setTimeout(() => {
            boxHamburger.classList.toggle('active');
            menu.classList.toggle('visible');
        }, 100);
        setTimeout(() => {
            traitLien[index].style.width = '50%';
        }, 3000);
    });
});

// ---------- Partie Home ----------
window.addEventListener('load', event => {
    logo.classList.add('visible');
    vagues.classList.add('visible');
    title.classList.add('visible');
});

// ---------- Event Scroll - Soft Skills + Compétences + Porjets ----------
window.addEventListener("scroll", event => {
    // Partie soft skills
    softSkills.forEach(element => {
        if (window.scrollY > 880) {
            element.classList.add('visible');
        }
    });

    // Partie Comp
    if (window.scrollY > 1500) {
        changeProgress();
    }

    // Partie projets 
    if (window.scrollY > 1900) {
        cercleProjets.classList.add('visible');
    }
});

// ---------- Partie Compétences - Barres ----------
const containerBarre = document.querySelectorAll(".barre-container");
const logosComp = document.querySelectorAll(".box-img-comp img");
const barreHtml = document.querySelector("#progress1");
const barreCss = document.querySelector("#progress2");
const barreJs = document.querySelector("#progress3");
const barreReact = document.querySelector("#progress4");
const barreJquery = document.querySelector("#progress5");
const barreJasmine = document.querySelector("#progress6");
const barreUml = document.querySelector("#progress7");
const barreWordpress = document.querySelector("#progress8");
const barreUi = document.querySelector("#progress9");

function changeProgress() {
    containerBarre.forEach((element, index) => {
        setTimeout(() => { element.style.opacity = '1'; }, Number((index + '00') / 1.2));
        setTimeout(() => { logosComp[index].style.opacity = '1'; }, Number((index + '00') / 1.2));
    });

    barreHtml.style.width = '80%';
    setTimeout(() => { barreCss.style.width = '75%'; }, 150);
    setTimeout(() => { barreJs.style.width = '70%'; }, 300);
    setTimeout(() => { barreReact.style.width = '40%'; }, 450);
    setTimeout(() => { barreJquery.style.width = '80%'; }, 600);
    setTimeout(() => { barreJasmine.style.width = '70%'; }, 750);
    setTimeout(() => { barreUml.style.width = '80%'; }, 900);
    setTimeout(() => { barreWordpress.style.width = '50%'; }, 1050);
    setTimeout(() => { barreUi.style.width = '60%'; }, 1200);
};

// ---------- Partie Projets ----------
function filtrageProjets() {
    // --- Barre de filtrage des projets ---
    filtreProjets.forEach(element => {
        element.addEventListener('click', () => {
            let elActif = document.querySelector('#navbar-projets .active');
            elActif.classList.remove('active');
            element.classList.add('active');

            // Temporaire : après il faudra mettre tous les projets dans un tableau que l'on filtrera à a chaque clic sur un filtre
            // switch (element.id) {
            //     case 'filtre-all':
            //         console.log('filtre all activé');
            //         break;
            //     case 'filtre-wordpress':
            //         console.log('filtre wordpress activé');
            //         const wordpressEl = document.querySelector('.grid-item.wordpress');
            //         wordpressEl.style.border = '2px solid red';
            //         break;
            //     case 'filtre-htmlcss':
            //         console.log('filtre html css activé');

            //         break;
            //     case 'filtre-js':
            //         console.log('filtre JS activé');

            //         break;
            //     case 'filtre-react':
            //         console.log('filtre react activé');

            //         break;
            //   }
        });
    });
}
filtrageProjets();

// Récupération des infos des projets
function getProjets() {
    fetch('src/projets.json').then((response) => {
        if (response.ok) {
            response.json().then((json) => {
                let reponse = json;
                initProjet(reponse);
            });
        } else {
            console.log('Erreur :' + response.status + response.statusText);
        }
    });
}
getProjets();

function initProjet(projets) {
    projets.forEach(element => {
        //  -- Info des projets
        const titre = element.titre;
        const sousTitre = element.sousTitre;
        const imageSrc = element.imageSrc;
        const description = element.description;
        const notation = element.notation;
        const lienProjet = element.linkProjet;
        const lienGit = element.linkGithub;

        // -- Création des projets dans le DOM (grille)
        const grilleProjets = document.querySelector("#grid-projets");
        const newProjet = document.createElement("div");
        grilleProjets.appendChild(newProjet);
        newProjet.classList.add("grid-item");
        newProjet.innerHTML = `<h4>${titre}</h4> <img src="${imageSrc}"> </img>`;

        // -- Création de l'overlay pour chaque projet
        const sectionProjets = document.querySelector("#projets");

        const newBoxOverlay = document.createElement("div");
        sectionProjets.appendChild(newBoxOverlay);
        newBoxOverlay.id = "box-overlay";

        const boxBackground = document.createElement("div");
        newBoxOverlay.appendChild(boxBackground);
        boxBackground.id = "box-background";
        
        const newOverlay = document.createElement("div");
        newBoxOverlay.appendChild(newOverlay);
        newOverlay.id = "overlay-projet";
        
        const contentOverlay = document.createElement("div");
        newOverlay.appendChild(contentOverlay);
        contentOverlay.id = "contenu-overlay";

        // Remplissage de l'overlay
        const newTitre = document.createElement("h5");
        const newSousTitre = document.createElement("h6");
        const newImage = document.createElement("div");
        const newDescription = document.createElement("p");
        const newBoxLiens = document.createElement("div");
        newBoxLiens.id = "box-liens";
        const newLienProjet = document.createElement("button");

        contentOverlay.appendChild(newTitre).innerHTML = titre + '<hr> </hr>';
        contentOverlay.appendChild(newSousTitre).innerHTML = sousTitre;
        contentOverlay.appendChild(newImage).innerHTML = `<img src="${imageSrc}"></img>`;
        contentOverlay.appendChild(newDescription).innerHTML = "<strong>Consignes du projet</strong>" + description;

        if (notation != undefined) {
            const newNote = document.createElement("p");
            contentOverlay.appendChild(newNote).innerHTML = notation;
        }

        contentOverlay.appendChild(newBoxLiens);
        newBoxLiens.appendChild(newLienProjet).innerHTML = `<a href="${lienProjet}" target="_blank">Voir le projet</a>`;

        if (lienGit != undefined) {
            const newLienGit = document.createElement("button");
            newBoxLiens.appendChild(newLienGit).innerHTML = `<a href="${lienGit}" target="_blank">Voir sur GitHub</a>`;
        }

        // Event Hover item grille
        hoverProjet(newProjet);

        // Event Ouverture / fermeture overlay
        openOverlay(newProjet, newOverlay, newBoxOverlay, boxBackground);
    });
}

// $projet et $overlay : items du DOM
function hoverProjet($projet) {
    const infoBulle = document.createElement("p");

    $projet.addEventListener("mouseover", event => {
        event.stopPropagation();
        $projet.classList.add("hover");
        $projet.appendChild(infoBulle);
        infoBulle.innerHTML = "VOIR LE PROJET";
    });

    $projet.addEventListener("mouseleave", event => {
        $projet.classList.remove("hover");
        infoBulle.remove();
        infoBulle.innerHTML = "";
    });
}

function openOverlay($projet, $overlay, $newBoxOverlay, $boxBackground) {
    $projet.addEventListener("click", event => {
        $boxBackground.style.display = 'flex';
        $newBoxOverlay.style.display = 'flex';
        $overlay.style.display = 'flex';
        body.style.overflowY = 'hidden'; 

        $boxBackground.addEventListener("click", event => {
            $boxBackground.style.display = 'none';
            $newBoxOverlay.style.display = 'none';
            $overlay.style.display = 'none';
            body.style.overflowY = 'scroll'; 
        });
    });
}

