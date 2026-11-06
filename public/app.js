(() => {
  'use strict';
  const newIdeas = window.NEW_IDEAS || [];
  const groups = [...new Set(newIdeas.map(idea => idea.collection))].map(name => newIdeas.filter(idea => idea.collection === name));
  const mixed = [];
  for (let index = 0; index < Math.max(0, ...groups.map(group => group.length)); index++) groups.forEach(group => { if (group[index]) mixed.push(group[index]); });
  const ideas = [...mixed, ...window.IDEAS];
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const byId = id => ideas.find(idea => idea.id === id);
  const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const read = (key, fallback) => { try { const value = JSON.parse(localStorage.getItem(key)); return value == null ? fallback : value; } catch { return fallback; } };
  const write = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { showToast('Your browser could not save this on your device.'); return false; } };
  let saved = read('idea-shelf:saved:v1', []); if (!Array.isArray(saved)) saved = [];
  let notes = read('idea-shelf:notes:v1', {}); if (!notes || typeof notes !== 'object' || Array.isArray(notes)) notes = {};
  let filter = 'All', collection = 'All', query = '', visible = 9, lastRandom = null, activeIdea = null, lastFocused = null, briefIdea = null;
  const categories = ['All','Community','Campaign','Content','Branding','Creative'];
  const dialog = $('#idea-dialog');
  let toastTimer;
  function showToast(message) { const toast = $('#toast'); toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 3000); }
  function isSaved(id) { return saved.includes(id); }
  function renderCounts() { $$('[data-save-count]').forEach(node => node.textContent = saved.filter(id => byId(id)).length); }
  function heart(idea) { const yes = isSaved(idea.id); return `<button class="heart-btn ${yes ? 'is-saved' : ''}" data-save="${escapeHTML(idea.id)}" aria-label="${yes ? 'Remove' : 'Save'} ${escapeHTML(idea.title)} ${yes ? 'from' : 'to'} your shelf" aria-pressed="${yes}">${yes ? '♥' : '♡'}</button>`; }
  function artwork(idea, className = 'idea-cover') {
    return idea.image ? `<img class="${className}" src="${escapeHTML(idea.image)}" alt="" loading="lazy" decoding="async">` : `<div class="character sprite-${idea.sprite}" aria-hidden="true"></div>`;
  }
  function featureCard(idea) { return `<article class="feature-card tone-${idea.tone}"><div class="feature-art ${idea.image ? 'has-cover' : `sprite-${idea.sprite}`}" aria-hidden="true">${idea.image ? artwork(idea) : ''}</div><div class="feature-copy"><span class="chip">${escapeHTML(idea.category.toUpperCase())}</span><h3>${escapeHTML(idea.title)}</h3><p>${escapeHTML(idea.summary)}</p><button class="text-link card-save" data-open="${escapeHTML(idea.id)}">Open this idea →</button></div></article>`; }
  function card(idea) { const number = String(ideas.indexOf(idea) + 1).padStart(2, '0'); return `<article class="idea-card"><div class="idea-art tone-${idea.tone} ${idea.image ? 'has-cover' : ''}">${artwork(idea)}<span class="card-number" aria-hidden="true">NO. ${number}</span></div><div class="idea-card-body"><div class="card-meta"><span>${escapeHTML(idea.category.toUpperCase())}</span>${heart(idea)}</div><h3>${escapeHTML(idea.title)}</h3><p>${escapeHTML(idea.summary)}</p><div class="card-bottom"><button class="text-link" data-open="${escapeHTML(idea.id)}" aria-label="Open ${escapeHTML(idea.title)}">Open idea <span aria-hidden="true">→</span></button><small>${escapeHTML(idea.time)} IDEA</small></div></div></article>`; }
  function renderFeatures() { $('#featured-grid').innerHTML = ['question-wall','countdown','creative-recipe'].map(byId).filter(Boolean).map(featureCard).join(''); }
  function renderFilters() {
    $('#filters').innerHTML = categories.map(category => `<button class="filter-btn ${category === filter ? 'active' : ''}" data-filter="${category}" aria-pressed="${category === filter}">${category}</button>`).join('');
    $$('[data-collection]').forEach(button => { const selected = button.dataset.collection === collection; button.classList.toggle('is-selected', selected); button.setAttribute('aria-pressed', String(selected)); });
  }
  function renderIdeas() {
    const matching = ideas.filter(idea => (filter === 'All' || idea.category === filter) && (collection === 'All' || idea.collection === collection) && [idea.title,idea.category,idea.collection || '',idea.summary,idea.why,idea.example,...idea.steps].join(' ').toLowerCase().includes(query));
    $('#ideas-grid').innerHTML = matching.slice(0,visible).map(card).join('');
    $('#results-count').textContent = `${matching.length} ${matching.length === 1 ? 'IDEA' : 'IDEAS'} TO EXPLORE${collection === 'All' ? '' : ` · ${collection.toUpperCase()}`}`;
    $('#empty-results').hidden = matching.length !== 0;
    $('#load-more').hidden = matching.length <= visible;
  }
  function renderShelf() { const selected = saved.map(byId).filter(Boolean); $('#saved-grid').innerHTML = selected.map(card).join(''); $('#saved-empty').hidden = selected.length > 0; renderCounts(); }
  function renderAll() { renderFeatures(); renderFilters(); renderIdeas(); renderShelf(); }
  function toggleSaved(id) {
    if (!byId(id)) return;
    const existing = isSaved(id); const updated = existing ? saved.filter(item => item !== id) : [...saved, id];
    if (!write('idea-shelf:saved:v1', updated)) return;
    saved = updated; renderAll(); if (activeIdea && dialog.open) updateDialogSave();
    showToast(existing ? 'Removed from your shelf.' : 'A little idea for your shelf.');
  }
  function updateDialogSave() { const button = $('[data-dialog-save]', dialog); if (!button || !activeIdea) return; const yes = isSaved(activeIdea.id); button.textContent = yes ? '♥ Saved to your shelf' : '♡ Save to your shelf'; button.setAttribute('aria-pressed', String(yes)); }
  function openIdea(id, isSurprise = false) {
    const idea = byId(id); if (!idea) return;
    lastFocused = document.activeElement; activeIdea = idea;
    $('#dialog-body').innerHTML = `<div class="dialog-head tone-${idea.tone} ${idea.image ? 'with-cover' : ''}"><button class="dialog-close" data-close aria-label="Close idea">×</button><span class="chip">${escapeHTML(idea.category.toUpperCase())} ${isSurprise ? ' · A LITTLE SURPRISE ✦' : ''}</span><h2 id="dialog-title">${escapeHTML(idea.title)}</h2><span class="dialog-time">${escapeHTML(idea.time)} IDEA</span>${artwork(idea,'dialog-cover')}</div><div class="dialog-content"><p class="dialog-lede">${escapeHTML(idea.summary)}</p><h3>WHY IT’S A GOOD LITTLE IDEA</h3><p>${escapeHTML(idea.why)}</p><h3>TRY IT YOURSELF</h3><ol>${idea.steps.map(step => `<li>${escapeHTML(step)}</li>`).join('')}</ol><h3>PICTURE THIS</h3><p class="dialog-example">${escapeHTML(idea.example)}</p><h3>MAKE IT YOURS</h3><label class="note-label" for="idea-note">A thought to come back to? Jot it down here.</label><textarea id="idea-note" class="note-field" maxlength="2000" placeholder="A little note to yourself...">${escapeHTML(notes[id] || '')}</textarea><div class="dialog-actions"><button class="btn btn-red" data-dialog-save aria-pressed="${isSaved(id)}">${isSaved(id) ? '♥ Saved to your shelf' : '♡ Save to your shelf'}</button><button class="btn btn-outline" data-brief-from-idea>Make a brief →</button><button class="text-link" data-share>Share idea →</button></div></div>`;
    if (!dialog.open) { dialog.showModal(); document.body.classList.add('modal-open'); }
    $('[data-close]', dialog).focus();
  }
  function closeIdea() { if (dialog.open) dialog.close(); }
  dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); activeIdea = null; if (lastFocused && lastFocused.isConnected) lastFocused.focus(); });
  dialog.addEventListener('click', event => { if (event.target === dialog) closeIdea(); });
  dialog.addEventListener('input', event => { if (event.target.id === 'idea-note' && activeIdea) { notes[activeIdea.id] = event.target.value; write('idea-shelf:notes:v1', notes); } });
  function randomIdea() { let index = Math.floor(Math.random() * ideas.length); if (ideas.length > 1 && index === lastRandom) index = (index + 1 + Math.floor(Math.random() * (ideas.length - 1))) % ideas.length; lastRandom = index; openIdea(ideas[index].id, true); }
  function dailyIdea() { const now = new Date(); const localDay = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`; let hash = 0; for (const char of localDay) hash = (hash * 31 + char.charCodeAt(0)) >>> 0; openIdea(ideas[hash % ideas.length].id, true); }
  async function copyText(text, success) { try { await navigator.clipboard.writeText(text); showToast(success); } catch { const field = document.createElement('textarea'); field.value = text; field.style.position = 'fixed'; field.style.opacity = '0'; document.body.append(field); field.select(); try { if (!document.execCommand('copy')) throw new Error('copy failed'); showToast(success); } catch { showToast('Copy unavailable in this browser.'); } field.remove(); } }
  const brands = {cafe:'a neighborhood café',beauty:'a beauty brand',service:'a local service business',creator:'an independent creator',nonprofit:'a community organization'};
  const formats = ['a three-post mini campaign','a short launch post','a behind-the-scenes story','an audience question','a postcard-style email'];
  const goals = ['make the first step feel inviting','give someone a reason to respond','help a new customer understand the value','celebrate a detail people might miss'];
  const pick = values => values[Math.floor(Math.random() * values.length)];
  function showBriefIdea() { $('#brief-idea').textContent = briefIdea ? `STARTING WITH: ${briefIdea.title}` : 'STARTING WITH: A SURPRISE'; $('#clear-brief-idea').hidden = !briefIdea; }
  function generateBrief() {
    const selected = $('#brief-type').value; const brand = $('#brief-project').value.trim() || (selected === 'random' ? pick(Object.values(brands)) : brands[selected]);
    const audience = $('#brief-audience').value.trim() || 'people who would find this offer useful';
    const goal = $('#brief-goal').value.trim() || pick(goals);
    const format = $('#brief-format').value || pick(formats);
    const starting = briefIdea ? `${briefIdea.title}: ${briefIdea.summary}` : 'Choose one useful detail to build around.';
    const prompt = briefIdea ? briefIdea.steps[0] : 'Start with a real customer question or a detail worth sharing.';
    const result = `THE LITTLE CREATIVE BRIEF\n\nFor: ${brand}\nAudience: ${audience}\nGoal: ${goal}\nMake: ${format}\n\nStarting idea: ${starting}\nFirst step: ${prompt}\n\nBefore sharing: Check the details, make the next step clear, and choose one response or action to learn from.`;
    $('#brief-text').textContent = result; $('#brief-output').hidden = false;
    write('idea-shelf:brief:v1', {brand:selected, text:result, ideaId:briefIdea?.id || null, project:$('#brief-project').value, audience:$('#brief-audience').value, goal:$('#brief-goal').value, format:$('#brief-format').value});
  }
  function exportShelf() {
    const data = {kind:'the-idea-shelf-backup', version:1, saved, notes, brief:read('idea-shelf:brief:v1', null)};
    const blob = new Blob([JSON.stringify(data,null,2)], {type:'application/json'}); const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href = url; link.download = 'the-idea-shelf-backup.json'; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast('Your shelf backup is ready.');
  }
  async function importShelf(file) {
    if (!file) return;
    try {
      if (file.size > 500000) throw new Error('This backup is too large.');
      const data = JSON.parse(await file.text());
      if (data.kind !== 'the-idea-shelf-backup' || data.version !== 1 || !Array.isArray(data.saved) || !data.notes || typeof data.notes !== 'object' || Array.isArray(data.notes)) throw new Error('Choose an Idea Shelf backup file.');
      const incoming = data.saved.filter(id => typeof id === 'string' && byId(id));
      const mergedNotes = {...notes};
      for (const [id,value] of Object.entries(data.notes)) if (byId(id) && typeof value === 'string' && value.length <= 2000 && !mergedNotes[id]) mergedNotes[id] = value;
      const mergedSaved = [...new Set([...saved, ...incoming])];
      if (!write('idea-shelf:saved:v1', mergedSaved) || !write('idea-shelf:notes:v1', mergedNotes)) return;
      saved = mergedSaved; notes = mergedNotes;
      if (!read('idea-shelf:brief:v1', null) && data.brief && typeof data.brief.text === 'string' && data.brief.text.length < 10000 && write('idea-shelf:brief:v1', data.brief)) { restoreBrief(data.brief); showBriefIdea(); }
      renderAll(); showToast('Backup added. Existing notes were kept.');
    } catch (error) { showToast(error instanceof SyntaxError ? 'This file is not valid JSON.' : error.message || 'Could not read that backup.'); }
    finally { $('#import-shelf-file').value = ''; }
  }
  document.addEventListener('click', event => {
    const target = event.target.closest('button'); if (!target) return;
    if (target.matches('[data-open]')) openIdea(target.dataset.open);
    else if (target.matches('[data-save]')) {
      const id = target.dataset.save; const section = target.closest('#featured-grid, #ideas-grid, #saved-grid')?.id;
      toggleSaved(id); const replacement = section && document.getElementById(section).querySelector(`[data-save="${CSS.escape(id)}"]`);
      if (replacement) replacement.focus(); else if (section === 'saved-grid') { $('#shelf-heading').setAttribute('tabindex', '-1'); $('#shelf-heading').focus(); }
    }
    else if (target.matches('[data-dialog-save]') && activeIdea) toggleSaved(activeIdea.id);
    else if (target.matches('[data-brief-from-idea]') && activeIdea) { briefIdea = activeIdea; showBriefIdea(); closeIdea(); $('#club').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'}); setTimeout(() => $('#brief-audience').focus({preventScroll:true}), 50); }
    else if (target.matches('[data-close]')) closeIdea();
    else if (target.matches('[data-open-random]')) randomIdea();
    else if (target.matches('[data-open-daily]')) dailyIdea();
    else if (target.matches('[data-filter]')) { filter = target.dataset.filter; collection = 'All'; visible = 9; renderFilters(); renderIdeas(); $(`[data-filter="${CSS.escape(filter)}"]`).focus(); }
    else if (target.matches('[data-collection]')) { collection = target.dataset.collection; filter = 'All'; query = ''; $('#search').value = ''; visible = 9; renderFilters(); renderIdeas(); $('#explore').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'}); }
    else if (target.id === 'load-more') { visible += 9; renderIdeas(); }
    else if (target.id === 'generate-brief') generateBrief();
    else if (target.id === 'clear-brief-idea') { briefIdea = null; showBriefIdea(); }
    else if (target.id === 'copy-brief') copyText($('#brief-text').textContent, 'Your brief is copied. Go make something!');
    else if (target.id === 'export-shelf') exportShelf();
    else if (target.id === 'import-shelf') $('#import-shelf-file').click();
    else if (target.matches('[data-share]') && activeIdea) { const url = new URL(location.href); url.search = ''; url.searchParams.set('idea', activeIdea.id); url.hash = ''; copyText(url.toString(), 'Idea link copied. Pass it along!'); }
    else if (target.matches('.menu-toggle')) { const menu = $('#mobile-nav'); const opened = target.getAttribute('aria-expanded') === 'true'; target.setAttribute('aria-expanded', String(!opened)); target.setAttribute('aria-label', opened ? 'Open menu' : 'Close menu'); menu.hidden = opened; }
  });
  $('#import-shelf-file').addEventListener('change', event => importShelf(event.target.files[0]));
  $('#mobile-nav').addEventListener('click', event => { if (event.target.closest('a')) { $('#mobile-nav').hidden = true; $('.menu-toggle').setAttribute('aria-expanded', 'false'); $('.menu-toggle').setAttribute('aria-label', 'Open menu'); } });
  $('#search').addEventListener('input', event => { query = event.target.value.trim().toLowerCase(); visible = 9; renderIdeas(); });
  window.addEventListener('storage', event => { if (event.key === 'idea-shelf:saved:v1') { saved = read('idea-shelf:saved:v1', []); if (!Array.isArray(saved)) saved = []; renderAll(); } if (event.key === 'idea-shelf:notes:v1') { const next = read('idea-shelf:notes:v1', {}); if (next && typeof next === 'object' && !Array.isArray(next)) notes = next; } });
  function restoreBrief(brief) {
    if (!brief || typeof brief.text !== 'string') return;
    $('#brief-type').value = Object.hasOwn(brands, brief.brand) || brief.brand === 'random' ? brief.brand : 'random';
    $('#brief-text').textContent = brief.text; $('#brief-output').hidden = false;
    $('#brief-project').value = typeof brief.project === 'string' ? brief.project.slice(0,140) : '';
    $('#brief-audience').value = typeof brief.audience === 'string' ? brief.audience.slice(0,140) : '';
    $('#brief-goal').value = typeof brief.goal === 'string' ? brief.goal.slice(0,140) : '';
    $('#brief-format').value = typeof brief.format === 'string' ? brief.format : '';
    briefIdea = byId(brief.ideaId) || null;
  }
  restoreBrief(read('idea-shelf:brief:v1', null));
  $('#total-ideas').textContent = ideas.length;
  showBriefIdea(); renderAll();
  const initialIdea = new URLSearchParams(location.search).get('idea'); if (initialIdea && byId(initialIdea)) openIdea(initialIdea);
})();
