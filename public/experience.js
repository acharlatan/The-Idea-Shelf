(() => {
  'use strict';
  const progress = document.querySelector('.reading-progress span');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let queued = false;
  function updateProgress() {
    const remaining = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${remaining > 0 ? Math.min(1, Math.max(0, window.scrollY / remaining)) : 0})`;
    queued = false;
  }
  window.addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(updateProgress); } }, {passive:true});
  updateProgress();
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion.matches) {
    const art = document.querySelector('.hero-art');
    art.addEventListener('pointermove', event => {
      const box = art.getBoundingClientRect();
      art.style.setProperty('--pointer-x', `${((event.clientX - box.left) / box.width - .5) * 12}px`);
      art.style.setProperty('--pointer-y', `${((event.clientY - box.top) / box.height - .5) * 12}px`);
    });
    art.addEventListener('pointerleave', () => { art.style.setProperty('--pointer-x', '0px'); art.style.setProperty('--pointer-y', '0px'); });
  }
})();
