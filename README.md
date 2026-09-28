# Rampally Neeraj Chary — Personal Portfolio

A minimal, high-contrast, professional developer portfolio for Rampally Neeraj Chary, B.Tech Artificial Intelligence and Machine Learning student at DRK Institute of Science and Technology, JNTUH. Built with React 18, Vite, and modern semantic CSS (without UI frameworks or utility libraries).

---

## Quick Start

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation & Running Locally
```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

The dev server will run at: `http://localhost:3000/`.

---

## Architectural & Design Overview

- **Centered Information Architecture:** Designed for immediate clarity. Each section features centered typography, clean hierarchy, and generous whitespace.
- **Click-to-Reveal Content Pattern:** Keeps the page light and scannable while preserving full depth on demand.
  - **About Me:** Visible introductory profile; "Read More" reveals extended background details.
  - **Technical Skills:** 8 category triggers arranged in a responsive grid; clicking a category displays its skills in an inline panel.
  - **Internship:** Prominently highlights the role & company ("Machine Learning Intern — Prodigy InfoTech"); clicking expands period, responsibilities, projects, and tech stack.
  - **Featured Projects:** Clean button triggers displaying project names; clicking opens an accessible native HTML `<dialog>` modal with overview, approach, tech pills, and direct GitHub links.
  - **Certifications:** Centered entries for all 4 verified credentials; clicking reveals dates and direct links.
  - **Education:** Centered entries for B.Tech, Intermediate, and SSC with details on demand.
  - **Let's Connect:** 2-column centered grid linking mobile, email, LinkedIn, and GitHub.
- **Accessible Keyboard & Focus Management:**
  - `Escape` key closes active panels and modals.
  - Clicking outside modals or dialog backdrops dismisses them.
  - Focus returns to the triggering button upon modal close.
  - Native `<dialog>` locks background scrolling during modal presentation.
- **Real Assets Integrated:**
  - Real profile photo (`src/assets/profile.png`, `public/profile.png`) displayed with circular framing and theme borders.
  - Real resume PDF (`public/resume.pdf`) wired up to "View Resume" (opens tab) and "Download Resume".
  - Exact verified links extracted from the resume PDF.

---

## Verified Hyperlinks Reference

| Section | Target / Purpose | Destination URL | Status |
| :--- | :--- | :--- | :--- |
| **Hero / Nav** | View Resume | `/resume.pdf` | Verified (200) |
| **Hero** | Download Resume | `/resume.pdf` | Verified (200) |
| **Hero / Contact / Footer** | GitHub Profile | `https://github.com/NEERAJ-20056` | Verified (200) |
| **Hero / Contact / Footer** | LinkedIn Profile | `https://www.linkedin.com/in/rampally-neeraj-chary-9833852b6/` | Verified (200) |
| **Contact** | Mobile Calling | `tel:+918019672447` | Verified |
| **Contact / Footer** | Email | `mailto:rampallyneerajchary@gmail.com` | Verified |
| **Projects** | Customer Segmentation | `https://github.com/NEERAJ-20056/PRODIGY_ML_02` | Verified (200) |
| **Projects** | House Prices Prediction | `https://github.com/NEERAJ-20056/PRODIGY_ML_01` | Verified (200) |
| **Certifications** | Prodigy InfoTech Certificate | `https://lnkd.in/p/dRsS3Kj9` | Verified (200) |
| **Certifications** | Cisco / IBM SkillsBuild Certificate | `https://lnkd.in/p/d6iDR-Et` | Verified (200) |
| **Certifications** | Kitech Certificate | `https://lnkd.in/p/dWd-cVeC` | Verified (200) |
| **Certifications** | CodSoft Certificate | `https://lnkd.in/p/df98CMCr` | Verified (200) |

---

## Project Structure

```
Neeraj-Portfolio/
├── public/
│   ├── favicon.svg              # Minimal monogram favicon
│   ├── profile.png              # Profile photo (public fallback)
│   ├── profile.jpg              # Profile photo
│   └── resume.pdf               # Original resume PDF (101,352 bytes)
├── src/
│   ├── assets/
│   │   ├── profile.png          # Real portrait photo
│   │   └── profile.jpg          # Real portrait photo
│   ├── components/
│   │   ├── Footer.jsx           # Centered footer with social links & copyright
│   │   ├── Icons.jsx            # Clean, inline SVGs (Github, LinkedIn, Mail, Phone, etc.)
│   │   ├── InitialsAvatar.jsx   # Profile portrait image with fallback handling
│   │   ├── Navbar.jsx           # Fixed header with active scroll spy & mobile drawer
│   │   ├── SectionHeading.jsx   # Clean centered section titles (no eyebrows)
│   │   └── ThemeToggle.jsx      # Dark/light theme switcher with persistence
│   ├── data/
│   │   ├── certifications.js    # 4 verified certifications & links
│   │   ├── education.js         # Exact educational history
│   │   ├── internship.js        # Prodigy InfoTech ML internship details
│   │   ├── profile.js           # Student profile, bio, and contact information
│   │   ├── projects.js          # Featured projects & verified GitHub repos
│   │   └── skills.js            # 8 categorized technical skill groups
│   ├── sections/
│   │   ├── About.jsx            # About Me with expandable intro
│   │   ├── Certifications.jsx   # Centered list with accordion panels
│   │   ├── Contact.jsx          # Centered 2-column contact cards
│   │   ├── Education.jsx        # Centered list with accordion panels
│   │   ├── Hero.jsx             # Photo, title, resume CTAs, social links
│   │   ├── Internship.jsx       # Internship trigger with expandable panel
│   │   ├── Projects.jsx         # Project triggers & native HTML <dialog> modal
│   │   └── Skills.jsx           # 8 centered category buttons & skill pills
│   ├── styles/                  # Clean modern CSS (tokens, base, component styles)
│   ├── App.jsx                  # Main application container
│   ├── index.css                # Global style loader
│   └── main.jsx                 # React root mount
├── CODE_NOTES.md                # Architectural documentation & maintenance guide
├── package.json
└── vite.config.js
```
