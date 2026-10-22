'use strict';

// Shared progressive enhancements. Every page remains navigable without this file.
(() => {
  const root = document.documentElement;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let saved;
  try { saved = localStorage.getItem('portfolio-motion'); } catch { /* Optional storage. */ }
  let enabled = !preference.matches && saved !== 'off';
  const toggle = document.querySelector('.motion-toggle');
  function syncMotion() {
    enabled = !preference.matches && saved !== 'off';
    root.dataset.motion = enabled ? 'on' : 'off';
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(enabled));
      toggle.setAttribute('aria-label', preference.matches ? 'Motion off — animations disabled by system preference' : enabled ? 'Motion on — pause animations' : 'Motion off — enable animations');
      toggle.querySelector('.motion-label').textContent = enabled ? 'Motion on' : 'Motion off';
      toggle.disabled = preference.matches;
    }
    dispatchEvent(new CustomEvent('portfolio:motionchange'));
  }
  window.portfolioMotion = {get enabled() { return enabled; }};
  toggle?.addEventListener('click', () => {
    saved = enabled ? 'off' : 'on';
    try { localStorage.setItem('portfolio-motion', saved); } catch { /* Optional storage. */ }
    syncMotion();
  });
  preference.addEventListener('change', syncMotion);
  syncMotion();
  if (toggle) toggle.hidden = false;

  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.navigation');
  const desktop = matchMedia('(min-width: 601px)');
  if (menu && navigation) {
    const close = (returnFocus = false) => {
      menu.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-label', 'Open navigation');
      navigation.classList.remove('is-open');
      navigation.inert = !desktop.matches;
      if (returnFocus) menu.focus();
    };
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      navigation.classList.toggle('is-open', open);
      navigation.inert = !open && !desktop.matches;
    });
    navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => close()));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') close(true);
    });
    document.addEventListener('click', event => { if (!event.target.closest('.header')) close(); });
    navigation.addEventListener('focusout', event => {
      if (!navigation.contains(event.relatedTarget) && event.relatedTarget !== menu) close();
    });
    desktop.addEventListener('change', () => close());
    close();
    root.dataset.navReady = '';
    menu.hidden = false;
    addEventListener('pageshow', () => close());
  }

  // Native popover with an always-readable fallback in unsupported browsers.
  if ('popover' in HTMLElement.prototype) {
    document.querySelectorAll('[popovertarget]').forEach(button => {
      const target = document.getElementById(button.getAttribute('popovertarget'));
      if (target) { target.hidden = false; button.hidden = false; }
    });
    const fallback = document.querySelector('#wecan-architecture-fallback');
    if (fallback) fallback.hidden = true;
  }

  for (const gallery of document.querySelectorAll('.screenshot-gallery')) {
    const track = gallery.querySelector('.gallery-track');
    const controls = [...gallery.querySelectorAll('[data-gallery-direction]')];
    const updateControls = () => controls.forEach(button => {
      button.disabled = Number(button.dataset.galleryDirection) < 0
        ? track.scrollLeft < 2 : track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    });
    for (const button of controls) {
      button.addEventListener('click', () => track.scrollBy({left:Number(button.dataset.galleryDirection) * track.clientWidth, behavior:enabled ? 'smooth' : 'instant'}));
      button.hidden = false;
    }
    track.addEventListener('scroll', updateControls, {passive:true});
    new ResizeObserver(updateControls).observe(track);
    updateControls();
    const dialog = gallery.querySelector('dialog');
    if (!dialog || typeof dialog.showModal !== 'function') continue;
    let invoker;
    for (const button of gallery.querySelectorAll('[data-enlarge]')) {
      button.addEventListener('click', () => {
        invoker = button;
        const image = document.createElement('img');
        const original = button.closest('figure').querySelector('img');
        image.src = button.dataset.enlarge;
        image.alt = original.alt;
        image.width = original.width;
        image.height = original.height;
        dialog.querySelector('.dialog-media').replaceChildren(image);
        dialog.querySelector('[data-image-title]').textContent = button.textContent.replace('Enlarge ', '');
        dialog.showModal();
      });
      button.hidden = false;
    }
    dialog.addEventListener('close', () => invoker?.focus({preventScroll:true}));
    gallery.classList.add('gallery-ready');
  }
  document.querySelector('#year')?.replaceChildren(String(new Date().getFullYear()));
  document.addEventListener('visibilitychange', () => { root.dataset.idle = String(document.hidden); });
  addEventListener('pageshow', event => {
    if (event.persisted) root.classList.remove('intro-running');
    root.dataset.idle = String(document.hidden);
    try { saved = localStorage.getItem('portfolio-motion'); } catch { /* Optional storage. */ }
    syncMotion();
  });
})();
