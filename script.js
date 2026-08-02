// 1. CONFIGURACIÓ DE SUPABASE I CORREUS DE REVISIÓ
const SUPABASE_URL = 'https://amswkfdhwashotagrhfo.supabase.co';
const SUPABASE_KEY = 'sb_publishable_J-PhmX7Awpb8UwDYXhYwWg_iISrccBy';
const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

// --- DADES D'EXEMPLE I ESTAT LOCAL ---
let allPrompts = [];

// --- ELEMENTS DEL DOM ---
const promptsContainer = document.getElementById('prompts-container');
const searchInput = document.getElementById('search-input');
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

// --- CARREGA DE PROMPTS ---
async function fetchPrompts() {
    if (supabaseClient) {
        try {
            const { data, error } = await supabaseClient
                .from('prompts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            if (data) {
                allPrompts = data;
                renderPrompts(allPrompts);
                return;
            }
        } catch (err) {
            console.warn('Error carregant de Supabase, usant dades de mostra:', err);
        }
    }

    // Dades de reserva si no hi ha connexió amb la base de dades
    allPrompts = [
        {
            id: 1,
            title: "Anàlisi d'usos lingüístics municipals",
            author: "Equip LlenguAI",
            type: "socioling",
            category: "municipi",
            body: "Actua com un sociolingüista expert. Analitza la situació dels usos lingüístics en l'àmbit municipal indicat..."
        },
        {
            id: 2,
            title: "Unitat didàctica sobre la variació dialectal",
            author: "Equip LlenguAI",
            type: "dl",
            category: "secundaria",
            body: "Crea una seqüència didàctica de 3 sessions per a alumnes de secundària centrada en reconéixer les variants dialectals..."
        },
        {
            id: 3,
            title: "Avaluació de la competència escrita (Nivell C1)",
            author: "Equip LlenguAI",
            type: "nl",
            category: "c1",
            body: "Genera una rúbrica d'avaluació detallada per a corregir un text d'opinió corresponent al nivell C1..."
        }
    ];

    renderPrompts(allPrompts);
}

// --- RENDERING DE PROMPTS ---
function renderPrompts(prompts) {
    if (!promptsContainer) return;
    promptsContainer.innerHTML = '';

    if (prompts.length === 0) {
        promptsContainer.innerHTML = '<p style="color: #64748b; grid-column: 1/-1;">No s\'han trobat prompts que coincidisquen amb la cerca.</p>';
        return;
    }

    prompts.forEach(prompt => {
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

        card.innerHTML = `
            <div class="prompt-header">
                <span class="prompt-badge ${badgeClass}">${badgeLabel}</span>
                <h3>${escapeHtml(prompt.title)}</h3>
                <div class="prompt-author">Per: ${escapeHtml(prompt.author || 'Anònim')}</div>
            </div>
            <div class="prompt-body">
                <pre>${escapeHtml(prompt.body)}</pre>
            </div>
            <button class="btn-copy" onclick="copyToClipboard(\`${escapeJsString(prompt.body)}\`, this)">Copiar Prompt</button>
        `;

        promptsContainer.appendChild(card);
    });
}

// --- ESDEVENIMENTS ---
function setupEventListeners() {
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = allPrompts.filter(p => 
                p.title.toLowerCase().includes(query) ||
                p.body.toLowerCase().includes(query) ||
                (p.author && p.author.toLowerCase().includes(query))
            );
            renderPrompts(filtered);
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
                    console.error('Error afegint prompt a Supabase:', err);
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

    // Selector d'idioma
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

// --- FUNCIONS D'UTILITAT ---
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
        console.error('Error en copiar al porta-retalls:', err);
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
