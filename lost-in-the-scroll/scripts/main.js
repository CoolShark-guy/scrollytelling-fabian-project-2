/* ============================================================
   MAIN.JS — LOST IN THE SCROLL
   Build 8: ScrollTrigger-driven animations.
   ============================================================ */

/* =====================================================
   PLUGIN REGISTRATION
===================================================== */

gsap.registerPlugin(ScrollTrigger);

// Premium plugins — now free
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
===================================================== */

function initSection1() {
  if (reducedMotion) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.section--opening',
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });
  tl
    .fromTo('.opening__text h1', { y: 40, opacity: 0 }, { y: 0, opacity: 1, ease: 'power3.out', duration: 1 })
    .fromTo('.opening__text p', { y: 24, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out', duration: 0.8 }, '-=0.4')
    .fromTo('.opening__concept', { x: -20, opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out', duration: 0.8 }, '-=0.3')
    .fromTo('.section--opening .section__label', { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.5');

  // Chip pulse rings scale up on scroll, scrubbed
  gsap.to('.chip-pulse-ring', {
    scale: 2.5,
    opacity: 0,
    stagger: 0.2,
    ease: 'power1.out',
    scrollTrigger: {
      trigger: '.section--opening',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    }
  });
}

/* =====================================================
   SECTION 2 — FIRST CONTACT
===================================================== */

function initSection2() {
  const revealMask = document.querySelector('.first-contact__reveal-mask');
  const activationPulse = document.querySelector('.first-contact__activation-pulse');

  if (reducedMotion) {
    if (revealMask) {
      gsap.set(revealMask, { display: 'none' });
    }
    if (activationPulse) {
      gsap.set(activationPulse, { display: 'none' });
    }
    return;
  }

  if (revealMask) {
    gsap.set(revealMask, {
      scale: 2,
      opacity: 1,
      xPercent: -50,
      yPercent: -50,
    });
  }

  if (revealMask || activationPulse) {
    const activationTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section--first-contact',
        start: 'top 30%',
        toggleActions: 'play none none reverse',
      }
    });

    if (revealMask) {
      activationTl.to(revealMask, {
        scale: 0,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      }, 0);
    }

    if (activationPulse) {
      activationTl.fromTo(activationPulse,
        {
          scale: 0.2,
          opacity: 1,
        },
        {
          scale: 26,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.out',
        },
        0
      );
    }
  }

  // Status window live values
  const swHeartRate  = document.getElementById('sw-heart-rate');
  const swCoreTemp   = document.getElementById('sw-core-temp');
  const swEngram     = document.getElementById('sw-engram-status');
  const swSignal     = document.getElementById('sw-signal');
  const swSignalFill = document.getElementById('sw-signal-fill');
  const swMemory     = document.getElementById('sw-memory');
  const swMemoryFill = document.getElementById('sw-memory-fill');
  const swThreat     = document.getElementById('sw-threat');

  const BAR_MAX_W = 150;
  const engramStates = ['READING...', 'INDEXING..', 'ACTIVE    ', 'SYNC OK   ', 'WRITING.. '];
  const threatStates = ['LOW', 'LOW', 'LOW', 'MEDIUM', 'LOW'];

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function tickStatusWindow() {
    if (swHeartRate)  swHeartRate.textContent  = Math.round(rand(68, 82)) + ' BPM';
    if (swCoreTemp)   swCoreTemp.textContent   = rand(36.2, 37.1).toFixed(1) + '°C';
    if (swEngram)     swEngram.textContent     = engramStates[Math.floor(Math.random() * engramStates.length)];

    const sig = Math.round(rand(55, 95));
    if (swSignalFill) swSignalFill.setAttribute('width', Math.round((sig / 100) * BAR_MAX_W));
    if (swSignal)     swSignal.textContent     = sig + '%';

    const mem = Math.round(rand(60, 85));
    if (swMemoryFill) swMemoryFill.setAttribute('width', Math.round((mem / 100) * BAR_MAX_W));
    if (swMemory)     swMemory.textContent     = mem + '%';

    if (swThreat)     swThreat.textContent     = threatStates[Math.floor(Math.random() * threatStates.length)];
  }

  setInterval(tickStatusWindow, 1200);

  // Header and window entrance
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.section--first-contact',
      start: 'top 75%',
      toggleActions: 'play none none none',
    }
  });
  tl
    .fromTo('.first-contact__header', { x: -30, opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out', duration: 0.8 })
    .fromTo('.status-window-svg-wrap', { y: 40, opacity: 0 }, { y: 0, opacity: 1, ease: 'power3.out', duration: 1 }, '-=0.4')
    .fromTo('.first-contact__copy', { y: 20, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out', duration: 0.7 }, '-=0.5')
    .fromTo('.first-contact__concept', { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.3')
    .fromTo('.waveform-svg', { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.3');

  // Ghost window parallax — each layer moves at a different speed scrubbed to scroll
  const ghostSpeeds = [20, 35, 50, 65, 80];
  document.querySelectorAll('.ghost-window').forEach((el, i) => {
    gsap.to(el, {
      y: ghostSpeeds[i] || 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.section--first-contact',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });
  });
}

/* =====================================================
   SECTION 3 — NAMING THINGS
===================================================== */

function initSection3() {
  const namingSection = document.querySelector('.section--naming');

  if (reducedMotion) {
    // Reduced motion: plain fade, no glitch
    if (namingSection) {
      gsap.fromTo(namingSection, { opacity: 0 }, {
        opacity: 1, duration: 0.6,
        scrollTrigger: { trigger: namingSection, start: 'top 80%', once: true }
      });
    }
    return;
  }

  // Glitch entrance — repeats on each scroll pass
  let glitchTimeout = null;
  function triggerGlitch() {
    if (glitchTimeout) clearTimeout(glitchTimeout);
    namingSection.classList.remove('is-glitching');
    void namingSection.offsetWidth; // force reflow to restart animation
    namingSection.classList.add('is-glitching');
    glitchTimeout = setTimeout(() => namingSection.classList.remove('is-glitching'), 460);
  }

  if (namingSection) {
    ScrollTrigger.create({
      trigger: namingSection,
      start: 'top 90%',
      end: 'top 10%',
      onEnter: () => { console.log('glitch onEnter'); triggerGlitch(); },
      onEnterBack: () => { console.log('glitch onEnterBack'); triggerGlitch(); },
    });
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.section--naming',
      start: 'top 70%',
      toggleActions: 'play none none none',
    }
  });
  tl
    .fromTo('.naming__heading', { y: 30, opacity: 0 }, { y: 0, opacity: 1, ease: 'power3.out', duration: 0.8 })
    .fromTo('.naming__divider', { scaleX: 0 }, { scaleX: 1, ease: 'power2.out', duration: 0.6 }, '-=0.3')
    .fromTo('.naming__body', { opacity: 0, y: 16 }, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.6 }, '-=0.2')
    .fromTo('.naming__panel--corrupt', { x: -30, opacity: 0 }, { x: 0, opacity: 1, ease: 'back.out(1.4)', duration: 0.8 }, '-=0.2')
    .fromTo('.naming__panel--named', { x: 30, opacity: 0 }, { x: 0, opacity: 1, ease: 'back.out(1.4)', duration: 0.8 }, '-=0.6')
    .fromTo('.naming__fragment', { y: 16, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, ease: 'power2.out', duration: 0.5 }, '-=0.4')
    .fromTo('.naming__caption', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2')
    .fromTo('.naming__concept', { opacity: 0, y: 12 }, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.5 }, '-=0.2');
}

/* =====================================================
   SECTION 4 — THE SWITCH
===================================================== */

function initSection4() {
  const scanWrap = document.getElementById('switch-scanlines');
  const ring = document.getElementById('arasaka-ring');
  const scanEls = [];

  if (scanWrap && !scanWrap.childElementCount) {
    for (let i = 0; i < 24; i += 1) {
      const line = document.createElement('div');
      line.className = 'scan-line';
      line.style.top = `${(i / 23) * 100}%`;
      const baseOpacity = gsap.utils.random(0.15, 0.65);
      line.dataset.baseOpacity = String(baseOpacity);
      line.style.opacity = baseOpacity;
      scanWrap.appendChild(line);
    }
  }

  scanWrap?.querySelectorAll('.scan-line').forEach((line) => {
    scanEls.push(line);
  });

  const ringLen = ring ? ring.getTotalLength() : 0;

  function resetSwitchState() {
    if (scanEls.length) {
      gsap.set(scanEls, {
        y: 0,
        opacity: (idx) => Number(scanEls[idx].dataset.baseOpacity || 0.3),
      });
    }

    gsap.set('#arasaka-wrap', { opacity: 0 });
    if (ring) {
      gsap.set(ring, {
        strokeDasharray: ringLen,
        strokeDashoffset: ringLen,
      });
    }
    gsap.set('#arasaka-logo', { opacity: 0 });
    gsap.set('#switch-flash', { opacity: 0 });
    gsap.set('.switch__col--v', { x: '-100%' });
    gsap.set('.switch__col--johnny', { x: '100%' });
    gsap.set('.switch__bg--dark, .switch__bg--light', { opacity: 0 });
    gsap.set('.switch__header', { opacity: 0 });
    gsap.set('.switch__footer', { opacity: 0 });
    gsap.set('#glitch-red, #glitch-cyan', { opacity: 0, x: 0 });
    gsap.set('#condition-label', { opacity: 0 });
  }

  function runSwitchTimeline() {
    const half = Math.ceil(scanEls.length / 2);
    const topHalf = scanEls.slice(0, half);
    const bottomHalf = scanEls.slice(half);

    const tl = gsap.timeline();

    tl.to(topHalf, {
      y: '50vh',
      duration: 0.9,
      ease: 'power3.in',
      stagger: { each: 0.02, from: 'end' },
    }, 0)
      .to(bottomHalf, {
        y: '-50vh',
        duration: 0.9,
        ease: 'power3.in',
        stagger: { each: 0.02, from: 'start' },
      }, 0)
      .to(scanEls, { opacity: 0, duration: 0.2 }, '-=0.08')
      .to('#arasaka-wrap', { opacity: 1, duration: 0.15 }, '-=0.05')
      .to('#arasaka-ring', {
        strokeDashoffset: 0,
        duration: 0.7,
        ease: 'power2.inOut',
      }, '<')
      .to('#arasaka-logo', { opacity: 1, duration: 0.2 }, '>-0.02')
      .set('#switch-flash', { opacity: 1 })
      .to('#switch-flash', { opacity: 0, duration: 0.25 }, '<')
      .to('#arasaka-wrap', { opacity: 0, duration: 0.25 }, '<')
      .to('.switch__bg--dark, .switch__bg--light', { opacity: 1, duration: 0.3 }, '<')
      .to('.switch__col--v', {
        x: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
      .to('.switch__col--johnny', {
        x: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '<')
      .to('.switch__header, .switch__footer', {
        opacity: 1,
        duration: 0.4,
      }, '>-0.02')
      .to('#glitch-red', {
        x: -8,
        opacity: 0.16,
        duration: 0.06,
        ease: 'none',
      })
      .to('#glitch-cyan', {
        x: 8,
        opacity: 0.16,
        duration: 0.06,
        ease: 'none',
      }, '<')
      .to('#glitch-red, #glitch-cyan', {
        x: 0,
        opacity: 0,
        duration: 0.08,
        ease: 'none',
      })
      .to('#glitch-red', {
        x: -4,
        opacity: 0.1,
        duration: 0.05,
        ease: 'none',
      })
      .to('#glitch-cyan', {
        x: 4,
        opacity: 0.1,
        duration: 0.05,
        ease: 'none',
      }, '<')
      .to('#glitch-red, #glitch-cyan', {
        x: 0,
        opacity: 0,
        duration: 0.08,
        ease: 'none',
      })
      .to('#condition-label', {
        opacity: 1,
        duration: 0.25,
      });

    return tl;
  }

  resetSwitchState();

  if (reducedMotion) return;

  ScrollTrigger.create({
    trigger: '#the-switch',
    start: 'top 92%',
    onEnter: () => { runSwitchTimeline(); },
    onLeaveBack: () => { resetSwitchState(); },
  });
}

/* =====================================================
   SECTION 5 — THE MEMORY
===================================================== */

function initSection5() {
  if (reducedMotion) return;

  // Header and entries entrance
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.section--memory',
      start: 'top 70%',
      toggleActions: 'play none none none',
    }
  });
  tl
    .fromTo('.memory__header', { opacity: 0, y: 24 }, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.8 })
    .fromTo('.data-entry', { x: -30, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.15, ease: 'power2.out', duration: 0.8 }, '-=0.3')
    .fromTo('.memory__session', { opacity: 0 }, { opacity: 1, ease: 'power2.out', duration: 0.6 }, '-=0.2');

  // Data bar fills expand scrubbed to scroll
  const targetWidths = ['80%', '45%', '95%'];
  document.querySelectorAll('.data-entry__bar-fill').forEach((bar, i) => {
    gsap.fromTo(bar,
      { width: '0%' },
      {
        width: targetWidths[i] || '80%',
        ease: 'power1.out',
        scrollTrigger: {
          trigger: bar.closest('.data-entry'),
          start: 'top 80%',
          end: 'top 40%',
          scrub: 1,
        }
      }
    );
  });
}

/* =====================================================
   SECTION 6 — CLOSING
===================================================== */

function initSection6() {
  if (reducedMotion) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.section--closing',
      start: 'top 70%',
      toggleActions: 'play none none none',
    }
  });
  tl
    .fromTo('.closing__end-label', { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' })
    .fromTo('.eye-branches-svg', { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, ease: 'power3.out', duration: 1.2, transformOrigin: 'center center' }, '-=0.2')
    .fromTo('.eye-main-svg', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, ease: 'power2.out', duration: 0.8 }, '-=0.6')
    .fromTo('.closing__headline', { y: 30, opacity: 0 }, { y: 0, opacity: 1, ease: 'power3.out', duration: 1 }, '-=0.3')
    .fromTo('.closing__body', { y: 20, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out', duration: 0.8 }, '-=0.5')
    .fromTo('.closing__engram', { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.3');
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
   TRANSITION 01 → 02 — Three.js chip drop + snap
===================================================== */

function initTransition0102() {
  if (reducedMotion) return;

  const canvas = document.getElementById('chip-canvas');
  if (!canvas) return;

  // ============================================================
  // THREE.JS SETUP — orthographic camera, transparent background
  // ============================================================

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();

  const aspect = canvas.offsetWidth / canvas.offsetHeight;
  const frustumSize = 4;
  const camera = new THREE.OrthographicCamera(
    (frustumSize * aspect) / -2,
    (frustumSize * aspect) / 2,
    frustumSize / 2,
    frustumSize / -2,
    0.1,
    100
  );
  camera.position.set(0, 0, 5);
  camera.lookAt(0, 0, 0);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLight.position.set(2, 4, 5);
  scene.add(dirLight);

  // ============================================================
  // LOAD CHIP GLB
  // ============================================================

  let chipGroup = null;
  const CHIP_START_Y = 6;
  const CHIP_END_Y = 0;

  const loader = new THREE.GLTFLoader();
  loader.load(
    'assets/RELIC_3D.glb',
    function (gltf) {
      chipGroup = gltf.scene;
      const box = new THREE.Box3().setFromObject(chipGroup);
      const center = box.getCenter(new THREE.Vector3());
      chipGroup.position.sub(center);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      chipGroup.scale.setScalar(2.5 / maxDim);
      chipGroup.position.y = CHIP_START_Y;
      chipGroup.position.x = 0.02; // nudge right — increase to move more, negative to go left
      chipGroup.rotation.x = 0;  // tilt forward/back
      chipGroup.rotation.y = Math.PI / 2;  // spin left/right
      chipGroup.rotation.z = 0;  // rotate in screen plane (like a clock)
      scene.add(chipGroup);
    },
    undefined,
    function (error) { console.error('GLTFLoader error:', error); }
  );

  // ============================================================
  // PULSE RINGS
  // ============================================================

  const rings = [];
  for (let i = 0; i < 3; i++) {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.3, 0.38, 48),
      new THREE.MeshBasicMaterial({ color: 0xed0048, side: THREE.DoubleSide, transparent: true, opacity: 0 })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.scale.setScalar(0.1);
    scene.add(ring);
    rings.push(ring);
  }

  // ============================================================
  // RENDER LOOP
  // ============================================================

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  // ============================================================
  // RESIZE
  // ============================================================

  window.addEventListener('resize', () => {
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    renderer.setSize(w, h);
    const newAspect = w / h;
    camera.left = (frustumSize * newAspect) / -2;
    camera.right = (frustumSize * newAspect) / 2;
    camera.updateProjectionMatrix();
  });

  // ============================================================
  // SCROLL-DRIVEN ANIMATION
  // CHIP DESCENT — pinned, short scroll
  // ============================================================

  let snapped = false;

  ScrollTrigger.create({
    trigger: '.transition-01-02',
    start: 'top top',
    end: '+=100%',
    pin: true,
    scrub: 1,
    onUpdate: (self) => {
      const p = self.progress;

      // Chip descends (0–80%)
      if (chipGroup) {
        if (p < 0.8) {
          const t = p / 0.8;
          const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          chipGroup.position.y = CHIP_START_Y + (CHIP_END_Y - CHIP_START_Y) * eased;
        } else {
          chipGroup.position.y = CHIP_END_Y;
        }
      }

      // Snap fires once at 80%
      if (p >= 0.8 && !snapped) {
        snapped = true;
        gsap.to(canvas, {
          x: -6, duration: 0.05, ease: 'power1.out',
          yoyo: true, repeat: 5,
          onComplete: () => gsap.set(canvas, { x: 0 }),
        });
        rings.forEach((ring, i) => {
          gsap.to(ring.material, { opacity: 0.8, duration: 0.1, delay: i * 0.12 });
          gsap.to(ring.scale, { x: 4 + i * 1.5, y: 4 + i * 1.5, z: 4 + i * 1.5, duration: 0.8, delay: i * 0.12, ease: 'power2.out' });
          gsap.to(ring.material, { opacity: 0, duration: 0.6, delay: i * 0.12 + 0.2 });
        });
      }

      if (p < 0.7) {
        snapped = false;
        rings.forEach((ring) => { ring.scale.setScalar(0.1); ring.material.opacity = 0; });
      }
    },
  });

  // ============================================================
  // BRANCHES — scroll-scrubbed, not pinned
  // Reveals top-to-bottom via clip-path as you scroll through
  // Stroke color shifts from signal red (#ED0048) to glitch cyan (#00F0FF)
  // ============================================================

  const segments = document.querySelectorAll('.branch-seg');

  if (segments.length) {
    segments.forEach((seg) => {
      const len = seg.getTotalLength();
      seg.setAttribute('stroke-dasharray', len);
      seg.setAttribute('stroke-dashoffset', len);

      ScrollTrigger.create({
        trigger: seg,
        start: 'top bottom',
        end: 'bottom 15%',
        scrub: 0.4,
        onUpdate: (self) => {
          const p = self.progress;
          seg.setAttribute('stroke-dashoffset', len * (1 - p));

          // Color shift follows each segment's viewport progress.
          const r = Math.round(237 + (255 - 237) * p);
          const g = Math.round(0 + 246 * p);
          const b = Math.round(72 - 72 * p);
          seg.setAttribute('stroke', `rgb(${r}, ${g}, ${b})`);
        },
      });
    });
  }

}

/* =====================================================
   TRANSITION 02–03: Heartbeat draw
===================================================== */

function initTransition0203() {
  if (reducedMotion) return;

  const path = document.getElementById('heartbeat-path');
  if (!path) return;

  const len = path.getTotalLength();
  path.setAttribute('stroke-dasharray', len);
  path.setAttribute('stroke-dashoffset', len);

  ScrollTrigger.create({
    trigger: '.transition-02-03',
    start: 'top 80%',
    end: 'bottom 20%',
    scrub: 1,
    onUpdate: (self) => {
      path.setAttribute('stroke-dashoffset', len * (1 - self.progress));
    },
  });
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
  initTransition0102();
  initTransition0203();
});
