'use strict';

const navLinks = [...document.querySelectorAll('#navigation a')];
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
let copyFeedbackTimer = 0;
document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  const button = document.querySelector('#copy-email');
  try {
    await navigator.clipboard.writeText('anvarinho@gmail.com');
    status.textContent = 'Email address copied.';
    clearTimeout(copyFeedbackTimer);
    button.classList.add('is-copied');
    button.setAttribute('aria-label', 'Email address copied');
    button.querySelector('use').setAttribute('href', '#check');
    copyFeedbackTimer = setTimeout(() => {
      button.classList.remove('is-copied');
      button.setAttribute('aria-label', 'Copy email address');
      button.querySelector('use').setAttribute('href', '#copy');
    }, 2400);
  } catch {
    status.textContent = 'Select the address to copy it, or click it to email me.';
  }
});

document.querySelector('#copy-email').hidden = false;

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

// Motion is progressive enhancement. Nothing depends on an animation finishing.
const root = document.documentElement;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
let motionEnabled = window.portfolioMotion.enabled;
root.dataset.motion = motionEnabled ? 'on' : 'off';

// Mask existing heading lines without changing their text or accessible names.
for (const heading of document.querySelectorAll('h1, h2')) {
  const lines = [[]];
  for (const node of [...heading.childNodes]) {
    if (node.nodeName === 'BR') lines.push([]);
    else lines.at(-1).push(node);
  }
  heading.replaceChildren(...lines.flatMap((nodes, index) => {
    const mask = document.createElement('span');
    const text = document.createElement('span');
    mask.className = 'line-mask';
    text.className = 'line-text';
    text.style.setProperty('--line-order', index);
    text.append(...nodes);
    mask.append(text);
    return index < lines.length - 1 ? [mask, ' '] : [mask];
  }));
}
navLinks.forEach((link, index) => link.style.setProperty('--nav-order', index));
for (const button of document.querySelectorAll('.button')) {
  const content = document.createElement('span');
  content.className = 'button-content';
  content.append(...button.childNodes);
  button.append(content);
}
for (const visual of document.querySelectorAll('.project-visual')) {
  const scene = document.createElement(visual.matches('button') ? 'span' : 'div');
  scene.className = 'project-scene';
  scene.append(...[...visual.children].filter(child => !child.matches('.visual-label, .visual-bottom')));
  visual.prepend(scene);
}
for (const panel of document.querySelectorAll('.portrait-frame, .project-card')) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('border-trace');
  svg.setAttribute('aria-hidden', 'true');
  const rect = document.createElementNS(svg.namespaceURI, 'rect');
  for (const [key, value] of Object.entries({width:'100%',height:'100%',rx:'10',pathLength:'1'})) rect.setAttribute(key, value);
  svg.append(rect);
  panel.append(svg);
}
for (const group of document.querySelectorAll('.strip-tools, .skills-grid, .project-grid')) {
  [...group.children].forEach((child, index) => child.style.setProperty('--reveal-delay', `${index * (group.matches('.strip-tools') ? 55 : 100)}ms`));
}
for (const group of document.querySelectorAll('.skill-card .tags, .about-copy, .about-principles')) {
  [...group.children].forEach((child, index) => child.style.setProperty('--item-order', index));
}

const revealElements = [...document.querySelectorAll('.stack-strip, .section-heading, .project-card, .about-grid > *, .skill-card, .contact-panel')];
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const target = entry.target.matches('.contact-section')
        ? entry.target.querySelector('.contact-panel') : entry.target;
      target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  }, { threshold: .10, rootMargin: '0px 0px -24px 0px' });
  for (const element of revealElements) {
    element.classList.add('reveal-ready');
    // Observe the stable wrapper: a fully clipped panel has no intersection.
    revealObserver.observe(element.matches('.contact-panel') ? element.parentElement : element);
  }
}
// Keyboard users never wait for a clipped or transparent target to arrive.
document.addEventListener('focusin', event => {
  root.classList.remove('intro-running');
  event.target.closest('.reveal-ready')?.classList.add('is-visible');
});
if (motionEnabled && scrollY < 80 && !location.hash) {
  root.classList.add('intro-running');
  setTimeout(() => root.classList.remove('intro-running'), 1400);
}

