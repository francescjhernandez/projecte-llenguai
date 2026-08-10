// --- CONFIGURACIÓ DE SUPABASE ---
const SUPABASE_URL = "https://paxrolsjynqivoeltoyk.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBheHJvbHNqeW5xaXZvZWx0b3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2ODA4MTUsImV4cCI6MjEwMTI1NjgxNX0.8sYrtc7D5-_2keQPf2Ra-0Ff_lNC3PJkH0P6H9gqbXA";

const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

// --- DADES LOCALS I TRADUCCIONS (i18n) ---
let allPrompts = [];

const i18nTranslations = {
    ca: {
        page_title: "Projecte LlenguAI",
        btn_admin: "Pujar Prompts",
        socio_title: "Situació sociolingüística",
        opt_know: "Coneixements",
        opt_uses: "Usos",
        opt_attitudes: "Actituds",
        lbl_ambit_sl: "Consulta la situació sociolingüística d'un poble, una comarca, un sector laboral, un col·lectiu, etc.:",
        ph_ambit_sl: "Escriu un poble, comarca, sector laboral...",
        didactic_title: "Didàctica de la llengua",
        lbl_materia_didactic: "Indiqueu matèria del prompt de didàctica de la llengua, nivell educatiu, etc.:",
        ph_materia_didactic: "Escriu la matèria, nivell educatiu (Primària, Secundària...)",
        btn_download_form: "📥 Descarregueu el formulari",
        nl_title: "Prompts de normalització lingüística",
        lbl_materia_nl: "Indiqueu matèria del prompt de normalització lingüística:",
        ph_materia_nl: "Escriu la matèria o àmbit (Administració local, comerç, mitjans...)",
        btn_download_form_nl: "📥 Descarregueu el formulari",
        search_placeholder: "Cercar prompts per paraula clau, matèria, autor...",
        list_prompts_title: "Relació de prompts",
        about_title: "Sobre el projecte",
        about_text: "La paraula LlenguAI es forma amb Llengua + AI (Intel·ligència Artificial). És l'expressió de la possibilitat de relacionar el desenvolupament de la nostra llengua amb la IA Generativa.",
        btn_cta: "Accedir als prompts",
        admin_panel_title: "Panell de Gestió de Prompts",
        prompt_title_label: "Títol del Prompt",
        prompt_author_label: "Nom de la persona que carrega el prompt",
        prompt_type_label: "Tipus de Prompt",
        opt_type_socio: "Situació Sociolingüística (SL)",
        opt_type_didactic: "Prompt mestre de didàctica (DL)",
        opt_type_nl: "Prompt mestre de normalització (NL)",
        prompt_cat_label: "Matèria / Àmbit",
        prompt_body_label: "Contingut del Prompt",
        prompt_body_help: "Copieu i pegueu el prompt directament en text pla.",
        btn_cancel: "Cancel·lar",
        btn_save_prompt: "Guardar Prompt",
        btn_copy: "Copiar Prompt",
        btn_copied: "Copiat!"
    },
    es: {
        page_title: "Proyecto LlenguAI",
        btn_admin: "Subir Prompts",
        socio_title: "Situación sociolingüística",
        opt_know: "Conocimientos",
        opt_uses: "Usos",
        opt_attitudes: "Actitudes",
        lbl_ambit_sl: "Consulte la situación sociolingüística de un pueblo, comarca, sector laboral, colectivo, etc.:",
        ph_ambit_sl: "Escriba un pueblo, comarca, sector laboral...",
        didactic_title: "Didáctica de la lengua",
        lbl_materia_didactic: "Indique materia del prompt de didáctica de la lengua, nivel educativo, etc.:",
        ph_materia_didactic: "Escriba la materia, nivel educativo (Primaria, Secundaria...)",
        btn_download_form: "📥 Descargar el formulario",
        nl_title: "Prompts de normalización lingüística",
        lbl_materia_nl: "Indique materia del prompt de normalización lingüística:",
        ph_materia_nl: "Escriba la materia o ámbito (Administración local, comercio, medios...)",
        btn_download_form_nl: "📥 Descargar el formulario",
        search_placeholder: "Buscar prompts por palabra clave, materia, autor...",
        list_prompts_title: "Relación de prompts",
        about_title: "Sobre el proyecto",
        about_text: "La palabra LlenguAI se forma con Llengua + AI (Inteligencia Artificial). Es la expresión de la posibilidad de relacionar el desarrollo de nuestra lengua con la IA Generativa.",
        btn_cta: "Acceder a los prompts",
        admin_panel_title: "Panel de Gestión de Prompts",
        prompt_title_label: "Título del Prompt",
        prompt_author_label: "Nombre de la persona que carga el prompt",
        prompt_type_label: "Tipo de Prompt",
        opt_type_socio: "Situación Sociolingüística (SL)",
        opt_type_didactic: "Prompt maestro de didáctica (DL)",
        opt_type_nl: "Prompt maestro de normalización (NL)",
        prompt_cat_label: "Materia / Ámbito",
        prompt_body_label: "Contenido del Prompt",
        prompt_body_help: "Copie y pegue el prompt directamente en texto plano.",
        btn_cancel: "Cancelar",
        btn_save_prompt: "Guardar Prompt",
        btn_copy: "Copiar Prompt",
        btn_copied: "¡Copiado!"
    },
    en: {
        page_title: "Project LlenguAI",
        btn_admin: "Upload Prompts",
        socio_title: "Sociolinguistic situation",
        opt_know: "Knowledge",
        opt_uses: "Uses",
        opt_attitudes: "Attitudes",
        lbl_ambit_sl: "Check the sociolinguistic situation of a town, region, work sector, group, etc.:",
        ph_ambit_sl: "Enter a town, region, work sector...",
        didactic_title: "Language Didactics",
        lbl_materia_didactic: "Indicate subject for language didactics prompt, educational level, etc.:",
        ph_materia_didactic: "Enter subject, educational level (Primary, Secondary...)",
        btn_download_form: "📥 Download form",
        nl_title: "Language normalization prompts",
        lbl_materia_nl: "Select subject for language normalization prompt:",
        ph_materia_nl: "Enter subject or field (Local administration, trade, media...)",
        btn_download_form_nl: "📥 Download form",
        search_placeholder: "Search prompts by keyword, subject, author...",
        list_prompts_title: "List of prompts",
        about_title: "About the project",
        about_text: "The word LlenguAI combines Llengua (Language) + AI (Artificial Intelligence). It represents the possibility of combining language development with Generative AI.",
        btn_cta: "Access prompts",
        admin_panel_title: "Prompt Management Panel",
        prompt_title_label: "Prompt Title",
        prompt_author_label: "Author name",
        prompt_type_label: "Prompt Type",
        opt_type_socio: "Sociolinguistic Situation (SL)",
        opt_type_didactic: "Master Didactic Prompt (DL)",
        opt_type_nl: "Master Normalization Prompt (NL)",
        prompt_cat_label: "Subject / Field",
        prompt_body_label: "Prompt Content",
        prompt_body_help: "Copy and paste prompt directly in plain text.",
        btn_cancel: "Cancel",
        btn_save_prompt: "Save Prompt",
        btn_copy: "Copy Prompt",
        btn_copied: "Copied!"
    }
};

