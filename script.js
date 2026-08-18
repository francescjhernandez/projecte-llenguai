// --- CONFIGURACIÓ DE SUPABASE I WORKER ---
const SUPABASE_URL = "https://paxrolsjynqivoeltoyk.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBheHJvbHNqeW5xaXZvZWx0b3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2ODA4MTUsImV4cCI6MjEwMTI1NjgxNX0.8sYrtc7D5-_2keQPf2Ra-0Ff_lNC3PJkH0P6H9gqbXA";

// URL DEL WORKER DE CLOUDFLARE
const SL_WORKER_URL = "https://llenguai-sl-agent.francesc-j-hernandez.workers.dev";

const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

let allPrompts = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchPrompts();
    setupEventListeners();
    setupSLAgent();
});

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
            console.error('Error carregant de Supabase:', err);
        }
    }
    allPrompts = [];
    renderPrompts(allPrompts);
}

// LLISTA VERTICAL: títol + badge de color + botó copiar (creat amb DOM API, sense innerHTML)
function renderPrompts(prompts) {
    const container = document.getElementById('prompts-container');
    if (!container) return;
    container.innerHTML = '';

    if (prompts.length === 0) {
        const msg = document.createElement('p');
        msg.style.color = '#64748b';
        msg.style.textAlign = 'center';
        msg.style.fontSize = '1.1rem';
        msg.textContent = 'No s\'han trobat prompts.';
        container.appendChild(msg);
        return;
    }

    prompts.forEach((prompt) => {
        const row = document.createElement('div');
        row.className = 'prompt-row';

        // Títol
        const titleDiv = document.createElement('div');
        titleDiv.className = 'prompt-row-title';
        titleDiv.textContent = prompt.title || 'Sense títol';
        row.appendChild(titleDiv);

        // Contenidor de badges + botó
        const badgesDiv = document.createElement('div');
        badgesDiv.className = 'prompt-row-badges';

        // Badge de tipus
        const typeBadge = document.createElement('span');
        typeBadge.className = 'btn-type-badge';

        if (prompt.type === 'sl' || prompt.type === 'socioling') {
            typeBadge.classList.add('btn-type-sl');
            typeBadge.textContent = 'SL';
        } else if (prompt.type === 'dl' || prompt.type === 'didactic') {
            typeBadge.classList.add('btn-type-dl');
            typeBadge.textContent = 'DL';
        } else if (prompt.type === 'nl') {
            typeBadge.classList.add('btn-type-nl');
            typeBadge.textContent = 'NL';
        } else {
            typeBadge.classList.add('btn-type-sl');
            typeBadge.textContent = (prompt.type || 'SL').toUpperCase();
        }

        // Botó Copiar
        const copyBtn = document.createElement('button');
        copyBtn.className = 'btn-copy-list';
        copyBtn.textContent = 'Copiar';
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(prompt.body || '').then(() => {
                copyBtn.textContent = 'Copiat!';
                setTimeout(() => copyBtn.textContent = 'Copiar', 2000);
            });
        });

        badgesDiv.appendChild(typeBadge);
        badgesDiv.appendChild(copyBtn);
        row.appendChild(badgesDiv);
        container.appendChild(row);
    });
}

function setupEventListeners() {
    const searchInput = document.getElementById('search-input');
    const didacticSearch = document.getElementById('didactic-search');
    const nlSearch = document.getElementById('nl-search');

    if (searchInput) searchInput.addEventListener('input', (e) => filterPrompts(e.target.value));
    if (didacticSearch) didacticSearch.addEventListener('input', (e) => filterPrompts(e.target.value, 'dl'));
    if (nlSearch) nlSearch.addEventListener('input', (e) => filterPrompts(e.target.value, 'nl'));

    const adminBtn = document.getElementById('admin-login-btn');
    const closeModalBtn = document.getElementById('btn-close-modal');
    const adminModal = document.getElementById('admin-modal');
    const addForm = document.getElementById('add-prompt-form');

    if (adminBtn) adminBtn.addEventListener('click', () => adminModal.style.display = 'flex');
    if (closeModalBtn) closeModalBtn.addEventListener('click', () => adminModal.style.display = 'none');

    if (addForm) {
        addForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const title = document.getElementById('new-prompt-title').value.trim();
            const author = document.getElementById('new-prompt-author').value.trim();
            const type = document.getElementById('new-prompt-type').value;
            const category = document.getElementById('new-prompt-category').value.trim();
            const body = document.getElementById('new-prompt-body').value.trim();

            if (!title || !body) {
                alert("Si us plau, ompli el títol i el contingut.");
                return;
            }

            try {
                const { data, error } = await supabaseClient
                    .from('prompts')
                    .insert([{ title, author, type, category, body }]);

                if (error) {
                    console.error("Error Supabase:", error);
                    alert("Error en desar el prompt: " + error.message);
                    return;
                }

                alert("Prompt desat correctament!");
                addForm.reset();
                adminModal.style.display = 'none';
                fetchPrompts();

            } catch (err) {
                console.error("Error inesperat:", err);
                alert("S'ha produït un error en enviar les dades.");
            }
        });
    }
}

function setupSLAgent() {
    const btnAskSL = document.getElementById('btn-ask-sl');
    const inputSL = document.getElementById('socioling-search');
    const responseBox = document.getElementById('sl-ai-response');

    if (!btnAskSL || !inputSL || !responseBox) return;

    const executarConsultaSL = async () => {
        const pregunta = inputSL.value.trim();
        if (!pregunta) {
            alert("Si us plau, escriu un municipi o una consulta sociolingüística.");
            return;
        }

        btnAskSL.disabled = true;
        btnAskSL.textContent = "Consultant...";
        responseBox.style.display = "block";
        responseBox.className = "ai-response-box loading";
        responseBox.textContent = "Analitzant dades sociolingüístiques en Supabase...";

        try {
            const res = await fetch(SL_WORKER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pregunta })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Error en la consulta");
            }

            responseBox.className = "ai-response-box success";
            responseBox.textContent = data.resposta;

        } catch (err) {
            responseBox.className = "ai-response-box error";
            responseBox.textContent = "S'ha produït un error en obtindre la resposta: " + err.message;
        } finally {
            btnAskSL.disabled = false;
            btnAskSL.textContent = "Consultar IA";
        }
    };

    btnAskSL.addEventListener('click', executarConsultaSL);
    inputSL.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') executarConsultaSL();
    });
}

function filterPrompts(query, typeFilter = null) {
    const q = query.toLowerCase();
    const filtered = allPrompts.filter(p => {
        const matchesType = typeFilter ? (p.type === typeFilter || (typeFilter === 'dl' && p.type === 'didactic')) : true;
        const matchesText = (p.title && p.title.toLowerCase().includes(q)) ||
                            (p.body && p.body.toLowerCase().includes(q)) ||
                            (p.category && p.category.toLowerCase().includes(q)) ||
                            (p.author && p.author.toLowerCase().includes(q));
        return matchesType && matchesText;
    });
    renderPrompts(filtered);
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function escapeJsString(str) {
    if (!str) return '';
    return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
}
