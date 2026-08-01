// 1. CONFIGURACIÓ DE SUPABASE
const SUPABASE_URL = 'https://amswkfdhwashotagrhfo.supabase.co';
const SUPABASE_KEY = 'sb_publishable_J-PhmX7Awpb8UwDYXhYwWg_iISrccBy';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. OPCIONS PER ALS SELECTORS DE MATÈRIES I ÀMBITS
const MATERIES_DIDACTIC = [
    "Llengua i Literatura",
    "Llengües Estrangeres",
    "Ciències Socials / Història",
    "Ciències Naturals / Biologia",
    "Matemàtiques",
    "Tecnologia i Informàtica",
    "Arts i Música",
    "Educació Física",
    "Altres"
];

const MATERIES_NL = [
    "Nivell A1 - A2 (Bàsic)",
    "Nivell B1 - B2 (Intermedi)",
    "Nivell C1 - C2 (Avançat / Superior)",
    "Llenguatge Administratiu",
    "Llenguatge Tècnic / Científic",
    "Correcció d'estil i ortotipogràfica"
];

const AMBITS_SOCIOLING = [
    "Municipi",
    "Comarca",
    "Classe social",
    "Sector laboral",
    "Àmbit educatiu",
    "Mitjans de comunicació i xarxes",
    "Altres"
];

// Variables globals d'estat
let totsElsPrompts = [];

// 3. INICIALITZACIÓ EN CARREGAR LA PÀGINA
document.addEventListener('DOMContentLoaded', () => {
    inicialitzarSelectors();
    carregarPrompts();
    configurarEsdeveniments();
});

// Emplena els selects de la pantalla i de la finestra modal
function inicialitzarSelectors() {
    const selectDidactic = document.getElementById('didactic-materia');
    const selectNL = document.getElementById('nl-materia');

    if (selectDidactic) {
        MATERIES_DIDACTIC.forEach(materia => {
            const opt = document.createElement('option');
            opt.value = materia;
            opt.textContent = materia;
            selectDidactic.appendChild(opt);
        });
    }

    if (selectNL) {
        MATERIES_NL.forEach(materia => {
            const opt = document.createElement('option');
            opt.value = materia;
            opt.textContent = materia;
            selectNL.appendChild(opt);
        });
    }

    actualitzarCategoriesModal('socioling');
}

function actualitzarCategoriesModal(tipus) {
    const selectModalCat = document.getElementById('new-prompt-category');
    if (!selectModalCat) return;

    selectModalCat.innerHTML = '';
    let opcions = [];

    if (tipus === 'socioling') opcions = AMBITS_SOCIOLING;
    else if (tipus === 'didactic') opcions = MATERIES_DIDACTIC;
    else if (tipus === 'nl') opcions = MATERIES_NL;

    opcions.forEach(op => {
        const opt = document.createElement('option');
        opt.value = op;
        opt.textContent = op;
        selectModalCat.appendChild(opt);
    });
}

// 4. LLEGIR PROMPTS DE SUPABASE
async function carregarPrompts() {
    const container = document.getElementById('prompts-container');
    if (!container) return;
    
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Carregant prompts...</p>';

    try {
        const { data, error } = await supabase
            .from('prompts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        totsElsPrompts = data || [];
        mostrarPrompts(totsElsPrompts);

    } catch (err) {
        console.error('Error en carregar prompts:', err);
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #ef4444;">No s\'han pogut carregar els prompts.</p>';
    }
}

// Renderitzar les targetes dels prompts
function mostrarPrompts(llista) {
    const container = document.getElementById('prompts-container');
    if (!container) return;
    
    container.innerHTML = '';

    if (llista.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #64748b;">No s\'ha trobat cap prompt.</p>';
        return;
    }

    llista.forEach(prompt => {
        const card = document.createElement('article');
        card.className = 'prompt-card';

        let badgeText = prompt.tipus || 'General';
        if (prompt.tipus === 'socioling') badgeText = 'Sociolingüística';
        if (prompt.tipus === 'didactic') badgeText = 'Didàctic';
        if (prompt.tipus === 'nl') badgeText = 'Nivell Lingüístic';

        card.innerHTML = `
            <div class="prompt-header">
                <span class="prompt-badge">${badgeText} — ${prompt.categoria || ''}</span>
                <h3>${prompt.titol}</h3>
                <div class="prompt-author">Per: ${prompt.autor || 'Anònim'}</div>
            </div>
            <div class="prompt-body">
                <pre>${prompt.contingut}</pre>
            </div>
            <div class="prompt-actions">
                <button class="btn-copy" data-text="${encodeURIComponent(prompt.contingut)}">
                    📋 Copiar prompt
                </button>
            </div>
        `;

        container.appendChild(card);
    });

    document.querySelectorAll('.btn-copy').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const text = decodeURIComponent(e.currentTarget.getAttribute('data-text'));
            navigator.clipboard.writeText(text).then(() => {
                const originalText = e.currentTarget.innerHTML;
                e.currentTarget.innerHTML = '✅ Copiat!';
                setTimeout(() => { e.currentTarget.innerHTML = originalText; }, 2000);
            });
        });
    });
}

// 5. CONFIGURACIÓ D'ESDEVENIMENTS I CERCA
function configurarEsdeveniments() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const filtrats = totsElsPrompts.filter(p => 
                (p.titol && p.titol.toLowerCase().includes(query)) ||
                (p.contingut && p.contingut.toLowerCase().includes(query)) ||
                (p.categoria && p.categoria.toLowerCase().includes(query)) ||
                (p.autor && p.autor.toLowerCase().includes(query))
            );
            mostrarPrompts(filtrats);
        });
    }

    const modal = document.getElementById('admin-modal');
    const btnOpen = document.getElementById('admin-login-btn');
    const btnClose = document.getElementById('btn-close-modal');
    const selectTypeModal = document.getElementById('new-prompt-type');

    if (btnOpen) btnOpen.addEventListener('click', () => modal.style.display = 'flex');
    if (btnClose) btnClose.addEventListener('click', () => modal.style.display = 'none');

    if (selectTypeModal) {
        selectTypeModal.addEventListener('change', (e) => {
            actualitzarCategoriesModal(e.target.value);
        });
    }

    const formAdd = document.getElementById('add-prompt-form');
    if (formAdd) {
        formAdd.addEventListener('submit', async (e) => {
            e.preventDefault();

            const titol = document.getElementById('new-prompt-title').value.trim();
            const autor = document.getElementById('new-prompt-author').value.trim();
            const tipus = document.getElementById('new-prompt-type').value;
            const categoria = document.getElementById('new-prompt-category').value;
            const contingut = document.getElementById('new-prompt-body').value.trim();

            const btnSubmit = formAdd.querySelector('button[type="submit"]');
            btnSubmit.disabled = true;
            btnSubmit.textContent = 'Guardant...';

            try {
                const { error } = await supabase
                    .from('prompts')
                    .insert([{ titol, autor, tipus, categoria, contingut }]);

                if (error) throw error;

                alert('Prompt guardat amb èxit!');
                formAdd.reset();
                modal.style.display = 'none';
                carregarPrompts();

            } catch (err) {
                console.error('Error en guardar el prompt:', err);
                alert('Hi ha hagut un error en guardar el prompt.');
            } finally {
                btnSubmit.disabled = false;
                btnSubmit.textContent = 'Guardar Prompt';
            }
        });
    }
}