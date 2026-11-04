(() => {
  'use strict';
  const ideas = window.IDEAS;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const byId = id => ideas.find(idea => idea.id === id);
  const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const read = (key, fallback) => { try { const value = JSON.parse(localStorage.getItem(key)); return value == null ? fallback : value; } catch { return fallback; } };
  const write = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { showToast('Your browser could not save this on your device.'); } };
  let saved = read('idea-shelf:saved:v1', []); if (!Array.isArray(saved)) saved = [];
  let notes = read('idea-shelf:notes:v1', {}); if (!notes || typeof notes !== 'object' || Array.isArray(notes)) notes = {};
  let filter = 'All', query = '', visible = 9, lastRandom = null, activeIdea = null, lastFocused = null;
  const categories = ['All','Community','Campaign','Content','Branding','Creative'];
  const dialog = $('#idea-dialog');
  let toastTimer;
  function showToast(message) { const toast = $('#toast'); toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2600); }
  function isSaved(id) { return saved.includes(id); }
  function renderCounts() { $$('[data-save-count]').forEach(node => node.textContent = saved.length); }
  function heart(id) { const yes = isSaved(id); return `<button class="heart-btn ${yes ? 'is-saved' : ''}" data-save="${escapeHTML(id)}" aria-label="${yes ? 'Remove from' : 'Save to'} your shelf" aria-pressed="${yes}">${yes ? '♥' : '♡'}</button>`; }
  function featureCard(idea) { return `<article class="feature-card tone-${idea.tone}"><div class="feature-art sprite-${idea.sprite}" aria-hidden="true"></div><div class="feature-copy"><span class="chip">${escapeHTML(idea.category.toUpperCase())}</span><h3>${escapeHTML(idea.title)}</h3><button class="text-link card-save" data-open="${escapeHTML(idea.id)}">Open this idea ↗</button><br><button class="text-link card-save" data-save="${escapeHTML(idea.id)}" aria-pressed="${isSaved(idea.id)}">${isSaved(idea.id) ? '♥ Saved to shelf' : '♡ Save to shelf'}</button></div></article>`; }
  function card(idea) { return `<article class="idea-card"><div class="idea-art tone-${idea.tone}"><div class="character sprite-${idea.sprite}" aria-hidden="true"></div></div><div class="idea-card-body"><div class="card-meta"><span>${escapeHTML(idea.category.toUpperCase())}</span>${heart(idea.id)}</div><h3>${escapeHTML(idea.title)}</h3><p>${escapeHTML(idea.summary)}</p><div class="card-bottom"><button class="text-link" data-open="${escapeHTML(idea.id)}">Open idea ↗</button><small>${escapeHTML(idea.time)} IDEA</small></div></div></article>`; }
  function renderFeatures() { $('#featured-grid').innerHTML = ideas.slice(0,3).map(featureCard).join(''); }
  function renderFilters() { $('#filters').innerHTML = categories.map(category => `<button class="filter-btn ${category === filter ? 'active' : ''}" data-filter="${category}" aria-pressed="${category === filter}">${category}</button>`).join(''); }
  function renderIdeas() {
    const matching = ideas.filter(idea => (filter === 'All' || idea.category === filter) && [idea.title,idea.category,idea.summary,idea.why,idea.example].join(' ').toLowerCase().includes(query));
    $('#ideas-grid').innerHTML = matching.slice(0,visible).map(card).join('');
    $('#results-count').textContent = `${matching.length} ${matching.length === 1 ? 'IDEA' : 'IDEAS'} TO EXPLORE`;
    $('#empty-results').hidden = matching.length !== 0;
    $('#load-more').hidden = matching.length <= visible;
  }
  function renderShelf() {
    const collection = saved.map(byId).filter(Boolean);
    $('#saved-grid').innerHTML = collection.map(card).join('');
    $('#saved-empty').hidden = collection.length > 0;
    renderCounts();
  }
  function renderAll() { renderFeatures(); renderFilters(); renderIdeas(); renderShelf(); }
  function toggleSaved(id) {
    if (!byId(id)) return;
    const existing = isSaved(id); saved = existing ? saved.filter(item => item !== id) : [...saved, id];
    write('idea-shelf:saved:v1', saved); renderAll();
    if (activeIdea && dialog.open) updateDialogSave();
    showToast(existing ? 'Removed from your shelf.' : 'A little idea for your shelf.');
  }
  function updateDialogSave() { const button = $('[data-dialog-save]', dialog); if (!button || !activeIdea) return; const yes = isSaved(activeIdea.id); button.textContent = yes ? '♥ Saved to your shelf' : '♡ Save to your shelf'; button.setAttribute('aria-pressed', String(yes)); }
  function openIdea(id, isSurprise = false) {
    const idea = byId(id); if (!idea) return;
    lastFocused = document.activeElement; activeIdea = idea;
    $('#dialog-body').innerHTML = `<div class="dialog-head tone-${idea.tone}"><button class="dialog-close" data-close aria-label="Close idea">×</button><span class="chip">${escapeHTML(idea.category.toUpperCase())} ${isSurprise ? ' · A LITTLE SURPRISE ✦' : ''}</span><h2 id="dialog-title">${escapeHTML(idea.title)}</h2><div class="character sprite-${idea.sprite}" aria-hidden="true"></div></div><div class="dialog-content"><p class="dialog-lede">${escapeHTML(idea.summary)}</p><h3>WHY IT’S A GOOD LITTLE IDEA</h3><p>${escapeHTML(idea.why)}</p><h3>TRY IT YOURSELF</h3><ol>${idea.steps.map(step => `<li>${escapeHTML(step)}</li>`).join('')}</ol><h3>PICTURE THIS</h3><p class="dialog-example">${escapeHTML(idea.example)}</p><h3>MAKE IT YOURS</h3><label class="note-label" for="idea-note">A thought to come back to? Jot it down here.</label><textarea id="idea-note" class="note-field" maxlength="2000" placeholder="A little note to yourself...">${escapeHTML(notes[id] || '')}</textarea><div class="dialog-actions"><button class="btn btn-red" data-dialog-save aria-pressed="${isSaved(id)}">${isSaved(id) ? '♥ Saved to your shelf' : '♡ Save to your shelf'}</button><button class="btn btn-outline" data-share>Share this idea ↗</button></div></div>`;
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
  const formats = ['a three-post mini campaign','a short, imaginative launch post','a friendly behind-the-scenes story','an interactive audience question','a tiny postcard-style email'];
  const twists = ['make one overlooked detail the star','let the audience help choose what happens next','tell the story from the point of view of an everyday object','start with a surprisingly honest question','turn a small customer frustration into a little moment of delight','use the format of a recipe, field guide, or handwritten note'];
  const goals = ['make the first step feel inviting','give someone a reason to respond','help a new customer understand the value','celebrate a detail people might miss','make the idea easy for a friend to share'];
  const pick = values => values[Math.floor(Math.random() * values.length)];
  function generateBrief() { const selected = $('#brief-type').value; const brand = selected === 'random' ? pick(Object.values(brands)) : brands[selected]; const result = `Create ${pick(formats)} for ${brand}. Your twist: ${pick(twists)}. Your goal: ${pick(goals)}. Keep it specific, kind, and possible to make with the resources you already have.`; $('#brief-text').textContent = result; $('#brief-output').hidden = false; write('idea-shelf:brief:v1', {brand:selected, text:result}); }
  document.addEventListener('click', event => {
    const target = event.target.closest('button'); if (!target) return;
    if (target.matches('[data-open]')) openIdea(target.dataset.open);
    else if (target.matches('[data-save]')) {
      const id = target.dataset.save;
      const section = target.closest('#featured-grid, #ideas-grid, #saved-grid')?.id;
      toggleSaved(id);
      const replacement = section && document.getElementById(section).querySelector(`[data-save="${CSS.escape(id)}"]`);
      if (replacement) replacement.focus();
      else if (section === 'saved-grid') { $('#shelf-heading').setAttribute('tabindex', '-1'); $('#shelf-heading').focus(); }
    }
    else if (target.matches('[data-dialog-save]') && activeIdea) toggleSaved(activeIdea.id);
    else if (target.matches('[data-close]')) closeIdea();
    else if (target.matches('[data-open-random]')) randomIdea();
    else if (target.matches('[data-open-daily]')) dailyIdea();
    else if (target.matches('[data-filter]')) { filter = target.dataset.filter; visible = 9; renderFilters(); renderIdeas(); $(`[data-filter="${CSS.escape(filter)}"]`).focus(); }
    else if (target.id === 'load-more') { visible += 9; renderIdeas(); }
    else if (target.id === 'generate-brief') generateBrief();
    else if (target.id === 'copy-brief') copyText($('#brief-text').textContent, 'Your brief is copied. Go make something!');
    else if (target.matches('[data-share]') && activeIdea) { const url = new URL(location.href); url.search = ''; url.searchParams.set('idea', activeIdea.id); url.hash = ''; copyText(url.toString(), 'Idea link copied. Pass it along!'); }
    else if (target.matches('.menu-toggle')) { const menu = $('#mobile-nav'); const opened = target.getAttribute('aria-expanded') === 'true'; target.setAttribute('aria-expanded', String(!opened)); target.setAttribute('aria-label', opened ? 'Open menu' : 'Close menu'); menu.hidden = opened; }
  });
  $('#mobile-nav').addEventListener('click', event => { if (event.target.closest('a')) { $('#mobile-nav').hidden = true; $('.menu-toggle').setAttribute('aria-expanded', 'false'); $('.menu-toggle').setAttribute('aria-label', 'Open menu'); } });
  $('#search').addEventListener('input', event => { query = event.target.value.trim().toLowerCase(); visible = 9; renderIdeas(); });
  window.addEventListener('storage', event => { if (event.key === 'idea-shelf:saved:v1') { saved = read('idea-shelf:saved:v1', []); if (!Array.isArray(saved)) saved = []; renderAll(); } });
  const previousBrief = read('idea-shelf:brief:v1', null); if (previousBrief && typeof previousBrief.text === 'string') { $('#brief-type').value = previousBrief.brand in brands || previousBrief.brand === 'random' ? previousBrief.brand : 'random'; $('#brief-text').textContent = previousBrief.text; $('#brief-output').hidden = false; }
  renderAll();
  const initialIdea = new URLSearchParams(location.search).get('idea'); if (initialIdea && byId(initialIdea)) openIdea(initialIdea);
})();
