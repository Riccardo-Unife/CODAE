// Animazione dimensione header --------------------------------------------------------------------
window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    if (window.scrollY > 250) {                                     // Soglia di scorrimento
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }
});

// Menù Hamburgher ---------------------------------------------------------------------------------
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

// Animazione scritta CODÆ -------------------------------------------------------------------------
const codEl = document.getElementById("cod");
const aeEl = document.getElementById("ae");
const cursorEl = document.querySelector(".cursor");

if (codEl && aeEl) {
    const codText = "COD";
    const aeText = "Æ";
    let i = 0, j = 0;
    const speed = 200;                                              // Velocità digitazione

    codEl.innerHTML = "";                                           // Svuota il testo iniziale
    aeEl.innerHTML = "";                                            // già indicizzato (SEO)

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
                if (cursorEl) cursorEl.style.display = "none";
            }, 3000);                                               // Secondi per far sparire _
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        setTimeout(typeWriter, 1500);                               // Pausa iniziale
    });
}

// Censura mail ------------------------------------------------------------------------------------
const emailLink = document.getElementById("email-link");
if (emailLink) {
    const u = "info";                                               // nome mail
    const d = "tuoufficio.it";                                      // dominio
    emailLink.href = "mailto:" + u + "@" + d;
    emailLink.innerHTML = '<i class="fa-solid fa-envelope"></i> ' + u + "@" + d;
}

const emailLinkFooter = document.getElementById("email-link-footer");
if (emailLinkFooter) {
    const u = "info";
    const d = "tuoufficio.it";
    emailLinkFooter.href = "mailto:" + u + "@" + d;
    emailLinkFooter.innerHTML = u + "@" + d;
}

// stiky lungo -------------------------------------------------------------------------------------
function aggiornaStickyTop() {
    document.querySelectorAll('section:not(.hero-home )').forEach(section => {
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

// TOGGLE EXPAND -----------------------------------------------------------------------------------
function togglePub(headerEl) {
    headerEl.closest('.item').classList.toggle('open');
}

// PUBBLICAZIONI -----------------------------------------------------------------------------------
const pubList = document.getElementById('pub-list');

if (pubList && typeof publications !== 'undefined') {

    // RENDER ------------------------------------------------------
    function highlightBibtex(raw) {
        const escaped = raw
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');

        return escaped
            // @article, @inproceedings, ecc.
            .replace(/(@\w+)/g, '<span class="var">$1</span>')
            // tutto tra &quot;...&quot; incluse le &quot;
            .replace(/(&quot;)(.*?)(&quot;)/g, '<span class="kw">$1$2$3</span>')
            // tutto tra graffe interne incluse le graffe
            .replace(/(\{)([^{}]+)(\})/g, '<span class="kw">$1$2$3</span>');
    }
    function buildList(pubs) {
        pubList.innerHTML = '';

        const byYear = {};
        pubs.forEach(p => {
            if (!byYear[p.year]) byYear[p.year] = [];
            byYear[p.year].push(p);
        });

        const years = Object.keys(byYear).sort((a, b) => b - a);

        if (years.length === 0) {
            document.getElementById('no-results').style.display = 'block';
            return;
        }
        document.getElementById('no-results').style.display = 'none';

        years.forEach(year => {
            const label = document.createElement('div');
            label.className = 'section-label';                      // +line (opzionale)
            label.textContent = `// ${year}`;
            pubList.appendChild(label);

            byYear[year].forEach((pub, idx) => {
                const item = document.createElement('div');
                item.className = 'item';
                item.dataset.type = pub.type;
                item.dataset.text = `${pub.title} ${pub.authors} ${pub.tags.join(' ')}`.toLowerCase();

                item.innerHTML = `
                    <div class="shift card-open color" onclick="togglePub(this)">
                        <div class="card">
                            <h3>${pub.title}</h3>
                            <p>${pub.authors} [${pub.year}]</p>
                            <div class="tags">
                                <span class="tag accent">@${pub.type.replace(' ', '')}</span>
                                ${pub.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                            </div>
                        </div>
                        <h3 class="arrow vertical"></h3>
                    </div>
                    <div class="expand">
                        <div class="expand-inner spaced">
                            <p class="paragraph">${pub.abstract}</p>
                            <div class="section-label" style="margin-top: var(--space-m);">// BibTeX</div>
                            <div class="bibtex">
                                <pre id="bib-${year}-${idx}">${highlightBibtex(pub.bibtex)}</pre>
                                <button class="copy-btn" onclick="copyBib('bib-${year}-${idx}', this)">copy</button>
                            </div>
                            <p class="link">
                                <a href="https://doi.org/${pub.doi}" class="link underline" target="_blank" style="font-size: var(--size-s)">
                                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                    doi: ${pub.doi}
                                </a>
                            </p>
                        </div>
                    </div>`;
                pubList.appendChild(item);
            });
        });
    }

    // COPY BIBTEX -------------------------------------------------
    function copyBib(id, btn) {
        navigator.clipboard.writeText(document.getElementById(id).textContent).then(() => {
            btn.textContent = 'copied!';
            btn.classList.add('copied');
            setTimeout(() => { btn.textContent = 'copy'; btn.classList.remove('copied'); }, 2000);
        });
    }

    // FILTRI ------------------------------------------------------
    let activeType   = 'all';
    let activeSearch = '';

    function applyFilters() {
        let visible = 0;
        document.querySelectorAll('.item').forEach(item => {
            const typeMatch   = activeType === 'all' || item.dataset.type === activeType;
            const searchMatch = !activeSearch || item.dataset.text.includes(activeSearch);
            item.classList.toggle('hidden', !(typeMatch && searchMatch));
            if (typeMatch && searchMatch) visible++;
        });

            document.querySelectorAll('.section-label').forEach(label => {
                let next = label.nextElementSibling;
                let hasVisible = false;
                while (next && !next.classList.contains('section-label')) {
                if (!next.classList.contains('hidden')) hasVisible = true;
                next = next.nextElementSibling;
            }
            label.style.display = hasVisible ? '' : 'none';
        });

        document.getElementById('no-results').style.display = visible === 0 ? 'block' : 'none';
    }

    document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            activeType = btn.dataset.filter;
            document.querySelectorAll('[data-filter]').forEach(b => {
                b.classList.remove('primary');
                b.classList.add('secondary');
            });
            btn.classList.remove('secondary');
            btn.classList.add('primary');
            applyFilters();
        });
    });

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', e => {
            activeSearch = e.target.value.trim().toLowerCase();
            applyFilters();
        });
    }

    // INIT --------------------------------------------------------
    buildList(publications);
}
