// --- Paralax avec Rellax.js ---
const rellax = new Rellax('.rellax');

// --- Handlers DOM ---
const body = document.querySelector('body');
const boxHamburger = document.querySelector('#box-hamburger');
const menu = document.querySelector('#menu');
const liens = document.querySelectorAll('#container-liens a');
const traitLien = document.querySelectorAll('.trait');
const sun = document.querySelector('#sun');
const vagues = document.querySelector('#vagues');
const title = document.querySelector('h1');
const softSkills = document.querySelectorAll('.item-soft-skills');
const cercleProjets = document.querySelector('#cercle-projet');

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
    sun.classList.add('visible');
    vagues.classList.add('visible');
    title.classList.add('visible');
});

// ---------- Event Scroll - Soft Skills + Compétences + Projets ----------
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
    setTimeout(() => { barreReact.style.width = '65%'; }, 450);
    setTimeout(() => { barreJquery.style.width = '80%'; }, 600);
    setTimeout(() => { barreJasmine.style.width = '70%'; }, 750);
    setTimeout(() => { barreUml.style.width = '80%'; }, 900);
    setTimeout(() => { barreWordpress.style.width = '53%'; }, 1050);
    setTimeout(() => { barreUi.style.width = '60%'; }, 1200);
};

// ---------- Partie Projets ----------

// Récupération des infos de chaque projets
function getProjets() {
    fetch('src/projets.json').then((response) => {
        if (response.ok) {
            response.json().then((json) => {
                let reponse = json;
                initProjet(reponse);
                filtrageProjets(reponse);
            });
        } else {
            console.log('Erreur :' + response.status + response.statusText);
        }
    });
}
getProjets();

// --- Barre de filtrage des projets ---
function filtrageProjets(projets) {
    const filtreProjets = document.querySelectorAll('#navbar-projets a');

    filtreProjets.forEach(element => {
        element.addEventListener('click', () => {
            let elActif = document.querySelector('#navbar-projets .active');
            elActif.classList.remove('active');
            element.classList.add('active');

            initProjet(projets, element.id);
        });
    });

}

function initProjet(projets, filtreActif) {
    let arrayProjets = projets;

    // Vidage de la grille précédente
    document.querySelector("#grid-projets").innerHTML = "";

    if(filtreActif !== undefined) {
        // Filtrage des projets si un filtre a été activé
        arrayProjets = arrayProjets.filter(element => element.tags.includes(filtreActif));
    }
    
    // Si aucun projet visible sur le filtre
    const zoneMsg =  document.querySelector("#msg-projet");
    zoneMsg.style.display = 'none';
    zoneMsg.style.opacity = '0';

    if(arrayProjets.length === 0) {
        zoneMsg.style.display = 'flex';
        setTimeout(() => { zoneMsg.style.opacity = '1'; }, 50);
        zoneMsg.innerHTML = "<p>Des projets arrivent très bientôt sur cette techno ! 🚀</p>";
    }

    arrayProjets.forEach((element, index) => {
        //  -- Info des projets
        const titre = element.titre;
        const sousTitre = element.sousTitre;
        const imageSrc = element.imageSrc;
        const description = element.description;
        const notation = element.notation;
        const lienProjet = element.linkProjet;
        const lienGit = element.linkGithub;
        const compList = element.listeComp;

        // -- Création des projets dans le DOM (grille)
        const grilleProjets = document.querySelector("#grid-projets");
        const newProjet = document.createElement("div");
        grilleProjets.appendChild(newProjet);
        newProjet.classList.add("grid-item");
        newProjet.innerHTML = `<h4>${titre}</h4> <img src="${imageSrc}"> </img>`;

        // Apparition des item progressive
        let gridItem = document.querySelectorAll(".grid-item");
        gridItem.forEach(element => {
            setTimeout(() => { element.style.opacity = "1"; }, 100);
        });

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
        const newBoxClose = document.createElement("div");
        newBoxClose.id = "box-close-pop";
        const newSousTitre = document.createElement("h6");
        const newImage = document.createElement("div");
        newImage.id = 'box-image-overlay';
        const newDescription = document.createElement("p");
        const newCompList = document.createElement("p");
        newCompList.id = "competences-projet";
        const newBoxLiens = document.createElement("div");
        newBoxLiens.id = "box-liens";
        const newLienProjet = document.createElement("button");

        // Croix fermeture
        newOverlay.appendChild(newBoxClose).innerHTML = `<img src="media/img/close.png"></img>`;
        // Titre
        contentOverlay.appendChild(newTitre).innerHTML = titre;
        // Sous-titre
        contentOverlay.appendChild(newSousTitre).innerHTML = sousTitre + '<hr> </hr>';
        // Image d'illustration
        contentOverlay.appendChild(newImage).innerHTML = `<img src="${imageSrc}"></img>`;
        // Liens projet
        contentOverlay.appendChild(newBoxLiens);
        newBoxLiens.appendChild(newLienProjet).innerHTML = `<a href="${lienProjet}" target="_blank">Voir le projet</a>`;

        if (lienGit != undefined) {
            const newLienGit = document.createElement("button");
            newBoxLiens.appendChild(newLienGit).innerHTML = `<a href="${lienGit}" target="_blank">Voir sur GitHub</a>`;
        }

        contentOverlay.appendChild(newDescription).innerHTML = "<strong>But du projet</strong>" + description;

        // Compétences du projet
        if (compList != undefined) {
            contentOverlay.appendChild(newCompList).innerHTML = "<strong>Compétences visées</strong>" + compList;
        }

        // Notation + jury
        if (notation != undefined) {
            const newNote = document.createElement("p");
            contentOverlay.appendChild(newNote).innerHTML = notation;
        }

        // -- Lancement des fonctions liées au pop up
        // Event Hover item grille
        hoverProjet(newProjet);
        // Event Ouverture / fermeture overlay
        openOverlay(newProjet, newOverlay, newBoxOverlay, boxBackground, newBoxClose);
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

function openOverlay($projet, $overlay, $newBoxOverlay, $boxBackground, $boxClose) {
    
    $projet.addEventListener("click", event => {
        $boxBackground.style.display = 'flex';
        $newBoxOverlay.style.display = 'flex';
        $overlay.style.display = 'flex';
        body.style.overflowY = 'hidden'; 

        $boxBackground.addEventListener("click", event => {
            $overlay.scrollTop = 0;
            $boxBackground.style.display = 'none';
            $newBoxOverlay.style.display = 'none';
            $overlay.style.display = 'none';
            body.style.overflowY = 'scroll';
        });
        
        $boxClose.addEventListener("click", event => {
            $overlay.scrollTop = 0;
            $boxBackground.style.display = 'none';
            $newBoxOverlay.style.display = 'none';
            $overlay.style.display = 'none';
            body.style.overflowY = 'scroll';
        });
    });
}

function scrollToTop() {
    const arrowUp = document.querySelector('#box-arrow img');
    
    arrowUp.addEventListener('click', event => {
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth'
          });
    });
}
scrollToTop();
