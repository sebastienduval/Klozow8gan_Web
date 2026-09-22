// ---------------------------------------------------------------------------
// API helpers
// ---------------------------------------------------------------------------
//const API = 'http://klozow8gan.ddns.net';
const API = 'http://localhost:3000';

async function apiGet(path) {
    const res = await fetch(API + path);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `La requête a échoué (${res.status})`);
    return data;
}

async function apiDelete(path) {
    const res = await fetch(API + path, { method: 'DELETE' });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `La requête a échoué (${res.status})`);
    return data;
}

async function getWord(id) {
    return apiGet('/api/words/' + encodeURIComponent(id));
}

async function addWord(body) {
    const res = await fetch(API + '/api/words', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `La requête a échoué (${res.status})`);
    return data;
}

async function updateWord(id, body) {
    const res = await fetch(API + '/api/words/' + encodeURIComponent(id), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `La requête a échoué (${res.status})`);
    return data;
}

async function deleteWord(id) {
    return apiDelete('/api/words/' + encodeURIComponent(id));
}

// Fetch a range of ids by hitting GET /api/words/:id for each.
async function loadRange(from, to) {
    const ids = [];
    let n = parseInt(from, 10);
    let m = parseInt(to, 10);
    if (isNaN(n)) n = 0;
    if (isNaN(m)) m = 0;
    if (n > m) [n, m] = [m, n]; // allow "to-from"

    const results = [];
    await Promise.all(
      Array.from({ length: m - n + 1 }, (_, i) => n + i)
        .map(async (id) => {
          try { results.push(await getWord(id)); }
          catch (e) { /* skip missing ids */ }
        })
    );
    return results;
}

// ---------------------------------------------------------------------------
// UI helpers
// ---------------------------------------------------------------------------
const statusEl = document.getElementById('status');
const tbody = document.getElementById('wordsBody');

function setStatus(msg, kind) {
    statusEl.textContent = msg || '';
    statusEl.className = 'status' + (kind ? ' ' + kind : '');
}

