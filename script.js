// 1. CONFIGURACIÓ DE SUPABASE I CORREUS DE REVISIÓ
const SUPABASE_URL = 'https://amswkfdhwashotagrhfo.supabase.co';
const SUPABASE_KEY = 'sb_publishable_J-PhmX7Awpb8UwDYXhYwWg_iISrccBy';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Variables de correu per a l'escalat a revisors humans
const correu_SL = 'suport.sl@llenguai.cat'; // Servei / Suport Lingüístic
const correu_NL = 'suport.nl@llenguai.cat'; // Nivell Lingüístic / Docent
const correu_DL = 'suport.dl@llenguai.cat'; // Desenvolupament / Tècnic

// 2. DICCIONARI DE TRADUCCIONS (i18n)
const TRANSLATIONS = {
    ca: {
        page_title: "Projecte LlenguAI",
        header_title: "Projecte LlenguAI",
        btn_admin: "Pujar Prompts",
        socio_title: "Situació sociolingüística",
        opt_know: "Coneixements",
        opt_uses: "Usos",
        opt_attitudes: "Actituds",
        lbl_ambit: "Indiqueu l’àmbit:",
        opt_select: "[municipi, comarca, classe social, sector laboral, etc.]",
        ambit_municipi: "Municipi",
        ambit_comarca: "Comarca",
        ambit_social: "Classe social",
        ambit_laboral: "Sector laboral",
        ambit_altres: "Altres",
        didactic_title: "Prompts didàctics",
        lbl_materia_didactic: "Indiqueu matèria del prompt didàctic:",
        opt_select_materia: "Seleccioneu la matèria...",
        btn_download_form: "📥 Descarregueu el formulari",
        nl_title: "Prompts de NL (Nivell Lingüístic)",
        lbl_materia_nl: "Indiqueu matèria del prompt de NL:",
        search_placeholder: "Cercar prompts per paraula clau, matèria, nivell...",
        list_prompts_title: "Relació de prompts",
        admin_panel_title: "Panell de Gestió de Prompts",
        prompt_title_label: "Títol del Prompt",
        prompt_author_label: "Nom de la persona que carrega el prompt",
        prompt_type_label: "Tipus de Prompt",
        opt_type_socio: "Situació Sociolingüística",
        opt_type_didactic: "Didàctic",
        opt_type_nl: "Nivell Lingüístic (NL)",
        prompt_cat_label: "Matèria / Àmbit",
        prompt_body_label: "Contingut del Prompt",
        prompt_body_help: "Important: Copia i pega el prompt strictly en text pla (sense formats de Word o HTML).",
        btn_cancel: "Cancel·lar",
        btn_save_prompt: "Guardar Prompt",
        ai_assistant_title: "Assistent de Consulta — Projecte LlenguAI",
        contact_name_label: "Nom i cognoms",
        contact_email_label: "Correu electrònic de contacte",
        contact_type_label: "Tipus de consulta",
        opt_support_sl: "Consulta lingüística (SL)",
        opt_support_nl: "Consulta sobre nivell lingüístic / docent (NL)",
        opt_support_dl: "Incidència tècnica / desenvolupament (DL)",
        ai_query_label: "Escriu la teua consulta",
        btn_send_ai_query: "Enviar consulta",
        footer_text: "PROJECTE LLENGUAI © 2026",
        support_label: "Consultes i suport:",
        link_ai_assistant: "Finestra de consulta (Assistent IA)"
    },
    an: {
        page_title: "Projecte LlenguAI",
        header_title: "Projecte LlenguAI",
        btn_admin: "Pujar Prompts",
        socio_title: "Situacion sociolinguistica",
        opt_know: "Coneixements",
        opt_uses: "Usatges",
        opt_attitudes: "Actituds",
        lbl_ambit: "Indicatz l'ambit:",
        opt_select: "[municipi, comarca, classa social, sector laborau, etc.]",
        ambit_municipi: "Municipi",
        ambit_comarca: "Comarca",
        ambit_social: "Classa social",
        ambit_laboral: "Sector laborau",
        ambit_altres: "Autres",
        didactic_title: "Prompts didactics",
        lbl_materia_didactic: "Indicatz materia deth prompt didactic:",
        opt_select_materia: "Seleccionatz la materia...",
        btn_download_form: "📥 Descarregatz eth formulari",
        nl_title: "Prompts de NL (Nivèu Linguistic)",
        lbl_materia_nl: "Indicatz materia deth prompt de NL:",
        search_placeholder: "Cercar prompts per paraula clau, materia, nivèu...",
        list_prompts_title: "Relacion de prompts",
        admin_panel_title: "Panèu de Gestion de Prompts",
        prompt_title_label: "Titòl deth Prompt",
        prompt_author_label: "Nom dera persona que cárrega eth prompt",
        prompt_type_label: "Tipus de Prompt",
        opt_type_socio: "Situacion Sociolinguistica",
        opt_type_didactic: "Didactic",
        opt_type_nl: "Nivèu Linguistic (NL)",
        prompt_cat_label: "Materia / Ambit",
        prompt_body_label: "Contengut deth Prompt",
        prompt_body_help: "Important: Copiatz e pegatz eth prompt estrictament en tèxte meirada (sense formats de Word o HTML).",
        btn_cancel: "Anullar",
        btn_save_prompt: "Guardar Prompt",
        ai_assistant_title: "Assistent de Consulta — Projecte LlenguAI",
        contact_name_label: "Nom e cognoms",
        contact_email_label: "Corrèu meirada de contacte",
        contact_type_label: "Tipus de consulta",
        opt_support_sl: "Consulta linguistica (SL)",
        opt_support_nl: "Consulta sus nivèu linguistic / docent (NL)",
        opt_support_dl: "Incidéncia tecnica / desvolopament (DL)",
        ai_query_label: "Escrivetz la vòsta consulta",
        btn_send_ai_query: "Enviar consulta",
        footer_text: "PROJECTE LLENGUAI © 2026",
        support_label: "Consultes e supòrt:",
        link_ai_assistant: "Finèstra de consulta (Assistent IA)"
    },
    es: {
        page_title: "Proyecto LlenguAI",
        header_title: "Proyecto LlenguAI",
        btn_admin: "Subir Prompts",
        socio_title: "Situación sociolingüística",
        opt_know: "Conocimientos",
        opt_uses: "Usos",
        opt_attitudes: "Actitudes",
        lbl_ambit: "Indique el ámbito:",
        opt_select: "[municipio, comarca, clase social, sector laboral, etc.]",
        ambit_municipi: "Municipio",
        ambit_comarca: "Comarca",
        ambit_social: "Clase social",
        ambit_laboral: "Sector laboral",
        ambit_altres: "Otros",
        didactic_title: "Prompts didácticos",
        lbl_materia_didactic: "Indique materia del prompt didáctico:",
        opt_select_materia: "Seleccione la materia...",
        btn_download_form: "📥 Descargue el formulario",
        nl_title: "Prompts de NL (Nivel Lingüístico)",
        lbl_materia_nl: "Indique materia del prompt de NL:",
        search_placeholder: "Buscar prompts por palabra clave, materia, nivel...",
        list_prompts_title: "Relación de prompts",
        admin_panel_title: "Panel de Gestión de Prompts",
        prompt_title_label: "Título del Prompt",
        prompt_author_label: "Nombre de la persona que carga el prompt",
        prompt_type_label: "Tipo de Prompt",
        opt_type_socio: "Situación Sociolingüística",
        opt_type_didactic: "Didáctico",
        opt_type_nl: "Nivel Lingüístico (NL)",
        prompt_cat_label: "Materia / Ámbito",
        prompt_body_label: "Contenido del Prompt",
        prompt_body_help: "Importante: Copie y pegue el prompt estrictamente en texto plano (sin formatos de Word o HTML).",
        btn_cancel: "Cancelar",
        btn_save_prompt: "Guardar Prompt",
        ai_assistant_title: "Asistente de Consulta — Proyecto LlenguAI",
        contact_name_label: "Nombre y apellidos",
        contact_email_label: "Correo electrónico de contacto",
        contact_type_label: "Tipo de consulta",
        opt_support_sl: "Consulta lingüística (SL)",
        opt_support_nl: "Consulta sobre nivel lingüístico / docente (NL)",
        opt_support_dl: "Incidencia técnica / desarrollo (DL)",
        ai_query_label: "Escriba su consulta",
        btn_send_ai_query: "Enviar consulta",
        footer_text: "PROYECTO LLENGUAI © 2026",
        support_label: "Consultas y soporte:",
        link_ai_assistant: "Ventana de consulta (Asistente IA)"
    },
    en: {
        page_title: "LlenguAI Project",
        header_title: "LlenguAI Project",
        btn_admin: "Upload Prompts",
        socio_title: "Sociolinguistic Situation",
        opt_know: "Knowledge",
        opt_uses: "Uses",
        opt_attitudes: "Attitudes",
        lbl_ambit: "Specify the area:",
        opt_select: "[municipality, region, social class, work sector, etc.]",
        ambit_municipi: "Municipality",
        ambit_comarca: "Region",
        ambit_social: "Social Class",
        ambit_laboral: "Work Sector",
        ambit_altres: "Others",
        didactic_title: "Educational Prompts",
        lbl_materia_didactic: "Select subject for educational prompt:",
        opt_select_materia: "Select subject...",
        btn_download_form: "📥 Download form",
        nl_title: "Linguistic Level Prompts",
        lbl_materia_nl: "Select subject for linguistic level prompt:",
        search_placeholder: "Search prompts by keyword, subject, level...",
        list_prompts_title: "List of prompts",
        admin_panel_title: "Prompt Management Panel",
        prompt_title_label: "Prompt Title",
        prompt_author_label: "Name of the uploader",
        prompt_type_label: "Prompt Type",
        opt_type_socio: "Sociolinguistic Situation",
        opt_type_didactic: "Educational",
        opt_type_nl: "Linguistic Level (NL)",
        prompt_cat_label: "Subject / Area",
        prompt_body_label: "Prompt Content",
        prompt_body_help: "Important: Copy and paste the prompt in plain text only (without Word or HTML formatting).",
        btn_cancel: "Cancel",
        btn_save_prompt: "Save Prompt",
        ai_assistant_title: "Query Assistant — LlenguAI Project",
        contact_name_label: "Full Name",
        contact_email_label: "Contact Email",
        contact_type_label: "Type of Inquiry",
        opt_support_sl: "Linguistic Inquiry (SL)",
        opt_support_nl: "Linguistic Level / Teaching Inquiry (NL)",
        opt_support_dl: "Technical Issue / Development (DL)",
        ai_query_label: "Write your inquiry",
        btn_send_ai_query: "Send inquiry",
        footer_text: "LLENGUAI PROJECT © 2026",
        support_label: "Inquiries & Support:",
        link_ai_assistant: "Inquiry Window (AI Assistant)"
    },
    fr: {
        page_title: "Projet LlenguAI",
        header_title: "Projet LlenguAI",
        btn_admin: "Télécharger des Prompts",
        socio_title: "Situation sociolinguistique",
        opt_know: "Connaissances",
        opt_uses: "Usages",
        opt_attitudes: "Attitudes",
        lbl_ambit: "Indiquez le domaine :",
        opt_select: "[municipalité, région, classe sociale, secteur professionnel, etc.]",
        ambit_municipi: "Municipalité",
        ambit_comarca: "Région",
        ambit_social: "Classe sociale",
        ambit_laboral: "Secteur professionnel",
        ambit_altres: "Autres",
        didactic_title: "Prompts didactiques",
        lbl_materia_didactic: "Indiquez la matière du prompt didactique :",
        opt_select_materia: "Sélectionnez la matière...",
        btn_download_form: "📥 Télécharger le formulaire",
        nl_title: "Prompts de niveau linguistique",
        lbl_materia_nl: "Indiquez la matière du prompt de niveau :",
        search_placeholder: "Rechercher des prompts par mot-clé, matière, niveau...",
        list_prompts_title: "Liste des prompts",
        admin_panel_title: "Panneau de gestion des prompts",
        prompt_title_label: "Titre du Prompt",
        prompt_author_label: "Nom de la personne qui publie",
        prompt_type_label: "Type de Prompt",
        opt_type_socio: "Situation sociolinguistique",
        opt_type_didactic: "Didactique",
        opt_type_nl: "Niveau linguistique (NL)",
        prompt_cat_label: "Matière / Domaine",
        prompt_body_label: "Contenu du Prompt",
        prompt_body_help: "Important : Copiez et collez le prompt strictement en texte brut (sans formatage Word ou HTML).",
        btn_cancel: "Annuler",
        btn_save_prompt: "Enregistrer le Prompt",
        ai_assistant_title: "Assistant de Consultation — Projet LlenguAI",
        contact_name_label: "Nom et prénom",
        contact_email_label: "E-mail de contact",
        contact_type_label: "Type de demande",
        opt_support_sl: "Demande linguistique (SL)",
        opt_support_nl: "Niveau linguistique / Enseignement (NL)",
        opt_support_dl: "Problème technique / Développement (DL)",
        ai_query_label: "Écrivez votre demande",
        btn_send_ai_query: "Envoyer la demande",
        footer_text: "PROJET LLENGUAI © 2026",
        support_label: "Demandes et support :",
        link_ai_assistant: "Fenêtre de consultation (Assistant IA)"
    },
    pt: {
        page_title: "Projeto LlenguAI",
        header_title: "Projeto LlenguAI",
        btn_admin: "Carregar Prompts",
        socio_title: "Situação sociolinguística",
        opt_know: "Conhecimentos",
        opt_uses: "Usos",
        opt_attitudes: "Atitudes",
        lbl_ambit: "Indique o âmbito:",
        opt_select: "[município, região, classe social, setor de trabalho, etc.]",
        ambit_municipi: "Município",
        ambit_comarca: "Região",
        ambit_social: "Classe social",
        ambit_laboral: "Setor de trabalho",
        ambit_altres: "Outros",
        didactic_title: "Prompts didáticos",
        lbl_materia_didactic: "Indique a matéria do prompt didático:",
        opt_select_materia: "Selecione a matéria...",
        btn_download_form: "📥 Descarregar o formulário",
        nl_title: "Prompts de Nível Linguístico",
        lbl_materia_nl: "Indique a matéria do prompt de nível:",
        search_placeholder: "Pesquisar prompts por palavra-chave, matéria, nível...",
        list_prompts_title: "Relação de prompts",
        admin_panel_title: "Painel de Gestão de Prompts",
        prompt_title_label: "Título do Prompt",
        prompt_author_label: "Nome da pessoa que carrega o prompt",
        prompt_type_label: "Tipo de Prompt",
        opt_type_socio: "Situação Sociolinguística",
        opt_type_didactic: "Didático",
        opt_type_nl: "Nível Linguístico (NL)",
        prompt_cat_label: "Matéria / Âmbito",
        prompt_body_label: "Conteúdo do Prompt",
        prompt_body_help: "Importante: Copie e cole o prompt estritamente em texto simples (sem formatação Word ou HTML).",
        btn_cancel: "Cancelar",
        btn_save_prompt: "Guardar Prompt",
        ai_assistant_title: "Assistente de Consulta — Projeto LlenguAI",
        contact_name_label: "Nome e apelidos",
        contact_email_label: "Correio eletrónico de contacto",
        contact_type_label: "Tipo de consulta",
        opt_support_sl: "Consulta linguística (SL)",
        opt_support_nl: "Consulta sobre nível linguístico / docente (NL)",
        opt_support_dl: "Ocorrência técnica / desenvolvimento (DL)",
        ai_query_label: "Escreva a sua consulta",
        btn_send_ai_query: "Enviar consulta",
        footer_text: "PROJETO LLENGUAI © 2026",
        support_label: "Consultas e suporte:",
        link_ai_assistant: "Janela de consulta (Assistente IA)"
    }
};

