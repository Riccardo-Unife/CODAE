// Animazione dimensione header --------------------------------------------------------------------
window.addEventListener("scroll", function() {
    const header = document.querySelector("header");

    if (window.scrollY > 250) {
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }
});

// Menù Hamburgher
function toggleMenu(){
    document.querySelector(".nav").classList.toggle("active");
    document.querySelector(".header-right").classList.toggle("active");
}

document.addEventListener("click", function(e){
    const nav = document.querySelector(".nav");
    const hamburger = document.querySelector(".hamburger");
    const headerRight = document.querySelector(".header-right");

    if(!nav.contains(e.target) && !hamburger.contains(e.target)){
        nav.classList.remove("active");
        headerRight.classList.remove("active");
    }
});

// Switch lingua -----------------------------------------------------------------------------------
document.getElementById("switch-lang")?.addEventListener("click", function(e) {
    e.preventDefault();
    const currentPath = window.location.pathname;
    if (currentPath.startsWith("/it")) {                            // Passaggio a inglese
        window.location.href = "/";
    } else {
        window.location.href = "/it/";                              // Passaggio ad italiano
    }
});

// Animazione scritta CODÆ -------------------------------------------------------------------------
const codText = "COD";
const aeText = "Æ";

let i = 0;
let j = 0;
const speed = 200;                                                  // Velocità digitazione

const codEl = document.getElementById("cod");
const aeEl = document.getElementById("ae");
const cursorEl = document.querySelector(".cursor");

codEl.innerHTML = "";                                               // Svuota il testo iniziale
aeEl.innerHTML = "";                                                // già indicizzato (SEO)

function typeWriter() {
    if (i < codText.length) {
        codEl.innerHTML += codText.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    } else if (j < aeText.length) {
        aeEl.innerHTML += aeText.charAt(j);
        j++;
        setTimeout(typeWriter, speed);
    } else {
        setTimeout(() => {
            cursorEl.style.display = "none";
        }, 1000);                                                   // Secondi per far sparire _
    }

}

window.onload = function () {
    setTimeout(typeWriter, 1000);                                   // Pausa iniziale
};

// Censura mail
const u = "info";
const d = "tuoufficio.it";
document.getElementById("email-link").href = "mailto:" + u + "@" + d;
document.getElementById("email-link").textContent = u + "@" + d;

// stiky lungo
function aggiornaStickyTop() {
    document.querySelectorAll('section:not(.hero)').forEach(section => {
        const altezzaContenuto = section.scrollHeight;
        const altezzaViewport = window.innerHeight;

        if (altezzaContenuto > altezzaViewport) {
            section.style.top = `${altezzaViewport - altezzaContenuto}px`;
        } else {
            section.style.top = '0px';
        }
    });
}

aggiornaStickyTop();
window.addEventListener('resize', aggiornaStickyTop);