// Pointer work is event-driven, with one write batch per animation frame.
// Bounds are read on entry and invalidated on scroll/resize, never after writes.
const interactivePanels = [...document.querySelectorAll('.portrait-frame, .project-card, .button.primary')];
const pointerStates = interactivePanels.map(panel => ({panel, bounds:null, x:0, y:0, dirty:false, active:false}));
let interactionFrame = 0;
let scrollDirty = false;
let heroBounds = null;
const visibleArtwork = new Set();
const artwork = [...document.querySelectorAll('.project-visual')];
function resetPanel(state) {
  state.active = false;
  state.dirty = false;
  state.bounds = null;
  state.panel.classList.remove('is-interacting');
  for (const property of ['--tilt-x','--tilt-y','--light-x','--light-y','--depth-x','--depth-y','--magnet-x','--magnet-y']) state.panel.style.removeProperty(property);
}
function queueInteraction() {
  if (!interactionFrame && motionEnabled && !document.hidden) interactionFrame = requestAnimationFrame(updateInteractions);
}
function updateInteractions() {
  interactionFrame = 0;
  if (!motionEnabled || document.hidden) return;
  const precise = finePointer.matches;
  const updates = [];
  // Read all geometry before modifying any styles.
  for (const state of pointerStates) {
    if (!state.dirty || !state.active || !precise) continue;
    state.bounds ||= state.panel.getBoundingClientRect();
    const {left, top, width, height} = state.bounds;
    const x = Math.max(0, Math.min(1, (state.x - left) / width));
    const y = Math.max(0, Math.min(1, (state.y - top) / height));
    updates.push({state, x, y, width, height});
  }
  const parallax = scrollDirty && precise ? [...visibleArtwork].map(element => ({element, bounds:element.getBoundingClientRect()})) : [];
  for (const {state, x, y, width, height} of updates) {
    const style = state.panel.style;
    if (state.panel.matches('.button')) {
      style.setProperty('--magnet-x', `${((x - .5) * 7).toFixed(2)}px`);
      style.setProperty('--magnet-y', `${((y - .5) * 5).toFixed(2)}px`);
    } else {
      style.setProperty('--tilt-x', `${((.5 - y) * 2.4).toFixed(2)}deg`);
      style.setProperty('--tilt-y', `${((x - .5) * 2.4).toFixed(2)}deg`);
      style.setProperty('--light-x', `${(x * width).toFixed(1)}px`);
      style.setProperty('--light-y', `${(y * height).toFixed(1)}px`);
      style.setProperty('--depth-x', `${((x - .5) * 8).toFixed(2)}px`);
      style.setProperty('--depth-y', `${((y - .5) * 6).toFixed(2)}px`);
    }
    state.dirty = false;
  }
  for (const {element,bounds} of parallax) {
    const distance = Math.max(-1,Math.min(1,(innerHeight / 2 - bounds.top - bounds.height / 2) / innerHeight));
    if (element.matches('.hero-art')) {
      element.querySelector('.portrait-orbit').style.translate = `0 ${(distance * 12).toFixed(2)}px`;
      element.querySelector('.floating-label').style.translate = `0 ${(distance * -5.4).toFixed(2)}px`;
    } else element.querySelector('.project-scene').style.translate = `0 ${(distance * 12).toFixed(2)}px`;
  }
  scrollDirty = false;
}
for (const state of pointerStates) {
  const {panel} = state;
  panel.addEventListener('pointerenter', event => {
    if (!motionEnabled || !finePointer.matches || event.pointerType === 'touch') return;
    state.bounds = panel.getBoundingClientRect();
    state.active = true;
    panel.classList.add('is-interacting');
  });
  panel.addEventListener('pointermove', event => {
    if (!motionEnabled || !finePointer.matches || event.pointerType === 'touch') return;
    state.x = event.clientX; state.y = event.clientY; state.dirty = true;
    queueInteraction();
  }, {passive:true});
  panel.addEventListener('pointerleave', () => resetPanel(state));
  panel.addEventListener('pointercancel', () => resetPanel(state));
}
function invalidateGeometry() {
  heroBounds = null;
  pointerStates.forEach(state => {state.bounds = null;});
  scrollDirty = true;
  queueInteraction();
  if (heroVisible) wakeNetwork(500);
}
function resetParallax() {
  document.querySelectorAll('.project-scene, .portrait-orbit, .floating-label').forEach(element => element.style.removeProperty('translate'));
}
window.addEventListener('scroll', invalidateGeometry, {passive:true});
window.addEventListener('resize', invalidateGeometry);
finePointer.addEventListener('change', () => {
  pointerStates.forEach(resetPanel);
  networkPointer.x = networkPointer.y = -1000;
  if (!finePointer.matches) resetParallax();
});