// 3. OPCIONS PER ALS SELECTORS DE MATÈRIES I ÀMBITS
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
let idiomaActual = 'ca';

// 4. INICIALITZACIÓ EN CARREGAR LA PÀGINA
document.addEventListener('DOMContentLoaded', () => {
    inicialitzarSelectors();
    carregarPrompts();
    configurarEsdeveniments();
    configurarIdiomes();
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

// 5. GESTIÓ D'IDIOMES (i18n) AMB SEGUIMENT EN GA4
function configurarIdiomes() {
    const btns = document.querySelectorAll('.lang-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.target.id.replace('btn-', '');
            if (TRANSLATIONS[lang]) {
                idiomaActual = lang;
                btns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                canviarIdioma(lang);

                // Esdeveniment Google Analytics 4
                if (typeof gtag === 'function') {
                    gtag('event', 'change_language', {
                        'language': lang
                    });
                }
            }
        });
    });
}

function canviarIdioma(lang) {
    const dictionary = TRANSLATIONS[lang];
    if (!dictionary) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dictionary[key]) {
            el.textContent = dictionary[key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dictionary[key]) {
            el.placeholder = dictionary[key];
        }
    });
}

// 6. LLEGIR PROMPTS DE SUPABASE
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
            
            // Esdeveniment Google Analytics 4
            if (typeof gtag === 'function') {
                gtag('event', 'copy_prompt', {
                    'event_category': 'engagement',
                    'prompt_preview': text.substring(0, 30)
                });
            }

            navigator.clipboard.writeText(text).then(() => {
                const originalText = e.currentTarget.innerHTML;
                e.currentTarget.innerHTML = '✅ Copiat!';
                setTimeout(() => { e.currentTarget.innerHTML = originalText; }, 2000);
            });
        });
    });
}

