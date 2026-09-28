# Architecture & Implementation Notes: Neeraj Portfolio

This document provides a technical and design reference for the Rampally Neeraj Chary personal portfolio codebase.

---

## 1. Design Philosophy & Architectural Principles

1. **Information Architecture (Click-to-Reveal)**:
   - Rather than presenting long walls of static text, each section initially presents only the most critical anchors (e.g. project names, skill categories, role title, certification titles).
   - Clicking reveals rich supplementary details inline or within a focused modal dialog.
   - This keeps cognitive load low, maximizes scan-efficiency, and delivers an uncluttered, premium reading experience.

2. **Zero External CSS Frameworks**:
   - The project uses standard CSS variables (tokens) defined in `src/styles/variables.css`.
   - Layout relies on CSS Grid and Flexbox with responsive breakpoints (`640px`, `768px`, `1024px`).
   - Clean, lightweight bundle size (< 30 KB gzipped CSS) with zero runtime CSS overhead.

3. **No Redundant Eyebrows or Fluff**:
   - All legacy label eyebrows (`BACKGROUND`, `CAPABILITIES`, `EXPERIENCE`, etc.) have been removed.
   - Section titles are clean, bold, centered H2 headings (`About Me`, `Technical Skills`, `Internship`, `Featured Projects`, `Certifications`, `Education`, `Let's Connect`).

4. **Honest, Factually Accurate Student Representation**:
   - Strictly faithful to the candidate's actual credentials as a B.Tech AIML student.
   - No hyperbolic labels ("senior", "expert", "full-stack wizard").
   - Real metrics and verified URLs directly extracted from the PDF resume annotations.

---

## 2. Interaction Models

### A. Inline Detail Panels (`About.jsx`, `Skills.jsx`, `Internship.jsx`, `Certifications.jsx`, `Education.jsx`)
- **Trigger**: Semantic `<button type="button">` with `aria-expanded` and `aria-controls`.
- **Display**: Smoothly animates into view (`panelFadeIn`) beneath the trigger.
- **Escape Key**: Global keydown listener dismisses the open panel when `Escape` is pressed.
- **Close Button**: Each panel includes an explicit `&times; Close` button for accessible point-and-click dismissal.

### B. Native HTML `<dialog>` Modal (`Projects.jsx`)
- **Trigger**: Project card buttons in a centered list.
- **Presentation**: Uses browser-native `<dialog>` via `dialogRef.current.showModal()`.
- **Accessibility & Focus**:
  - Automatically captures tab focus within the modal.
  - Automatically locks background body scroll (`document.body.style.overflow = 'hidden'`).
  - Upon closing, restores body scroll and returns focus to `lastActiveTriggerRef.current`.
- **Dismissal**:
  - Pressing `Escape` triggers the native `cancel` event, caught and handled cleanly.
  - Clicking on the modal backdrop (`::backdrop`) dismisses the dialog.
  - Explicit header `&times;` close button.

### C. Dark / Light Theme System (`ThemeToggle.jsx`)
- Checks `localStorage` first, falls back to `prefers-color-scheme: dark`.
- Sets `data-theme="dark"` or `data-theme="light"` on `document.documentElement`.
- In-head inline script in `index.html` initializes the attribute before first paint to eliminate any theme flash.

---

## 3. Resume Field Mapping

| Resume Section | Site Section / Data File | UI Presentation |
| :--- | :--- | :--- |
| **Header (Name, Title, Contact)** | `profile.js` &rarr; `Hero.jsx`, `Contact.jsx`, `Footer.jsx` | Centered portrait photo, full name, student title, resume CTAs, contact grid with telephone & email links. |
| **Objective / Summary** | `profile.js` &rarr; `About.jsx`, `Hero.jsx` | Verified 2-sentence summary; first sentence visible, second sentence revealed via "Read More". |
| **Technical Skills (8 Categories)** | `skills.js` &rarr; `Skills.jsx` | 8 centered buttons (Programming, ML, Data & Analytics, DL & AI, Databases, Visualization, Frameworks, Tools & Cloud). Clicking reveals skill pills. |
| **Internship (Prodigy InfoTech)** | `internship.js` &rarr; `Internship.jsx` | Single centered trigger: "Machine Learning Intern — Prodigy InfoTech". Clicking reveals period (`Aug 2025`), responsibilities, 3 completed projects, tech pills. |
| **Projects (2 Entries)** | `projects.js` &rarr; `Projects.jsx` | 2 centered buttons with project names. Clicking opens `<dialog>` with overview, approach, technologies, and GitHub repo. |
| **Certifications (4 Entries)** | `certifications.js` &rarr; `Certifications.jsx` | Centered list of 4 credentials. Clicking reveals provider, dates, and verified LinkedIn certificate post link. |
| **Education (3 Entries)** | `education.js` &rarr; `Education.jsx` | Centered list: B.Tech (2023–2027), Telangana Intermediate (73.2%), SSC (10.0 CGPA). Details expand on click. |

---

## 4. How to Update Assets & Content in the Future

### To update the Profile Photo:
1. Replace `src/assets/profile.png` and `public/profile.png` with your new square portrait.
2. The UI automatically styles the photo with `object-fit: cover`, `object-position: top center`, and theme-aware borders.

### To update the Resume PDF:
1. Replace `public/resume.pdf` with the updated PDF file.
2. Both "View Resume" and "Download Resume" will immediately serve the new file.

### To add or modify Projects:
1. Open `src/data/projects.js`.
2. Add or edit an item with `id`, `title`, `overview`, `keyApproach`, `technologies`, and `githubUrl`.
3. The project list and modal dialog will render the new entry automatically.