// A quiet, three-depth network: a brief opening drift, then demand-driven motion.
// Pointer/scroll input wakes it at 15fps; resting, hidden, and offscreen views sleep.
const hero = document.querySelector('.hero');
const canvas = hero.querySelector('.network-canvas');
const context = canvas.getContext('2d');
const networkPointer = {x:-1000,y:-1000};
let networkTimer = 0;
let heroVisible = true;
let lastNetworkTime = 0;
let networkActiveUntil = 0;
let networkWidth = 0;
let networkHeight = 0;
let particles = [];
let pointerX = 0, pointerY = 0;
function resizeNetwork() {
  networkWidth = hero.clientWidth;
  networkHeight = hero.clientHeight;
  const ratio = Math.min(devicePixelRatio || 1, 1.5);
  canvas.width = Math.round(networkWidth * ratio);
  canvas.height = Math.round(networkHeight * ratio);
  if (!context) return;
  context.setTransform(ratio,0,0,ratio,0,0);
  particles = Array.from({length:networkWidth < 600 ? 18 : 34}, () => {
    const depth = .35 + Math.random() * .65;
    return {x:Math.random()*networkWidth,y:Math.random()*networkHeight,vx:(Math.random()-.5)*.13,vy:(Math.random()-.5)*.13,depth,dx:0,dy:0,alpha:1};
  });
  drawNetwork(0);
  invalidateGeometry();
}
function drawNetwork(delta) {
  if (!context) return;
  context.clearRect(0,0,networkWidth,networkHeight);
  const responsive = motionEnabled && finePointer.matches && networkPointer.x > -1;
  pointerX += ((responsive ? networkPointer.x / networkWidth - .5 : 0) - pointerX) * .09;
  pointerY += ((responsive ? networkPointer.y / networkHeight - .5 : 0) - pointerY) * .09;
  for (const point of particles) {
    point.x = (point.x + point.vx * delta * point.depth + networkWidth) % networkWidth;
    point.y = (point.y + point.vy * delta * point.depth + networkHeight) % networkHeight;
    point.dx = point.x + pointerX * point.depth * 14;
    point.dy = point.y + pointerY * point.depth * 14;
    // Dim behind the copy in the draw itself, avoiding a full-canvas CSS mask.
    point.alpha = .22 + Math.max(0, Math.min(1, (point.dx / networkWidth - .4) / .35)) * .78;
    context.fillStyle = `rgba(126,233,245,${(.2 + point.depth * .4) * point.alpha})`;
    context.beginPath();context.arc(point.dx,point.dy,.55 + point.depth,0,Math.PI*2);context.fill();
  }
  context.lineWidth = .65;
  for (let i=0;i<particles.length;i++) {
    const a = particles[i];
    for (let j=i+1;j<particles.length;j++) {
      const b = particles[j];
      const dx=a.dx-b.dx,dy=a.dy-b.dy,distance=dx*dx+dy*dy;
      if (distance > 22500) continue;
      context.strokeStyle = `rgba(98,228,236,${(1-distance/22500)*.17*Math.min(a.depth,b.depth)*Math.min(a.alpha,b.alpha)})`;
      context.beginPath();context.moveTo(a.dx,a.dy);context.lineTo(b.dx,b.dy);context.stroke();
    }
  }
}
function animateNetwork() {
  networkTimer = 0;
  if (!motionEnabled || !heroVisible || document.hidden || !context) return;
  const time = performance.now();
  if (time > networkActiveUntil) return;
  drawNetwork(Math.min((time-lastNetworkTime)/16.67,4));
  lastNetworkTime = time;
  networkTimer = setTimeout(animateNetwork, 1000 / 15);
}
function wakeNetwork(duration = 900) {
  if (!motionEnabled || !heroVisible || document.hidden || !context) return;
  networkActiveUntil = Math.max(networkActiveUntil, performance.now() + duration);
  if (!networkTimer) {
    lastNetworkTime = performance.now();
    networkTimer = setTimeout(animateNetwork, 1000 / 15);
  }
}
function syncNetwork() {
  clearTimeout(networkTimer);
  networkTimer = 0;
  lastNetworkTime = performance.now();
  if (motionEnabled && heroVisible && !document.hidden && context && performance.now() < networkActiveUntil) networkTimer = setTimeout(animateNetwork,1000/15);
}
hero.addEventListener('pointermove', event => {
  if (!motionEnabled || !finePointer.matches || event.pointerType === 'touch') return;
  heroBounds ||= hero.getBoundingClientRect();
  networkPointer.x = event.clientX - heroBounds.left;
  networkPointer.y = event.clientY - heroBounds.top;
  wakeNetwork();
}, {passive:true});
hero.addEventListener('pointerleave', () => {networkPointer.x=networkPointer.y=-1000;wakeNetwork(500);});