// 7. CONFIGURACIÓ D'ESDEVENIMENTS, CERCA I MODALS
function configurarEsdeveniments() {
    // Cercador de prompts
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

    // Modal d'Administració (Pujar Prompts)
    const adminModal = document.getElementById('admin-modal');
    const btnOpenAdmin = document.getElementById('admin-login-btn');
    const btnCloseAdmin = document.getElementById('btn-close-modal');
    const selectTypeModal = document.getElementById('new-prompt-type');

    if (btnOpenAdmin) btnOpenAdmin.addEventListener('click', () => adminModal.style.display = 'flex');
    if (btnCloseAdmin) btnCloseAdmin.addEventListener('click', () => adminModal.style.display = 'none');

    if (selectTypeModal) {
        selectTypeModal.addEventListener('change', (e) => {
            actualitzarCategoriesModal(e.target.value);
        });
    }

    // Formulari de Pujada de Prompts
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
                adminModal.style.display = 'none';
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

    // Modal de Consulta / Assistent IA
    const contactModal = document.getElementById('contact-modal');
    const btnOpenContact = document.getElementById('open-contact-btn');
    const btnCloseContact = document.getElementById('btn-close-contact-modal');
    const formContact = document.getElementById('contact-form');

    if (btnOpenContact) btnOpenContact.addEventListener('click', () => contactModal.style.display = 'flex');
    if (btnCloseContact) btnCloseContact.addEventListener('click', () => contactModal.style.display = 'none');

    if (formContact) {
        formContact.addEventListener('submit', (e) => {
            e.preventDefault();

            const nom = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const tipus = document.getElementById('contact-type').value;
            const missatge = document.getElementById('contact-message').value.trim();

            // Esdeveniment Google Analytics 4
            if (typeof gtag === 'function') {
                gtag('event', 'send_inquiry', {
                    'inquiry_type': tipus
                });
            }

            // Selecció de la variable de correu segons la tipologia
            let correuDesti = correu_SL;
            if (tipus === 'nl') correuDesti = correu_NL;
            if (tipus === 'dl') correuDesti = correu_DL;

            alert(`La teua consulta s'ha enviat a l'Assistent IA.\nSi requereix revisió humana, serà dirigida a: ${correuDesti}`);

            formContact.reset();
            contactModal.style.display = 'none';
        });
    }
}
