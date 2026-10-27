# Pooja T - Developer Portfolio 🚀

A high-performance, modern portfolio website showcasing full-stack web engineering, applied artificial intelligence, and academic achievements.

## 🌟 Key Highlights & Features

- **Modern Glassmorphic UI/UX**: Designed with curated dark and light color systems, subtle gradients, and ambient canvas particle animations.
- **Dynamic Theme Switcher**: Instant Dark / Light mode toggle with state persisted via `localStorage`.
- **Interactive Role Typing Animation**: Cycling through core specialties (*Full-Stack Developer*, *Applied AI & ML Enthusiast*, *Python Specialist*, *BCA Scholar*).
- **Interactive Technical Arsenal**: Categorized technical skills with fast tab filtering (Languages, Frontend, Backend, AI & Vision, Tools).
- **Featured Projects with Deep-Dive Modals**:
  - **AI-Adaptive Training Dashboard**: Real-time learning platform with optimistic UI updates and live teacher synchronization.
  - **Leaf Health Check AI**: Deep learning plant disease classifier powered by EfficientNetB0, Streamlit, and OpenCV with sub-2s inference.
  - **E-Commerce Sports Kit**: Full-stack web store with structured catalog and real-time order tracking.
  - **Student Score & Certificate Calculator**: Predictive academic modeling with dynamic certificate rendering.
- **Professional Experience Timeline**: Documented internships at *Entry Kode* and *Coin Cent*.
- **Direct Resume Access**: 1-click download of official CV (`file.pdf`) and in-browser preview.
- **Interactive Contact Hub**: 1-click email/phone copying, direct social links, and an interactive contact form.

## 🛠️ Tech Stack

- **Markup & Semantics**: HTML5 (SEO-optimized semantic tags, accessibility attributes)
- **Styling**: Vanilla CSS (Custom properties, flexbox/grid layouts, glassmorphism, responsive breakpoints)
- **Interactivity**: Vanilla JavaScript (ES6+, DOM manipulation, canvas particles, scroll-spy, modal management)
- **Typography**: Google Fonts (*Plus Jakarta Sans* & *JetBrains Mono*)

## 📂 Project Structure

```
portfolio/
├── index.html        # Main semantic HTML structure
├── style.css         # Modern design tokens, variables, & responsive styling
├── script.js         # Theme toggle, typing effect, modals & filtering
├── file.pdf          # Official Resume
├── img.jpeg          # Profile photograph
└── images/           # High-resolution project mockups & assets
    ├── ai_dashboard.jpg
    ├── leaf_health.jpg
    ├── sports_kit.jpg
    └── score_calc.jpg
```

## 🚀 Running Locally

You can preview the portfolio using any static file server:

```bash
# Using Node / npx serve
npx -y serve -l 5173 .

# Or using Python
python -m http.server 5173
```

Then open `http://localhost:5173` in your browser.