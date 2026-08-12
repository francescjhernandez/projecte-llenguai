// --- CONFIGURACIÓ DE SUPABASE ---
const SUPABASE_URL = "https://paxrolsjynqivoeltoyk.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBheHJvbHNqeW5xaXZvZWx0b3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2ODA4MTUsImV4cCI6MjEwMTI1NjgxNX0.8sYrtc7D5-_2keQPf2Ra-0Ff_lNC3PJkH0P6H9gqbXA";

const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

let allPrompts = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchPrompts();
    setupEventListeners();
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

// LLISTA VERTICAL: títol + botó de color (tipus) + botó copiar
function renderPrompts(prompts) {
    const container = document.getElementById('prompts-container');
    if (!container) return;
    container.innerHTML = '';

    if (prompts.length === 0) {
        container.innerHTML = '<p style="color: #64748b; text-align: center; font-size: 1.1rem;">No s\'han trobat prompts.</p>';
        return;
    }

    prompts.forEach((prompt) => {
        const row = document.createElement('div');
        row.className = 'prompt-row';

        let typeClass = 'btn-type-sl';
        let typeLabel = 'SL';

        if (prompt.type === 'sl' || prompt.type === 'socioling') {
            typeClass = 'btn-type-sl';
            typeLabel = 'SL';
        } else if (prompt.type === 'dl' || prompt.type === 'didactic') {
            typeClass = 'btn-type-dl';
            typeLabel = 'DL';
        } else if (prompt.type === 'nl') {
            typeClass = 'btn-type-nl';
            typeLabel = 'NL';
        }

        row.innerHTML = `
            <div class="prompt-row-title">${escapeHtml(prompt.title)}</div>
            <div class="prompt-row-badges">
                <span class="btn-type-badge ${typeClass}">${typeLabel}</span>
                <button class="btn-copy-list" onclick="copyText(\`${escapeJsString(prompt.body || '')}\`, this)">Copiar</button>
            </div>
        `;
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

function copyText(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        const original = btn.innerText;
        btn.innerText = 'Copiat!';
        setTimeout(() => btn.innerText = original, 2000);
    });
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function escapeJsString(str) {
    if (!str) return '';
    return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
}