// --- ELEMENTS DEL DOM ---
const promptsContainer = document.getElementById('prompts-container');
const searchInput = document.getElementById('search-input');
const sociolingSearch = document.getElementById('socioling-search');
const didacticSearch = document.getElementById('didactic-search');
const nlSearch = document.getElementById('nl-search');

const adminModal = document.getElementById('admin-modal');
const adminBtn = document.getElementById('admin-login-btn');
const closeModalBtn = document.getElementById('btn-close-modal');
const addPromptForm = document.getElementById('add-prompt-form');
const langButtons = document.querySelectorAll('.lang-btn');

// --- INICIALITZACIÓ ---
document.addEventListener('DOMContentLoaded', () => {
    fetchPrompts();
    setupEventListeners();
});

// --- CÀRREGA DE PROMPTS DES DE SUPABASE ---
async function fetchPrompts() {
    if (supabaseClient) {
        try {
            const { data, error } = await supabaseClient
                .from('prompts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            allPrompts = data || [];
            renderPrompts(allPrompts);
            return;
        } catch (err) {
            console.error('Error en connectar amb Supabase:', err);
        }
    }

    allPrompts = [];
    renderPrompts(allPrompts);
}

// --- CONSULTA DADES SL DES DE FITXERS EXTERNS ---
async function querySLData(searchTerm) {
    try {
        const response = await fetch('/data/sl/municipis.json');
        if (!response.ok) return;
        const data = await response.json();
        
        return data.filter(item => item.nom.toLowerCase().includes(searchTerm.toLowerCase()));
    } catch (err) {
        console.info('Fitxer extern SL no trobat o pendents de carregar:', err);
    }
}

// --- RENDERING DE PROMPTS (TARGETES COMPACTES) ---
function renderPrompts(prompts) {
    if (!promptsContainer) return;
    promptsContainer.innerHTML = '';

    if (prompts.length === 0) {
        promptsContainer.innerHTML = '<p style="color: #64748b; grid-column: 1/-1; text-align: center;">No s\'han trobat prompts que coincidisquen amb la cerca.</p>';
        return;
    }

    prompts.forEach((prompt, index) => {
        const card = document.createElement('div');
        card.className = 'prompt-card';

        let badgeClass = 'badge-default';
        let badgeLabel = prompt.type ? prompt.type.toUpperCase() : 'GENERAL';

        if (prompt.type === 'socioling' || prompt.type === 'sl') {
            badgeClass = 'badge-socioling';
            badgeLabel = 'SL';
        } else if (prompt.type === 'didactic' || prompt.type === 'dl') {
            badgeClass = 'badge-dl';
            badgeLabel = 'DL';
        } else if (prompt.type === 'nl') {
            badgeClass = 'badge-nl';
            badgeLabel = 'NL';
        }

        // Extracte de text curt
        const previewText = prompt.body.length > 120 
            ? prompt.body.substring(0, 120) + '...' 
            : prompt.body;

        card.innerHTML = `
            <div class="prompt-header">
                <span class="prompt-badge ${badgeClass}">${badgeLabel}</span>
                <h3>${escapeHtml(prompt.title)}</h3>
                <div class="prompt-author">Per: ${escapeHtml(prompt.author || 'Anònim')}</div>
            </div>
            <p class="prompt-preview">${escapeHtml(previewText)}</p>
            <div class="prompt-actions">
                <button class="btn-copy" onclick="copyToClipboard(\`${escapeJsString(prompt.body)}\`, this)">Copiar</button>
                <button class="btn-view" onclick="openPromptModal(${index})">Veure complet</button>
            </div>
        `;

        promptsContainer.appendChild(card);
    });
}

// --- MODAL PER A VEURE EL PROMPT COMPLET ---
function openPromptModal(index) {
    const prompt = allPrompts[index];
    if (!prompt) return;

    let viewModal = document.getElementById('view-prompt-modal');
    if (!viewModal) {
        viewModal = document.createElement('div');
        viewModal.id = 'view-prompt-modal';
        viewModal.className = 'modal';
        document.body.appendChild(viewModal);
    }

    viewModal.innerHTML = `
        <div class="modal-content" style="max-width: 700px; max-height: 85vh; overflow-y: auto;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1rem;">
                <h2>${escapeHtml(prompt.title)}</h2>
                <button onclick="document.getElementById('view-prompt-modal').style.display='none'" style="background:none; border:none; font-size:1.5rem; cursor:pointer;">&times;</button>
            </div>
            <p style="color:#64748b; margin-bottom:1rem;"><strong>Autor:</strong> ${escapeHtml(prompt.author || 'Anònim')}</p>
            <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:1rem; border-radius:8px; white-space:pre-wrap; font-family:monospace; font-size:0.9rem; margin-bottom:1.5rem; max-height:50vh; overflow-y:auto;">
                ${escapeHtml(prompt.body)}
            </div>
            <div style="display:flex; gap:10px; justify-content:flex-end;">
                <button class="btn-copy" style="padding:0.6rem 1.2rem;" onclick="copyToClipboard(\`${escapeJsString(prompt.body)}\`, this)">Copiar Prompt</button>
                <button class="btn-cancel" onclick="document.getElementById('view-prompt-modal').style.display='none'">Tancar</button>
            </div>
        </div>
    `;

    viewModal.style.display = 'flex';
}

// --- ESDEVENIMENTS ---
function setupEventListeners() {
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterPrompts(e.target.value);
        });
    }

    if (didacticSearch) {
        didacticSearch.addEventListener('input', (e) => {
            filterPrompts(e.target.value, 'didactic');
        });
    }

    if (nlSearch) {
        nlSearch.addEventListener('input', (e) => {
            filterPrompts(e.target.value, 'nl');
        });
    }

    if (sociolingSearch) {
        sociolingSearch.addEventListener('input', async (e) => {
            const query = e.target.value.trim();
            if (query.length > 2) {
                await querySLData(query);
            }
        });
    }

    if (adminBtn) {
        adminBtn.addEventListener('click', () => {
            if (adminModal) adminModal.style.display = 'flex';
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            if (adminModal) adminModal.style.display = 'none';
        });
    }

    if (addPromptForm) {
        addPromptForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const newPrompt = {
                title: document.getElementById('new-prompt-title').value,
                author: document.getElementById('new-prompt-author').value,
                type: document.getElementById('new-prompt-type').value,
                category: document.getElementById('new-prompt-category').value || 'general',
                body: document.getElementById('new-prompt-body').value
            };

            if (supabaseClient) {
                try {
                    const { error } = await supabaseClient
                        .from('prompts')
                        .insert([newPrompt]);

                    if (error) throw error;
                    fetchPrompts();
                } catch (err) {
                    console.error('Error guardant prompt:', err);
                    allPrompts.unshift({ ...newPrompt, id: Date.now() });
                    renderPrompts(allPrompts);
                }
            } else {
                allPrompts.unshift({ ...newPrompt, id: Date.now() });
                renderPrompts(allPrompts);
            }

            addPromptForm.reset();
            if (adminModal) adminModal.style.display = 'none';
        });
    }

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const lang = btn.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });
}

