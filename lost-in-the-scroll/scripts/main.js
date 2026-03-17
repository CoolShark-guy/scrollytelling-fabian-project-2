/* ============================================================
   MAIN.JS — LOST IN THE SCROLL
   Build 7-2: Page-load GSAP animations. No ScrollTrigger.
   ============================================================ */

/* =====================================================
   PLUGIN REGISTRATION
===================================================== */

// Premium plugins — registered once Club GreenSock is available
// gsap.registerPlugin(ScrollSmoother);
// gsap.registerPlugin(DrawSVGPlugin);
// gsap.registerPlugin(TextPlugin);
// gsap.registerPlugin(SplitText);

/* =====================================================
   THEME MANAGEMENT
   Reads localStorage, applies data-theme attribute,
   wires toggle button.
===================================================== */

const THEME_KEY = 'lits-theme';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  const btn = document.querySelector('.theme-toggle');
  if (btn) btn.textContent = theme === 'dark' ? 'Light' : 'Dark';
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const system = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  applyTheme(saved || system);
}

function initThemeToggle() {
  const btn = document.querySelector('.theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

/* =====================================================
   SCROLL SMOOTHER SETUP
   Requires Club GreenSock ScrollSmoother plugin.
   Uncomment once plugin is available.
===================================================== */

// const smoother = ScrollSmoother.create({
//   wrapper:  '#smooth-wrapper',
//   content:  '#smooth-content',
//   smooth:   1.5,
//   effects:  true,
// });

/* =====================================================
   REDUCED MOTION CHECK
===================================================== */

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* =====================================================
   SECTION 1 — OPENING
   Timeline 1: Hero entrance. All tweens fire on page load.
===================================================== */

function initSection1() {
  if (reducedMotion) return;

  const tl1 = gsap.timeline();
  tl1
    .from('.opening__text h1',               { y: 40, opacity: 0, ease: 'power3.out', duration: 1 })
    .from('.opening__text p',                { y: 24, opacity: 0, ease: 'power2.out', duration: 0.8 }, '-=0.4')
    .from('.opening__concept',               { x: -20, opacity: 0, ease: 'power2.out', duration: 0.8 }, '-=0.3')
    .from('.section--opening .section__label', { opacity: 0, duration: 0.6 }, '-=0.5');
}

/* =====================================================
   SECTION 2 — FIRST CONTACT
===================================================== */

function initSection2() {
  if (reducedMotion) return;

  gsap.from('.status-window-svg-wrap', {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  });

  gsap.from('.first-contact__header', {
    x: -30,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });
}

/* =====================================================
   SECTION 3 — NAMING THINGS
   Timeline 2: Panel reveal. All tweens fire on page load.
===================================================== */

function initSection3() {
  if (reducedMotion) return;

  const tl2 = gsap.timeline();
  tl2
    .from('.naming__heading',        { y: 30, opacity: 0, ease: 'power3.out', duration: 0.8 })
    .from('.naming__divider',        { scaleX: 0, ease: 'power2.out', duration: 0.6 }, '-=0.3')
    .from('.naming__panel--corrupt', { x: -30, opacity: 0, ease: 'back.out(1.4)', duration: 0.8 }, '-=0.2')
    .from('.naming__panel--named',   { x: 30,  opacity: 0, ease: 'back.out(1.4)', duration: 0.8 }, '-=0.6');
}

/* =====================================================
   SECTION 4 — THE SWITCH
===================================================== */

function initSection4() {
  if (reducedMotion) return;

  gsap.from('.switch__side--v', {
    x: -60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  });

  gsap.from('.switch__side--johnny', {
    x: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  });

  gsap.from('.switch__condition', {
    opacity: 0,
    duration: 0.6,
    delay: 0.8,
  });
}

/* =====================================================
   SECTION 5 — THE MEMORY
   Stagger call. All tweens fire on page load.
===================================================== */

function initSection5() {
  if (reducedMotion) return;

  gsap.from('.memory__header h2', { y: 20, opacity: 0, ease: 'power2.out', duration: 0.8 });
  gsap.from('.data-entry',        { x: -30, opacity: 0, stagger: 0.15, ease: 'power2.out', duration: 0.8 });
  gsap.from('.memory__session',   { opacity: 0, ease: 'power2.out', duration: 0.6 });
}

/* =====================================================
   SECTION 6 — CLOSING
===================================================== */

function initSection6() {
  if (reducedMotion) return;

  gsap.from('.closing__headline', {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  });

  gsap.from('.closing__body', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    delay: 0.3,
    ease: 'power2.out',
  });

  gsap.from('.closing__engram', {
    opacity: 0,
    duration: 0.6,
    delay: 0.6,
  });
}

/* =====================================================
   KEYBOARD NAVIGATION
   Spacebar / arrow keys scroll between sections.
===================================================== */

function initKeyboardNav() {
  const sections = Array.from(document.querySelectorAll('.section'));
  let currentIdx = 0;

  function scrollToSection(idx) {
    if (idx < 0 || idx >= sections.length) return;
    currentIdx = idx;
    sections[idx].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      scrollToSection(currentIdx + 1);
    }
    if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      scrollToSection(currentIdx - 1);
    }
  });

  // Update current index on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        currentIdx = sections.indexOf(entry.target);
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => observer.observe(s));
}

/* =====================================================
   INIT
===================================================== */

window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initThemeToggle();
  initKeyboardNav();

  initSection1();
  initSection2();
  initSection3();
  initSection4();
  initSection5();
  initSection6();
});