function renderWords(words) {
    tbody.innerHTML = '';

    if (!words || words.length === 0) {
      tbody.innerHTML = '<tr><td colspan="8" class="empty">Aucun mot trouvé.</td></tr>';
      return;
    }

    words.sort((a, b) => a.id - b.id);

    words.forEach(word => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span class="id-chip">${word.id}</span></td>
        <td><strong>${escapeHtml(word.abenaki)}</strong></td>
        <td>${escapeHtml(word.french)}</td>
        <td>${escapeHtml(word.type)}</td>
        <td>${escapeHtml(word.source || '—')}</td>
        <td>${escapeHtml(word.alternative_source || '—')}</td>
        <td>${escapeHtml(word.infinitive || '—')}</td>
        <td>
          <div class="actions-cell">
            <button class="btn-sm primary" data-edit="${word.id}">Modifier</button>
            <button class="btn-sm danger" data-delete="${word.id}">Supprimer</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
}

function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------
function refresh() {
    const starts = document.getElementById('starts').value.trim();
    const ends = document.getElementById('ends').value.trim();
    const language = document.getElementById('language').value;    
    const input = document.getElementById('idRange').value.trim();

    if (starts || ends || !input) 
    {
      const params = new URLSearchParams();
      if (starts) params.set('starts', starts);
      if (ends) params.set('ends', ends);
      if (language) 
      {
        params.set('language', language);
      }
      setStatus('Chargement des résultats…');
      getSearchResults().then(
        words => {
          renderWords(words);
          setStatus(`Affichage de ${words.length} mot${words.length === 1 ? '' : 's'}.`, 'ok');
        },
        err => { setStatus(err.message, 'error'); }
      );
    } 
    else 
    {
      if ( input )
      {
        loadByRange();
      }
      else
      {
        renderWords([]);
        setStatus('Entrez un terme de recherche ou une plage d\'ID pour charger des mots.', '');
      }
    }
}

// Parse "1–20" or "1-20" or "20-1"
function parseRange(input) {
    const m = String(input).match(/-?\s*\d+\s*[-–—]\s*-?\s*\d+/);
    if (!m) return null;
    const [str] = m;
    const parts = str.split(/[-–—]\s*/).map(s => parseInt(s.trim(), 10));
    if (parts.some(isNaN) || parts.length !== 2) return null;
    return parts;
}

async function loadByRange() {
    let input = document.getElementById('idRange').value.trim();
    let parsed = parseRange(input);
    if (!parsed) 
    {
      let id = parseInt(input);
      if ( !id )
      {
        setStatus('Entrez une plage comme « 1–20 » (par ex. 1–50).', 'error');
        return;
      }
      parsed = [id, id];
    }
    setStatus(`Chargement des ids ${Math.min(...parsed)}–${Math.max(...parsed)}…`);
    try {
      const words = await loadRange(parsed[0], parsed[1]);
      renderWords(words);
      setStatus(`Chargés ${words.length} mot${words.length === 1 ? '' : 's'}.`, 'ok');
    } catch (err) {
      setStatus(err.message, 'error');
    }
}  

async function getSearchResults() 
  {
    const params = new URLSearchParams();
    const starts = document.getElementById('starts').value.trim();
    const ends = document.getElementById('ends').value.trim();
    const language = document.getElementById('language').value;
    if (language) params.set('language', language);

    if (starts || ends) 
    {
      if (starts) params.set('starts', starts);
      if (ends) params.set('ends', ends);
    }

    const data = await apiGet('/api/search/?' + params.toString());
    return Array.isArray(data) ? data : [];
  }

// ---------------------------------------------------------------------------
// Modal: add / edit
// ---------------------------------------------------------------------------
const modal = document.getElementById('modalBackdrop');
const form = document.getElementById('wordForm');
const modalTitle = document.getElementById('modalTitle');
const saveBtn = document.getElementById('saveBtn');
const addBtn = document.getElementById('modalCancel');

function openAddModal() {
    modalTitle.textContent = 'Ajouter un mot';
    saveBtn.textContent = 'Ajouter';
    addBtn.style.display = 'none';
    form.reset();
    document.getElementById('wordId').value = '';
    modal.classList.add('open');
    document.getElementById('abenaki').focus();
}

async function openEditModal(id) {
    setStatus('Chargement du mot…');
    try {
      const word = await getWord(id);
      modalTitle.textContent = 'Modifier le mot';
      saveBtn.textContent = 'Mettre à jour';
      addBtn.style.display = 'inline-block';
      document.getElementById('wordId').value = word.id;
      document.getElementById('abenaki').value = word.abenaki || '';
      document.getElementById('french').value = word.french || '';
      document.getElementById('type').value = word.type || '';
      document.getElementById('source').value = word.source || '';
      document.getElementById('alternative_source').value = word.alternative_source || '';
      document.getElementById('infinitive').value = word.infinitive || '';
      modal.classList.add('open');
    } catch (err) {
      setStatus(err.message, 'error');
    }
}

function closeModal() {
    modal.classList.remove('open');
    form.reset();
    document.getElementById('wordId').value = '';
    addBtn.style.display = 'none';
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('wordId').value;
    const payload = {
      abenaki: document.getElementById('abenaki').value.trim(),
      french: document.getElementById('french').value.trim(),
      type: document.getElementById('type').value.trim(),
      source: document.getElementById('source').value.trim(),
      alternative_source: document.getElementById('alternative_source').value.trim(),
      infinitive: document.getElementById('infinitive').value.trim()
    };

    setStatus('Enregistrement…');
    try {
      if (id) {
        await updateWord(id, payload);
        setStatus(`Mot ${id} mis à jour.`, 'ok');
      } else {
        const created = await addWord(payload);
        renderWords([]);
        await getSearchResults().then(renderWords);
        setStatus(`Mot ajouté (id ${created.word_id}).`, 'ok');
      }
      closeModal();
    } catch (err) {
      setStatus(err.message, 'error');
    }
});

async function handleDelete(id) {
    if (!confirm('Supprimer ce mot?')) return;
    try {
      await deleteWord(id);
      setStatus(`Mot ${id} supprimé.`, 'ok');
      renderWords([]);
      await getSearchResults().then(renderWords);
    } catch (err) {
      setStatus(err.message, 'error');
    }
}

// ---------------------------------------------------------------------------
// Wiring
// ---------------------------------------------------------------------------
document.getElementById('searchBtn').addEventListener('click', refresh);
document.getElementById('addBtn').addEventListener('click', openAddModal);

document.getElementById('modalClose').addEventListener('click', closeModal);
addBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

tbody.addEventListener('click', (e) => {
    const id = e.target.getAttribute('data-edit') || e.target.getAttribute('data-delete');
    if (id === undefined) return;
    if (e.target.classList.contains('danger')) handleDelete(id);
    else openEditModal(id);
});

// Live search as you type (debounced)
let typingTimer;
['starts', 'ends'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(refresh, 400);
    });
});
document.getElementById('language').addEventListener('change', refresh);
