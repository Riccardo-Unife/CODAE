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

    window.onload = function () {
        setTimeout(typeWriter, 1500);                               // Pausa iniziale
    };
}

// Censura mail ------------------------------------------------------------------------------------
const emailLink = document.getElementById("email-link");
if (emailLink) {
    const u = "info";                                               // nome mail
    const d = "tuoufficio.it";                                      // dominio
    emailLink.href = "mailto:" + u + "@" + d;
    emailLink.textContent = u + "@" + d;
}

// stiky lungo -------------------------------------------------------------------------------------
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

// PUBBLICAZIONI -----------------------------------------------------------------------------
const pubList = document.getElementById('pub-list');

if (pubList && typeof publications !== 'undefined') {

    // RENDER ------------------------------------------------------
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
            label.className = 'year-group-label';
            label.textContent = `// ${year}`;
            pubList.appendChild(label);

            byYear[year].forEach((pub, idx) => {
                const item = document.createElement('div');
                item.className = 'pub-item';
                item.dataset.type = pub.type;
                item.dataset.text = `${pub.title} ${pub.authors} ${pub.tags.join(' ')}`.toLowerCase();

                item.innerHTML = `
                    <div class="pub-header" onclick="togglePub(this)">
                        <div class="pub-meta">
                            <div class="pub-title">${pub.title}</div>
                            <div class="pub-authors">${pub.authors} [${pub.year}]</div>
                            <div class="pub-tags">
                                <span class="pub-type">@${pub.type.replace(' ', '')}</span>
                                ${pub.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                            </div>
                        </div>
                        <div class="pub-toggle">&gt;</div>
                    </div>
                    <div class="pub-body">
                        <div class="pub-body-inner">
                            <div class="pub-body-content">
                                <p class="pub-abstract">${pub.abstract}</p>
                                <div class="bibtex-label">// BibTeX</div>
                                <div class="bibtex-wrap">
                                    <pre id="bib-${year}-${idx}">${pub.bibtex}</pre>
                                    <button class="copy-btn" onclick="copyBib('bib-${year}-${idx}', this)">copy</button>
                                </div>
                                <a class="pub-doi" href="https://doi.org/${pub.doi}" target="_blank">
                                    doi: ${pub.doi}
                                </a>
                            </div>
                        </div>
                    </div>`;
                pubList.appendChild(item);
            });
        });
    }

    // TOGGLE EXPAND -----------------------------------------------
    function togglePub(headerEl) {
        headerEl.closest('.pub-item').classList.toggle('open');
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
        document.querySelectorAll('.pub-item').forEach(item => {
            const typeMatch   = activeType === 'all' || item.dataset.type === activeType;
            const searchMatch = !activeSearch || item.dataset.text.includes(activeSearch);
            item.classList.toggle('hidden', !(typeMatch && searchMatch));
            if (typeMatch && searchMatch) visible++;
        });

        document.querySelectorAll('.year-group-label').forEach(label => {
            let next = label.nextElementSibling;
            let hasVisible = false;
            while (next && !next.classList.contains('year-group-label')) {
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
