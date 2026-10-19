'use strict';

// Single quiz (with its words)
async function getQuiz(id) {
    return apiGet('/api/quizzes/' + encodeURIComponent(id));
}

async function createQuiz(body) {
    return apiPost('/api/quizzes', body);
}

async function updateQuiz(id, body) {
    return apiPut('/api/quizzes/' + encodeURIComponent(id), body);
}

async function deleteQuiz(id) {
    return apiDelete('/api/quizzes/' + encodeURIComponent(id));
}

// Add a word to a quiz
async function addWordToQuiz(quizId, wordRef) {
    return apiPost('/api/quizzes/' + encodeURIComponent(quizId) + '/words', { word: wordRef });
}

// Remove a word from a quiz
async function removeWordFromQuiz(quizId, wordId) {
    return apiDelete('/api/quizzes/' + encodeURIComponent(quizId) + '/words/' + encodeURIComponent(wordId));
}

// Export a quiz
async function handleExport(quizId) {
    setStatus('Exportation du quiz en cours...', 'info');
    try {
        await apiPut('/api/quizzes/' + encodeURIComponent(quizId) + '/export');
        setStatus('Quiz exporté avec succès !', 'ok');
    } catch (err) {
        setStatus(`Erreur lors de l'exportation : ${err.message}`, 'error');
    }
}

// Search words (used by the word-add modal)
async function searchWords(prefix, language) {
    const params = new URLSearchParams();
    if (prefix) params.set('starts', prefix);
    params.set('language', language);
    const data = await apiGet('/api/search/?' + params.toString());
    return Array.isArray(data) ? data : [];
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

let expandedQuizzes = new Set();

function renderQuizzes(quizzes) {
    tbody.innerHTML = '';

    if (!quizzes || quizzes.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" class="empty">Aucun quiz trouvé.</td></tr>';
      return;
    }

    quizzes.sort((a, b) => (a.name || '').localeCompare(b.name || '', undefined, { numeric: true }));

    quizzes.forEach(quiz => {
      const words = quiz.words || [];
      const tr = document.createElement('tr');
      tr.className = 'quiz-row';
      tr.dataset.quiz = quiz.id;
      tr.dataset.expanded = expandedQuizzes.has(quiz.id) ? 'true' : 'false';

      tr.innerHTML = `
        <td class="quiz-main">
          <button class="expand-btn" data-expand="${escapeHtml(quiz.id)}">
            ${expandedQuizzes.has(quiz.id) ? '▾' : '▸'} ${escapeHtml(quiz.name)}
          </button>
        </td>
        <td>${escapeHtml(quiz.author)}</td>
        <td>${words.length}</td>
        <td>
          <div class="actions-cell">
            <button class="btn-sm primary" data-edit="${escapeHtml(quiz.id)}">Modifier</button>
            <button class="btn-sm danger" data-delete="${escapeHtml(quiz.id)}">Supprimer</button>
            <button class="btn-sm info" data-export="${escapeHtml(quiz.id)}">Exporter</button>
          </div>
        </td>
      `;

      // Detail row (words list), hidden by default
      const detail = document.createElement('tr');
      detail.className = 'quiz-detail';
      detail.dataset.quiz = quiz.id;
      detail.hidden = true;
      detail.innerHTML = `
        <td class="words-detail">
          <table>
            <thead>
              <tr>
                <th>Abenaki</th>
                <th>Français</th>
                <th>Type</th>
                <th>Source</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr><td colspan="5" class="empty">Ce quiz ne contient aucun mot. Cliquez sur <strong>Ajouter un mot</strong>.</td></tr>
            </tbody>
          </table>
          <div class="add-word-row">
            <button class="btn-sm primary" data-add-word="${escapeHtml(quiz.id)}">＋ Ajouter un mot</button>
          </div>
        </td>
      `;

      tbody.appendChild(tr);
      tbody.appendChild(detail);

      if (expandedQuizzes.has(quiz.id)) {
        detail.hidden = false;
        fillWords(detail, quiz.id, words);
      }
    });
}

function fillWords(detail, quizId, words) {
    const tbodyEl = detail.querySelector('tbody');
    tbodyEl.innerHTML = '';
    words.forEach(word => {
      const tr = document.createElement('tr');
      tr.dataset.wordId = word.id;
      tr.innerHTML = `
        <td><strong>${escapeHtml(word.abenaki)}</strong></td>
        <td>${escapeHtml(word.french)}</td>
        <td>${escapeHtml(word.type || '—')}</td>
        <td>${escapeHtml(word.source || '—')}</td>
        <td>
          <div class="actions-cell">
            <button class="btn-sm danger" data-quiz="${escapeHtml(quizId)}" data-remove="${escapeHtml(word.id)}">Retirer</button>
          </div>
        </td>
      `;
      tbodyEl.appendChild(tr);
    });
}

async function toggleExpand(id) {
    const row = tbody.querySelector(`tr.quiz-row[data-quiz="${escapeHtml(id)}"]`);
    const detail = tbody.querySelector(`tr.quiz-detail[data-quiz="${escapeHtml(id)}"]`);
    if (!row || !detail) return;

    const isExpanded = expandedQuizzes.has(id);
    if (isExpanded) {
        expandedQuizzes.delete(id);
        row.dataset.expanded = 'false';
        detail.hidden = true;
        return;
    }

    expandedQuizzes.add(id);
    setStatus('Chargement des mots…');
    try {
        const quiz = await getQuiz(id);
        row.dataset.expanded = 'true';
        detail.hidden = false;
        fillWords(detail, id, quiz.words || []);
        setStatus(`Affichage de ${quiz.words.length} mot${quiz.words.length === 1 ? '' : 's'}.`, 'ok');
    } catch (err) {
        setStatus(err.message, 'error');
        detail.hidden = true;
    }
}

// ---------------------------------------------------------------------------
// Quiz add / edit modal
// ---------------------------------------------------------------------------

const modal = document.getElementById('quizModalBackdrop');
const modalForm = document.getElementById('quizForm');
const modalTitle = document.getElementById('quizModalTitle');
const modalCancel = document.getElementById('quizModalCancel');

function openAddModal() {
    modalTitle.textContent = 'Créer un quiz';
    modalForm.querySelector('#saveBtn').textContent = 'Créer';
    modalCancel.style.display = 'none';
    modalForm.reset();
    document.getElementById('quizId').value = '';
    modal.classList.add('open');
    document.getElementById('name').focus();
}

async function openEditModal(id) {
    setStatus('Chargement du quiz…');
    try {
        const quiz = await getQuiz(id);
        modalTitle.textContent = 'Modifier le quiz';
        modalForm.querySelector('#saveBtn').textContent = 'Mettre à jour';
        modalCancel.style.display = 'inline-block';
        document.getElementById('quizId').value = quiz.id;
        document.getElementById('name').value = quiz.name || '';
        document.getElementById('author').value = quiz.author || '';
        modal.classList.add('open');
    } catch (err) {
        setStatus(err.message, 'error');
    }
}

function closeModal() {
    modal.classList.remove('open');
    modalForm.reset();
    document.getElementById('quizId').value = '';
    modalCancel.style.display = 'none';
}

modalForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('quizId').value;
    const payload = {
        name: document.getElementById('name').value.trim(),
        author: document.getElementById('author').value.trim()
    };

    setStatus('Enregistrement…');
    try {
        if (id) {
            await updateQuiz(id, payload);
            setStatus(`Quiz ${id} mis à jour.`, 'ok');
        } else {
            await createQuiz(payload);
            setStatus('Quiz créé.', 'ok');
        }
        await refresh();
        closeModal();
    } catch (err) {
        setStatus(err.message, 'error');
    }
});

