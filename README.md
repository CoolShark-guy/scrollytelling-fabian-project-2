# Lost in the Scroll

A scrollytelling site tracing a JavaScript learning journey through the metaphor of Johnny Silverhand's consciousness stored as an engram on a Relic chip from Cyberpunk 2077.

**Live site:** https://coolshark-guy.github.io/scrollytelling-fabian-project-2/
**Repository:** https://github.com/CoolShark-guy/scrollytelling-fabian-project-2

---

## What This Is

Lost in the Scroll is a six-section scrollytelling website built for DESN378 Code and Design 2. Each section maps a JavaScript concept onto a moment from the Cyberpunk 2077 narrative. The site uses GSAP and ScrollTrigger to drive all motion, a custom design token system for visual consistency, and Three.js for the chip descent animation between sections 01 and 02.

The site is built with plain HTML, CSS, and JavaScript. No frameworks.

---

## How It Works

`index.html` contains all six sections and the transition elements between them. Sections are laid out in document order and scroll is the only navigation.

`styles/variables.css` defines the full design token system: primitive color values, semantic tokens mapped to dark and light modes, typography scale, and spacing. Everything in the stylesheet references these tokens rather than raw values.

`styles/styles.css` handles layout, component styles, and animation initial states. Elements that animate in start hidden here via `opacity: 0` or `transform` values so there is no flash of unstyled content before GSAP takes over.

`scripts/main.js` initializes all GSAP animations and ScrollTrigger instances. Each section has its own `initSectionN()` function to keep the code organized. A `reducedMotion` check at the top wraps all animation code so the site remains fully readable with motion disabled.

`assets/` contains the Relic chip GLB model used by Three.js, the branch SVG, and supporting images.

---

## Key Design Choices

The color system runs on two collections: primitive tokens that store raw hex values, and semantic tokens that reference those primitives by purpose. Dark mode is the default. Light mode swaps surface and text values. Red and cyan stay fixed across both modes because they carry narrative meaning as signal and glitch colors respectively.

The type system uses two faces only: Orbitron for headings and labels, Rajdhani for body text. Share Tech Mono is used for code-flavored data entries in the section 02 status window. No system fonts appear in the final design.

Motion is intentional and minimal. The chip pulse rings in section 01 loop continuously as a passive ambient effect. Glitch effects fire once at a scroll threshold and settle. The scroll-scrubbed branch drawing between sections 01 and 02 shifts color from red to cyan as each segment draws, marking the transition from signal to data.

---

## Tech Stack

- HTML, CSS, JavaScript
- GSAP 3.13 + ScrollTrigger + ScrollSmoother
- Three.js r128 + GLTFLoader
- Google Fonts (Orbitron, Rajdhani)
- GitHub Pages for deployment

---

## Reflection

### The Metaphor

In Cyberpunk 2077, the Relic is a biochip made by the megacorporation Arasaka. After a heist goes wrong, the main character V ends up with the chip installed in their head. The chip saves V's life by rebuilding their brain after a fatal injury, but in doing so it bonds with V's DNA and with the engram of Johnny Silverhand stored on it. Two identities, one system, one condition deciding which one surfaces at any given moment.

That maps to JavaScript in a specific way. You have to actually learn the language to control what gets built. Not just copy and paste, not just prompt an AI and ship the output, but understand what the code is doing so you can supervise it, fix it when it breaks, and make intentional decisions. The chip doesn't ask if V understands it. It runs. JavaScript works the same way.

### Section I'm Most Proud Of

The chip descent at the transition between sections 01 and 02. It uses Three.js with an orthographic camera so the chip looks flat and integrated into the page rather than floating in perspective space. The descent is scroll-scrubbed via ScrollTrigger so the chip moves exactly as fast as you scroll. At 80% progress a snap fires once, triggering a camera shake and three pulse rings that scale outward using `RingGeometry`. The branch SVG paths below draw themselves segment by segment, each shifting color from red to cyan as they enter the viewport. Getting all of that to work together and feel like one continuous moment was the hardest part of the build and the part I learned the most from.

### A Bug I Had to Solve

The biggest bug was in section 02. HTML attributes in `index.html` were using curly smart quotes instead of straight ASCII quotes. CSS selectors like `.section--first-contact` never matched because the class names in the DOM contained different characters than what the stylesheet expected. Nothing was broken in a way that threw an error. The section just silently had no styles applied. The fix was replacing every curly quote in attribute values with standard double quotes. It took a while to find because it was invisible in most editors.

### An Accessibility Decision

Decorative SVGs and the Three.js canvas have `aria-hidden="true"` applied. The chip descent animation and the branch drawing are purely visual. Hiding them from the accessibility tree means a screen reader skips over meaningless canvas and SVG content rather than announcing it. The actual narrative content in each section is in semantic HTML and is fully readable without any of the motion.

### What I Would Improve With More Time

A few transitions didn't make it into the final build the way I planned. The Arasaka logo sequence between sections 03 and 04 went through a lot of iterations and the timing never fully resolved. With more time I would go back to those transitions with a clearer understanding of how to debug GSAP timelines step by step rather than re-prompting until something worked. More broadly I want to get better at supervising AI-assisted code, reading what gets generated carefully enough to catch issues before they compound across multiple sessions.