// Calm typewriter hints never touch the textarea's value or accessible name.
const messageField = document.querySelector('.message-field');
const messageInput = messageField.querySelector('textarea');
const terminalText = messageField.querySelector('.terminal-text');
const terminalPrompts = [
  'Tell me about the idea you can’t stop thinking about…',
  'A website? A mobile app? Let’s build something useful.',
  'Share the challenge. Let’s figure out the next step.',
];
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
  terminalTimer = 0;
  if (!canAnimateTerminal()) return;
  terminalCharacter += terminalErasing ? -1 : 1;
  const phrase = terminalPrompts[terminalPromptIndex];
  terminalText.textContent = phrase.slice(0,terminalCharacter);
  let delay = terminalErasing ? 30 : 65;
  if (!terminalErasing && terminalCharacter === phrase.length) {terminalErasing=true;delay=4200;}
  else if (terminalErasing && terminalCharacter === 0) {terminalErasing=false;terminalPromptIndex=(terminalPromptIndex+1)%terminalPrompts.length;delay=600;}
  terminalTimer = setTimeout(typeTerminal,delay);
}
function syncTerminal() {
  clearTimeout(terminalTimer);terminalTimer=0;
  if (!motionEnabled) {
    networkActiveUntil = 0;
    terminalPromptIndex=0;terminalCharacter=0;terminalErasing=false;
    terminalText.textContent=terminalPrompts[0];
  } else if (canAnimateTerminal()) {
    terminalText.textContent=terminalPrompts[terminalPromptIndex].slice(0,terminalCharacter);
    terminalTimer=setTimeout(typeTerminal,650);
  }
}
for (const event of ['focus','blur','input']) messageInput.addEventListener(event,syncTerminal);
document.querySelector('#contact-form').addEventListener('reset', () => setTimeout(syncTerminal,0));
let visibilityObserver;
if ('IntersectionObserver' in window) {
  // One visibility observer owns the lifetime of all ambient effects.
  visibilityObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      entry.target.dataset.inView=String(entry.isIntersecting);
      if (entry.target===hero) {heroVisible=entry.isIntersecting;syncNetwork();}
      if (entry.target===messageField) {terminalVisible=entry.isIntersecting;syncTerminal();}
      if (artwork.includes(entry.target)) {
        if (entry.isIntersecting) visibleArtwork.add(entry.target);
        else visibleArtwork.delete(entry.target);
      }
    }
    scrollDirty=true;queueInteraction();
  });
  for (const element of new Set([hero,messageField,...artwork,...document.querySelectorAll('.stack-strip, main>section, .product-story')])) visibilityObserver.observe(element);
} else artwork.forEach(element => visibleArtwork.add(element));
function syncMotion() {
  root.dataset.motion=motionEnabled?'on':'off';
  if (!motionEnabled) {
    root.classList.remove('intro-running');
    revealElements.forEach(element=>element.classList.add('is-visible'));
    pointerStates.forEach(resetPanel);
    cancelAnimationFrame(interactionFrame);interactionFrame=0;
    resetParallax();
    networkPointer.x=networkPointer.y=-1000;pointerX=pointerY=0;
    drawNetwork(0);
  } else {networkActiveUntil=performance.now()+2000;scrollDirty=true;queueInteraction();}
  syncNetwork();syncTerminal();
}
addEventListener('portfolio:motionchange', () => {motionEnabled=window.portfolioMotion.enabled;syncMotion();});
addEventListener('pageshow', event => {if(event.persisted){root.classList.remove('intro-running');syncMotion();}});
document.addEventListener('visibilitychange', () => {
  root.dataset.idle=String(document.hidden);
  if (document.hidden) {
    cancelAnimationFrame(interactionFrame);interactionFrame=0;
    pointerStates.forEach(resetPanel);
    networkPointer.x=networkPointer.y=-1000;
  }
  syncNetwork();syncTerminal();
});
if ('ResizeObserver' in window) new ResizeObserver(resizeNetwork).observe(hero);
else window.addEventListener('resize',resizeNetwork);
root.dataset.idle=String(document.hidden);
resizeNetwork();syncMotion();