function filterPrompts(query, typeFilter = null) {
    const q = query.toLowerCase();
    const filtered = allPrompts.filter(p => {
        const matchesType = typeFilter ? (p.type === typeFilter || (typeFilter === 'didactic' && p.type === 'dl')) : true;
        const matchesText = p.title.toLowerCase().includes(q) ||
                            p.body.toLowerCase().includes(q) ||
                            (p.category && p.category.toLowerCase().includes(q)) ||
                            (p.author && p.author.toLowerCase().includes(q));
        return matchesType && matchesText;
    });
    renderPrompts(filtered);
}

// --- CANVI D'IDIOMA (i18n) ---
function changeLanguage(lang) {
    const langData = i18nTranslations[lang] || i18nTranslations['ca'];

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (langData[key]) {
            element.textContent = langData[key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (langData[key]) {
            element.placeholder = langData[key];
        }
    });
}

// --- UTILITATS ---
function copyToClipboard(text, buttonElement) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = buttonElement.innerText;
        buttonElement.innerText = 'Copiat!';
        buttonElement.style.backgroundColor = '#16a34a';

        setTimeout(() => {
            buttonElement.innerText = originalText;
            buttonElement.style.backgroundColor = '';
        }, 2000);
    }).catch(err => {
        console.error('Error en copiar:', err);
    });
}

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function escapeJsString(str) {
    if (!str) return '';
    return str
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\$/g, '\\$');
}
