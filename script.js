'use strict';

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');
const navLinks = [...navigation.querySelectorAll('a')];
const desktopNavigation = window.matchMedia('(min-width: 601px)');
navigation.inert = !desktopNavigation.matches;

function closeMenu(returnFocus = false) {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
  navigation.inert = !desktopNavigation.matches;
  if (returnFocus) menuToggle.focus();
}

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', isOpen);
  navigation.inert = !isOpen && !desktopNavigation.matches;
});
navLinks.forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
navigation.addEventListener('focusout', event => {
  if (!navigation.contains(event.relatedTarget) && event.relatedTarget !== menuToggle) closeMenu();
});
desktopNavigation.addEventListener('change', () => closeMenu());

const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
let scrollScheduled = false;
function updateActiveSection() {
  document.querySelector('.header').classList.toggle('is-scrolled', window.scrollY > 20);
  const marker = window.scrollY + Math.min(window.innerHeight * 0.35, 250);
  let current = sections[0];
  for (const section of sections) {
    if (section.offsetTop <= marker) current = section;
  }
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) current = sections[sections.length - 1];
  navLinks.forEach(link => {
    const active = link.hash === `#${current.id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollScheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scrollScheduled) {
    scrollScheduled = true;
    window.requestAnimationFrame(updateActiveSection);
  }
}, { passive: true });
window.addEventListener('resize', updateActiveSection);
window.addEventListener('load', updateActiveSection);
updateActiveSection();

document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText('anvarinho@gmail.com');
    status.textContent = 'Email address copied.';
  } catch {
    status.textContent = 'Select the address to copy it, or click it to email me.';
  }
});

document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const name = data.get('name').trim();
  const message = data.get('message').trim();
  const status = document.querySelector('#form-status');
  if (!name || !message) {
    status.textContent = 'Please add your name and a short message about your idea.';
    form.elements[!name ? 'name' : 'message'].focus();
    return;
  }
  const subject = encodeURIComponent(`Project enquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${data.get('email').trim()}`);
  window.location.href = `mailto:anvarinho@gmail.com?subject=${subject}&body=${body}`;
  status.textContent = 'Your email draft is ready to open. If no app opened, email anvarinho@gmail.com directly.';
});

// Motion is progressive enhancement: content and controls work without it.
const root = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const motionToggle = document.querySelector('.motion-toggle');
let savedMotion;
try { savedMotion = localStorage.getItem('portfolio-motion'); } catch { /* Storage may be unavailable. */ }
let motionEnabled = !reducedMotion.matches && savedMotion !== 'off';
let networkFrame = 0;
let heroVisible = true;
let lastNetworkTime = 0;

const revealElements = [...document.querySelectorAll('.hero-copy > *, .hero-art, .section-heading, .project-card, .about-grid > *, .skill-card, .contact-panel')];
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  revealElements.forEach(element => {
    const siblings = [...element.parentElement.children];
    const stagger = element.matches('.hero-copy > *, .project-card, .skill-card') ? Math.min(siblings.indexOf(element) * 85, 425) : 0;
    element.style.setProperty('--reveal-delay', `${stagger}ms`);
    element.classList.add('reveal-ready');
    revealObserver.observe(element);
  });
}

// Pointer lighting and small perspective shifts only run on precise pointers.
const interactivePanels = [...document.querySelectorAll('.portrait-frame, .project-card, .skill-card, .contact-panel')];
const resetPanel = panel => {
  panel.style.removeProperty('--tilt-x');
  panel.style.removeProperty('--tilt-y');
  panel.style.removeProperty('--light-x');
  panel.style.removeProperty('--light-y');
};
interactivePanels.forEach(panel => {
  let pointerFrame = 0;
  panel.addEventListener('pointermove', event => {
    if (!motionEnabled || !finePointer.matches) return;
    cancelAnimationFrame(pointerFrame);
    pointerFrame = requestAnimationFrame(() => {
      if (!motionEnabled || !finePointer.matches) return;
      const bounds = panel.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
      const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
      panel.style.setProperty('--light-x', `${x * 100}%`);
      panel.style.setProperty('--light-y', `${y * 100}%`);
      panel.style.setProperty('--tilt-x', `${(0.5 - y) * 5}deg`);
      panel.style.setProperty('--tilt-y', `${(x - 0.5) * 5}deg`);
    });
  });
  panel.addEventListener('pointerleave', () => {
    cancelAnimationFrame(pointerFrame);
    resetPanel(panel);
  });
});
finePointer.addEventListener('change', () => interactivePanels.forEach(resetPanel));

// A bounded canvas network keeps the hero alive without a graphics dependency.
const canvas = document.querySelector('.network-canvas');
const context = canvas.getContext('2d');
const hero = document.querySelector('.hero');
const networkPointer = { x: -1000, y: -1000 };
let networkWidth = 0;
let networkHeight = 0;
let particles = [];

function resizeNetwork() {
  networkWidth = hero.clientWidth;
  networkHeight = hero.clientHeight;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(networkWidth * ratio);
  canvas.height = Math.round(networkHeight * ratio);
  if (!context) return;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  const count = networkWidth < 600 ? 24 : 48;
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * networkWidth,
    y: Math.random() * networkHeight,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
    radius: Math.random() * 1.2 + 0.7,
  }));
  drawNetwork(0);
}

function drawNetwork(delta) {
  if (!context) return;
  context.clearRect(0, 0, networkWidth, networkHeight);
  particles.forEach((point, index) => {
    point.x += point.vx * delta;
    point.y += point.vy * delta;
    if (point.x < 0) point.x = networkWidth;
    if (point.x > networkWidth) point.x = 0;
    if (point.y < 0) point.y = networkHeight;
    if (point.y > networkHeight) point.y = 0;
    context.fillStyle = 'rgba(126, 233, 245, 0.55)';
    context.beginPath();
    context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
    context.fill();
    const neighbors = particles.slice(index + 1);
    if (motionEnabled && finePointer.matches) neighbors.push(networkPointer);
    neighbors.forEach(other => {
      const distance = Math.hypot(point.x - other.x, point.y - other.y);
      if (distance > 145) return;
      context.strokeStyle = `rgba(98, 228, 236, ${(1 - distance / 145) * 0.22})`;
      context.lineWidth = 0.7;
      context.beginPath();
      context.moveTo(point.x, point.y);
      context.lineTo(other.x, other.y);
      context.stroke();
    });
  });
}

function animateNetwork(time) {
  if (!motionEnabled || !heroVisible || document.hidden) {
    networkFrame = 0;
    return;
  }
  const elapsed = time - lastNetworkTime;
  if (elapsed >= 1000 / 30) {
    drawNetwork(Math.min(elapsed / 16.67, 3));
    lastNetworkTime = time;
  }
  networkFrame = requestAnimationFrame(animateNetwork);
}

function syncNetwork() {
  cancelAnimationFrame(networkFrame);
  networkFrame = 0;
  lastNetworkTime = performance.now();
  if (motionEnabled && heroVisible && !document.hidden && context) {
    networkFrame = requestAnimationFrame(animateNetwork);
  }
}

// Keep animated hints separate from the textarea value and accessible label.
const messageField = document.querySelector('.message-field');
const messageInput = messageField.querySelector('textarea');
const terminalText = messageField.querySelector('.terminal-text');
const terminalGlyph = messageField.querySelector('.terminal-glyph');
const terminalPrompts = [
  'Tell me about the idea you can’t stop thinking about…',
  'A website? A mobile app? Let’s build something useful.',
  'Share the challenge. Let’s figure out the next step.',
];
const matrixGlyphs = '01アイウエオカキクケコ';
let terminalTimer = 0;
let terminalVisible = !('IntersectionObserver' in window);
let terminalPromptIndex = 0;
let terminalCharacter = 0;
let terminalErasing = false;
messageField.classList.add('terminal-enhanced');

function canAnimateTerminal() {
  return motionEnabled && terminalVisible && !document.hidden && !messageInput.value && document.activeElement !== messageInput;
}

function typeTerminal() {
  if (!canAnimateTerminal()) return;
  const phrase = terminalPrompts[terminalPromptIndex];
  terminalCharacter += terminalErasing ? -1 : 1;
  terminalText.textContent = phrase.slice(0, terminalCharacter);
  terminalGlyph.textContent = !terminalErasing && terminalCharacter < phrase.length
    ? matrixGlyphs[Math.floor(Math.random() * matrixGlyphs.length)] : '';
  let delay = terminalErasing ? 24 : 55 + Math.random() * 35;
  if (!terminalErasing && terminalCharacter === phrase.length) {
    terminalErasing = true;
    delay = 2600;
  } else if (terminalErasing && terminalCharacter === 0) {
    terminalErasing = false;
    terminalPromptIndex = (terminalPromptIndex + 1) % terminalPrompts.length;
    delay = 450;
  }
  terminalTimer = window.setTimeout(typeTerminal, delay);
}

function syncTerminal() {
  clearTimeout(terminalTimer);
  terminalGlyph.textContent = '';
  if (!motionEnabled) {
    terminalPromptIndex = 0;
    terminalCharacter = 0;
    terminalErasing = false;
    terminalText.textContent = terminalPrompts[0];
  } else if (canAnimateTerminal()) {
    terminalText.textContent = terminalPrompts[terminalPromptIndex].slice(0, terminalCharacter);
    terminalTimer = window.setTimeout(typeTerminal, 350);
  }
}

['focus', 'blur', 'input'].forEach(event => messageInput.addEventListener(event, syncTerminal));
document.querySelector('#contact-form').addEventListener('reset', () => window.setTimeout(syncTerminal, 0));
if ('IntersectionObserver' in window) {
  const terminalObserver = new IntersectionObserver(entries => {
    terminalVisible = entries[0].isIntersecting;
    syncTerminal();
  });
  terminalObserver.observe(messageField);
}

function syncMotion() {
  root.dataset.motion = motionEnabled ? 'on' : 'off';
  motionToggle.setAttribute('aria-pressed', String(motionEnabled));
  motionToggle.setAttribute('aria-label', motionEnabled ? 'Pause animations' : 'Enable animations');
  motionToggle.querySelector('.motion-label').textContent = motionEnabled ? 'Motion on' : 'Motion off';
  // The operating system's reduced-motion setting takes priority.
  motionToggle.disabled = reducedMotion.matches;
  if (!motionEnabled) {
    revealElements.forEach(element => element.classList.add('is-visible'));
    interactivePanels.forEach(resetPanel);
    networkPointer.x = networkPointer.y = -1000;
    drawNetwork(0);
  }
  syncNetwork();
  syncTerminal();
}

motionToggle.addEventListener('click', () => {
  motionEnabled = !motionEnabled && !reducedMotion.matches;
  savedMotion = motionEnabled ? 'on' : 'off';
  try { localStorage.setItem('portfolio-motion', savedMotion); } catch { /* Keep the choice for this page. */ }
  syncMotion();
});
reducedMotion.addEventListener('change', () => {
  motionEnabled = !reducedMotion.matches && savedMotion !== 'off';
  syncMotion();
});
hero.addEventListener('pointermove', event => {
  if (!motionEnabled || !finePointer.matches) return;
  const bounds = hero.getBoundingClientRect();
  networkPointer.x = event.clientX - bounds.left;
  networkPointer.y = event.clientY - bounds.top;
}, { passive: true });
hero.addEventListener('pointerleave', () => { networkPointer.x = networkPointer.y = -1000; });
if ('IntersectionObserver' in window) {
  const heroObserver = new IntersectionObserver(entries => {
    heroVisible = entries[0].isIntersecting;
    syncNetwork();
  });
  heroObserver.observe(hero);
}
if ('ResizeObserver' in window) new ResizeObserver(resizeNetwork).observe(hero);
else window.addEventListener('resize', resizeNetwork);
document.addEventListener('visibilitychange', () => {
  root.dataset.idle = String(document.hidden);
  syncNetwork();
  syncTerminal();
});
resizeNetwork();
syncMotion();
motionToggle.hidden = false;