async function handleDelete(id) {
    if (!confirm('Supprimer ce quiz et tous ses mots ?')) return;
    try {
        await deleteQuiz(id);
        setStatus(`Quiz ${id} supprimé.`, 'ok');
        expandedQuizzes.delete(id);
        await refresh();
    } catch (err) {
        setStatus(err.message, 'error');
    }
}

// ---------------------------------------------------------------------------
// Word add modal
// ---------------------------------------------------------------------------

const wordModal = document.getElementById('wordModalBackdrop');
const wordForm = document.getElementById('wordForm');

function openWordModal(quizId) {
    document.getElementById('wordQuizId').value = quizId;
    document.getElementById('wordSelectedId').value = '';
    document.getElementById('wordSearch').value = '';
    document.getElementById('wordLang').value = 'abenaki';
    document.getElementById('wordResults').innerHTML = '';
    wordModal.classList.add('open');
    document.getElementById('wordSearch').focus();
}

function closeModalWord() {
    wordModal.classList.remove('open');
    document.getElementById('wordSearch').value = '';
    document.getElementById('wordResults').innerHTML = '';
}

function renderWordResults(words) {
    const container = document.getElementById('wordResults');
    container.innerHTML = '';
    if (!words.length) {
        container.innerHTML = '<div class="empty">Aucun mot trouvé.</div>';
        return;
    }
    words.sort((a, b) => (a.abenaki || '').localeCompare(b.abenaki || '', undefined, { numeric: true }));
    words.forEach(word => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'word-result';
        btn.innerHTML = `<strong>${escapeHtml(word.abenaki)}</strong> — ${escapeHtml(word.french)} <em class="word-type">(${escapeHtml(word.type || '')})</em>`;
        btn.addEventListener('click', () => {
            document.getElementById('wordSearch').value = word.abenaki;
            document.getElementById('wordSelectedId').value = word.id;
            renderWordResults([]);
            setStatus(`Sélection: ${word.abenaki} (${word.french})`, 'ok');
        });
        container.appendChild(btn);
    });
}

wordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const quizId = document.getElementById('wordQuizId').value;
    const selectedId = document.getElementById('wordSelectedId').value;

    setStatus('Ajout du mot…');
    try {
        // wordRef can be the word's id (string) or the search text; the server resolves it.
        await addWordToQuiz(quizId, selectedId || document.getElementById('wordSearch').value.trim());
        setStatus('Mot ajouté au quiz.', 'ok');
        closeModalWord();
        await refresh();
        await refreshDetail(quizId);
    } catch (err) {
        setStatus(err.message, 'error');
    }
});

async function refreshDetail(quizId) {
    const detail = tbody.querySelector(`tr.quiz-detail[data-quiz="${escapeHtml(quizId)}"]`);
    if (!detail) return;
    detail.hidden = false;
    detail.querySelector('tbody').innerHTML = '';
    try {
        const quiz = await getQuiz(quizId);
        fillWords(detail, quizId, quiz.words || []);
        setStatus(`Affichage de ${quiz.words.length} mot${quiz.words.length === 1 ? '' : 's'}.`, 'ok');
    } catch (err) {
        setStatus(err.message, 'error');
    }
}

async function handleRemoveWord(quizId, wordId) {
    if (!confirm('Retirer ce mot du quiz ?')) return;
    try {
        await removeWordFromQuiz(quizId, wordId);
        setStatus('Mot retiré du quiz.', 'ok');
        await refresh();
        await refreshDetail(quizId);
    } catch (err) {
        setStatus(err.message, 'error');
    }
}

// Word search (debounced)
let typingTimer;
document.getElementById('wordSearch').addEventListener('input', () => {
    clearTimeout(typingTimer);
    const search = document.getElementById('wordSearch').value.trim();
    if (!search) {
        document.getElementById('wordResults').innerHTML = '';
        return;
    }
    typingTimer = setTimeout(async () => {
        try {
            const words = await searchWords(search, document.getElementById('wordLang').value);
            renderWordResults(words);
        } catch (err) {
            document.getElementById('wordResults').innerHTML = '<div class="error">' + escapeHtml(err.message) + '</div>';
        }
    }, 300);
});

// ---------------------------------------------------------------------------
// Wiring
// ---------------------------------------------------------------------------

document.getElementById('listBtn').addEventListener('click', refresh);
document.getElementById('addBtn').addEventListener('click', openAddModal);

document.getElementById('quizModalClose').addEventListener('click', closeModal);
modalCancel.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

document.getElementById('wordModalClose').addEventListener('click', closeModalWord);
wordModalCancel.addEventListener('click', closeModalWord);
wordModal.addEventListener('click', (e) => { if (e.target === wordModal) closeModalWord(); });

// Table interactions
tbody.addEventListener('click', (e) => {
    const target = e.target;
    const quizId = target.getAttribute('data-quiz');
    const expandId = target.getAttribute('data-expand');
    const editId = target.getAttribute('data-edit');
    const deleteId = target.getAttribute('data-delete');
    const addWordId = target.getAttribute('data-add-word');
    const removeWordId = target.getAttribute('data-remove');
    const exportId = target.getAttribute('data-export'); // NEW: Handle Export

    if (target.classList.contains('expand-btn') && expandId) {
        toggleExpand(expandId);
        return;
    }
    if (target.classList.contains('danger')) {
        if (deleteId) handleDelete(deleteId);
        else if (removeWordId)
        {
            //let quizId = document.getElementById('quizId').value;
            handleRemoveWord(quizId, removeWordId);
        }
        return;
    }
    if (target.classList.contains('primary') && editId) {
        openEditModal(editId);
        return;
    }
    if (target.classList.contains('primary') && addWordId) {
        openWordModal(addWordId);
        return;
    }
    if (target.classList.contains('info') && exportId) { // NEW: Handle Export button click
        handleExport(exportId);
        return;
    }
});

// List refresh (debounced typing)
let listTimer;
document.getElementById('authorFilter').addEventListener('input', () => {
    clearTimeout(listTimer);
    listTimer = setTimeout(refresh, 300);
});

async function refresh() {
    const author = document.getElementById('authorFilter').value.trim();
    setStatus('Chargement des quiz…');
    try {
        const data = await apiGet('/api/quizzes' + (author ? '?author=' + encodeURIComponent(author) : ''));
        renderQuizzes(data);
        setStatus(`Affichage de ${data.length} quiz.`, 'ok');
    } catch (err) {
        setStatus(err.message, 'error');
    }
}