### To add or modify Skills:
1. Open `src/data/skills.js`.
2. Edit the relevant category or add a new category object `{ id, name, skills: [...] }`.

---

## 5. Build & Verification Commands

```bash
# Verify production build compilation
npm run build

# Start local dev server on port 3000
npm run dev
```
Both the build check (`vite build`) and dev server pass with 0 errors.

---

## 6. Motion & Polish Guide

### A. Centralized Motion Tokens
Motion tokens are defined as standard CSS variables in [`src/styles/tokens.css`](file:///c:/Users/lenovo/OneDrive/Documents/Neeraj-Portfolio/src/styles/tokens.css):
- **Durations**:
  - `--duration-fast: 150ms`: Micro-interactions, hover/active states, and quick dismissals.
  - `--duration-base: 250ms`: Panel expansions, modal entrances, and navigation transitions.
  - `--duration-slow: 400ms`: Staggered hero entrance and section reveals.
- **Easings**:
  - `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`: Standard natural deceleration.
  - `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)`: Smooth symmetrical transitions.
- **Transitions**:
  - `--transition-fast: var(--duration-fast) var(--ease-out)`
  - `--transition-base: var(--duration-base) var(--ease-out)`
  - `--transition-slow: var(--duration-slow) var(--ease-out)`

### B. Expandable Panels (`grid-template-rows: 0fr -> 1fr`)
Rather than animating `height: auto` with JavaScript calculations, expandable panels use modern pure CSS grid row interpolation:
- The wrapper container has `display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--duration-base) var(--ease-out);`.
- Toggling `.is-expanded` sets `grid-template-rows: 1fr;`.
- The child container has `overflow: hidden; min-height: 0;`, creating a silky, hardware-accelerated expansion and collapse with zero layout thrashing.
- Trigger indicators (`+`) rotate `45deg` via `transform: rotate(45deg)` to smoothly turn into `×`.

### C. Project Modal Animations (`Projects.jsx`)
- **Entrance**: Native `<dialog>` animates with `@keyframes modalScaleIn` (`scale(0.97) -> scale(1)`, `opacity: 0 -> 1`) and a blurred backdrop fade (`0 -> 1`).
- **Exit**: Calling `closeProjectModal` marks `isClosing = true`, triggering `@keyframes modalScaleOut` and `backdropFadeOut`. After `180ms` (matching `--duration-fast`), `dialog.close()` is invoked, restoring background body scroll and returning focus to the trigger.
- **Under `prefers-reduced-motion: reduce`**: The modal closes synchronously without delay.

### D. Flash-Free Theme System (`ThemeToggle.jsx`)
- On initial paint, `index.html` initializes `document.documentElement.setAttribute('data-theme', theme)` before stylesheet render, eliminating theme flashing.
- Page elements do **not** run blanket `transition: all`.
- When the theme toggle is clicked, the `theme-transitioning` class is temporarily attached to `html` for `300ms` and scoped only to `background-color`, `border-color`, `color`, `fill`, `stroke`, and `box-shadow`.

### E. Sliding Navigation Active Indicator (`Navbar.jsx`)
- Tracks the active section determined by `IntersectionObserver`.
- The `.nav-active-indicator` glides along the navbar with `transform: translateX(...)` and dynamic width matching the active link, fully responsive to window resize events.

### F. File Guide for Tuning Motion
- **To adjust motion speeds**: Edit `src/styles/tokens.css` (`--duration-*` and `--ease-*`).
- **To tune hero entrance sequence**: Edit `src/styles/hero.css` (`@keyframes heroFadeInUp` and delays).
- **To tune modal scale & timing**: Edit `src/styles/projects.css` and `src/sections/Projects.jsx`.
- **To tune panel expand animation**: Edit `src/styles/base.css` (`.expandable-panel-wrapper`).

---

## 7. Runtime Guardrails & Linting

### A. Minimal Error Boundary (`src/components/ErrorBoundary.jsx`)
- Wrapped around `<App />` in `src/main.jsx`.
- Catches any unexpected rendering errors and presents an accessible, clean fallback screen with a "Reload Page" button without relying on heavy external libraries.

### B. Custom AST Linter (`scripts/lint.js`)
- Runs via `npm run lint`.
- Uses Babel parser and traverser (`@babel/parser`, `@babel/traverse`) already present in `node_modules` via `@vitejs/plugin-react` (zero added dependencies).
- Statically scans all 29 `.js` and `.jsx` files in `src/` to ensure:
  1. No undeclared identifiers/variables exist (`no-undef`).
  2. All React hooks (`useRef`, `useState`, `useEffect`, etc.) are imported from `'react'`.
  3. All custom JSX component references are defined in scope.

---

## 8. Performance & Optimization

- **Retina Image Optimization**:
  - `public/profile-opt.webp` and `src/assets/profile-opt.webp` generated at 340×340px (display size 170×170px for 2× high-DPI).
  - File size reduced from 127 KB PNG to 15.4 KB WebP (-88% asset weight).
  - Explicit `width="170" height="170"` and `fetchpriority="high"` (lowercase) prevent cumulative layout shift (CLS) and React 18 DOM attribute warnings.
- **Dependency Footprint**:
  - Evaluated OriginKit; determined pure CSS tokens + native React primitives provide superior runtime performance with 0 additional dependencies.
  - Production build bundle: `180.48 kB` JS (54.76 kB gzipped), `38.09 kB` CSS (5.84 kB gzipped).


