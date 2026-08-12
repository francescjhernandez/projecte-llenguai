// --- CONFIGURACIÓ DE SUPABASE ---
const SUPABASE_URL = "https://paxrolsjynqivoeltoyk.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBheHJvbHNqeW5xaXZvZWx0b3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2ODA4MTUsImV4cCI6MjEwMTI1NjgxNX0.8sYrtc7D5-_2keQPf2Ra-0Ff_lNC3PJkH0P6H9gqbXA";

const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

let allPrompts = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchPrompts();
    setupEventListeners();
});

// Carregar prompts des de Supabase
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

// Renderitzar les targetes (NOMÉS títol, badge i botons)
function renderPrompts(prompts) {
    const container = document.getElementById('prompts-container');
    if (!container) return;
    container.innerHTML = '';

    if (prompts.length === 0) {
        container.innerHTML = '<p style="color: #64748b; grid-column: 1/-1; text-align: center; font-size: 1.1rem;">No s\'han trobat prompts.</p>';
        return;
    }

    prompts.forEach((prompt, index) => {
        const card = document.createElement('div');
        card.className = 'prompt-card';

        let badgeClass = 'badge-sl';
        let badgeLabel = (prompt.type || 'SL').toUpperCase();

        if (prompt.type === 'sl' || prompt.type === 'socioling') {
            badgeClass = 'badge-sl';
            badgeLabel = 'SL';
        } else if (prompt.type === 'dl' || prompt.type === 'didactic') {
            badgeClass = 'badge-dl';
            badgeLabel = 'DL';
        } else if (prompt.type === 'nl') {
            badgeClass = 'badge-nl';
            badgeLabel = 'NL';
        }

        // NOMÉS BADGE, TÍTOL I BOTONS
        card.innerHTML = `
            <div class="prompt-header">
                <span class="badge-badge ${badgeClass}">${badgeLabel}</span>
                <h3>${escapeHtml(prompt.title)}</h3>
            </div>
            <div class="prompt-actions">
                <button class="btn-copy-card" onclick="copyText(\`${escapeJsString(prompt.body || '')}\`, this)">Copiar</button>
                <button class="btn-view-card" onclick="openPromptModal(${index})">Ampliar</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Mostrar la finestra emergent (modal) amb el text complet
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
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
                <h2>${escapeHtml(prompt.title)}</h2>
                <button onclick="document.getElementById('view-prompt-modal').style.display='none'" style="background:none; border:none; font-size:1.5rem; cursor:pointer;">&times;</button>
            </div>
            <p style="color:#64748b; margin-bottom:1rem;"><strong>Autor:</strong> ${escapeHtml(prompt.author || 'Anònim')}</p>
            <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:1rem; border-radius:8px; white-space:pre-wrap; font-family:monospace; font-size:0.875rem; margin-bottom:1.5rem; max-height:50vh; overflow-y:auto; color:#1e293b;">
                ${escapeHtml(prompt.body)}
            </div>
            <div style="display:flex; gap:10px; justify-content:flex-end;">
                <button class="btn-copy-card" style="padding:0.6rem 1.2rem;" onclick="copyText(\`${escapeJsString(prompt.body)}\`, this)">Copiar Prompt</button>
                <button class="btn-secondary" onclick="document.getElementById('view-prompt-modal').style.display='none'">Tancar</button>
            </div>
        </div>
    `;
    viewModal.style.display = 'flex';
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