// Popup layout changes use the same geometry and visibility lifecycle.
addEventListener('portfolio:layoutchange', event => {
  invalidateGeometry();updateActiveSection();
  const target = event.detail?.target;
  if (target && visibilityObserver) {visibilityObserver.unobserve(target);visibilityObserver.observe(target);}
});

// Every badge shares one flex row, including the Node.js → React join.
// Only layout/font changes measure the repeat; animation stays in CSS.
const toolkit = document.querySelector('.stack-strip');
const techTrack = toolkit.querySelector('.tech-track');
const toolkitPause = toolkit.querySelector('.toolkit-pause');
const toolkitOriginals = [...techTrack.children];
const toolkitCopies = toolkitOriginals.map(badge => {
  const copy = badge.cloneNode(true);
  copy.dataset.toolkitCopy = '';
  copy.setAttribute('aria-hidden', 'true');
  copy.inert = true;
  return copy;
});
techTrack.append(...toolkitCopies);
let toolkitPaused = false;
function measureToolkit() {
  if (!motionEnabled) return;
  const distance = toolkitCopies[0].offsetLeft - toolkitOriginals[0].offsetLeft;
  if (distance > 0) techTrack.style.setProperty('--toolkit-distance', `${distance}px`);
}
function syncToolkit() {
  toolkit.dataset.toolkitPaused = String(toolkitPaused);
  toolkitPause.hidden = !motionEnabled;
  toolkitPause.setAttribute('aria-label', toolkitPaused ? 'Resume technology logo animation' : 'Pause technology logo animation');
  toolkitPause.querySelector('.toolkit-pause-label').textContent = toolkitPaused ? 'Resume' : 'Pause';
  toolkitPause.querySelector('.toolkit-pause-icon').textContent = toolkitPaused ? '▷' : 'Ⅱ';
  measureToolkit();
}
toolkitPause.addEventListener('click', () => {toolkitPaused = !toolkitPaused;syncToolkit();});
addEventListener('portfolio:motionchange', syncToolkit);
toolkit.dataset.toolkitReady = '';
syncToolkit();
if ('ResizeObserver' in window) new ResizeObserver(measureToolkit).observe(techTrack);
else addEventListener('resize', measureToolkit);
document.fonts.ready.then(measureToolkit);
document.fonts.addEventListener('loadingdone', measureToolkit);
