/* ============================================================
   MAIN.JS — LOST IN THE SCROLL
   GSAP + ScrollTrigger scaffolded.
   Animations will be wired in Build 7-2.
   ============================================================ */

/* =====================================================
   PLUGIN REGISTRATION
===================================================== */

gsap.registerPlugin(ScrollTrigger);

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
   Showpiece: chip descends and plugs into socket.
   Pulse rings build after chip seats.
===================================================== */

function initSection1() {
  if (reducedMotion) return;

  // TODO Build 7-2: pinned timeline
  // Chip descends (scrubbed to scroll)
  // Snap flash on seat
  // Pulse rings build sequentially

  gsap.from('.opening__text h1', {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.section--opening',
      start: 'top 80%',
    }
  });

  gsap.from('.opening__text p', {
    y: 24,
    opacity: 0,
    duration: 0.8,
    delay: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.section--opening',
      start: 'top 80%',
    }
  });

  gsap.from('.opening__concept', {
    x: -20,
    opacity: 0,
    duration: 0.8,
    delay: 0.4,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.section--opening',
      start: 'top 80%',
    }
  });
}

/* =====================================================
   SECTION 2 — FIRST CONTACT
   Status window scales down from near-fullscreen.
   Waveform draws itself (DrawSVGPlugin).
   Ghost windows parallax behind.
===================================================== */

function initSection2() {
  if (reducedMotion) return;

  // TODO Build 7-2: pinned timeline
  // Yellow bg glows in from black
  // Status window scales from fullscreen → contained
  // DrawSVGPlugin: waveform draws on scroll
  // Ghost windows parallax at 0.2x / 0.5x depth

  gsap.from('.status-window-svg-wrap', {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.section--first-contact',
      start: 'top 70%',
    }
  });

  gsap.from('.first-contact__header', {
    x: -30,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.section--first-contact',
      start: 'top 75%',
    }
  });
}

/* =====================================================
   SECTION 3 — NAMING THINGS
   Panel borders draw in (DrawSVGPlugin).
   Divider line draws center outward.
   Variable bars scale up width, staggered.
   JS concept types on per-character.
===================================================== */

function initSection3() {
  if (reducedMotion) return;

  // TODO Build 7-2:
  // DrawSVGPlugin on panel borders and divider
  // clipPath reveal on .var-bar__fill elements, staggered
  // SplitText / TextPlugin for concept typing effect

  gsap.from('.naming__panel', {
    opacity: 0,
    y: 30,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.naming__panels',
      start: 'top 80%',
    }
  });

  gsap.from('.naming__heading', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.section--naming',
      start: 'top 75%',
    }
  });
}

/* =====================================================
   SECTION 4 — THE SWITCH
   SHOWPIECE: 6-step pinned timeline.
   1. Scan lines converge
   2. Arasaka logo fades in
   3. Red flash
   4. DrawSVGPlugin: crack fractures outward
   5. V side slides in from left
   6. Johnny side slides in from right (+ glitch)
===================================================== */

function initSection4() {
  if (reducedMotion) return;

  // TODO Build 7-2: full pinned timeline
  // ScrollTrigger pin on .section--switch
  // 6-step sequence as GSAP timeline labels

  gsap.from('.switch__side--v', {
    x: -60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.section--switch',
      start: 'top 70%',
    }
  });

  gsap.from('.switch__side--johnny', {
    x: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.section--switch',
      start: 'top 70%',
    }
  });

  gsap.from('.switch__condition', {
    opacity: 0,
    duration: 0.6,
    delay: 0.8,
    scrollTrigger: {
      trigger: '.section--switch',
      start: 'top 70%',
    }
  });
}

/* =====================================================
   SECTION 5 — THE MEMORY
   Data bar widths scrubbed to scroll.
   Row labels type in per-character.
   Glitch fires ONCE at scroll threshold.
===================================================== */

function initSection5() {
  if (reducedMotion) return;

  // TODO Build 7-2:
  // ScrollTrigger scrub on bar widths
  // Per-character typing on .data-entry__key (TextPlugin / SplitText)
  // One-shot glitch (color channel split) via ScrollTrigger onEnter

  gsap.from('.data-entry', {
    x: -30,
    opacity: 0,
    stagger: 0.12,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.memory__data',
      start: 'top 80%',
    }
  });

  gsap.from('.memory__session', {
    opacity: 0,
    duration: 0.8,
    delay: 0.4,
    scrollTrigger: {
      trigger: '.memory__data',
      start: 'top 80%',
    }
  });
}

/* =====================================================
   SECTION 6 — CLOSING
   Eye lids pull apart (power2.inOut, slow).
   Branches draw outward (DrawSVGPlugin).
   Headline fades up after branches complete.
   Body + engram dot follow.
===================================================== */

function initSection6() {
  if (reducedMotion) return;

  // TODO Build 7-2: pinned timeline
  // Eye lids open — power2.inOut, deliberate pace
  // DrawSVGPlugin on branch paths
  // Headline fades up after branches
  // Body + dot sequential follow

  gsap.from('.closing__headline', {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.section--closing',
      start: 'top 70%',
    }
  });

  gsap.from('.closing__body', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    delay: 0.3,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.section--closing',
      start: 'top 70%',
    }
  });

  gsap.from('.closing__engram', {
    opacity: 0,
    duration: 0.6,
    delay: 0.6,
    scrollTrigger: {
      trigger: '.section--closing',
      start: 'top 70%',
    }
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
