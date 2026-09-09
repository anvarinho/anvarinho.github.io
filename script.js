'use strict';

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');
const navLinks = [...navigation.querySelectorAll('a')];

function closeMenu(returnFocus = false) {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
  if (returnFocus) menuToggle.focus();
}

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', isOpen);
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
window.matchMedia('(min-width: 601px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
let scrollScheduled = false;
function updateActiveSection() {
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
