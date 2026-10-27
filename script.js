/**
 * POOJA T - PORTFOLIO INTERACTIVITY SCRIPT
 * Theme switching, typing effect, project filtering, modal viewer,
 * particle background, scroll-spy, copy to clipboard, contact form handling.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initNavbarScroll();
  initMobileMenu();
  initProjectFilters();
  initSkillTabs();
  initProjectModals();
  initCopyButtons();
  initContactForm();
  initParticleCanvas();
  initBackToTop();
});

/* ============================================================
   1. THEME TOGGLE (DARK / LIGHT MODE)
   ============================================================ */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('pooja_portfolio_theme') || (prefersDark ? 'dark' : 'dark');

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('pooja_portfolio_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  if (theme === 'dark') {
    // Show sun icon (to switch to light)
    icon.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
  } else {
    // Show moon icon (to switch to dark)
    icon.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
  }
}

/* ============================================================
   2. TYPING EFFECT
   ============================================================ */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const roles = [
    'Full-Stack Developer',
    'Applied AI & Machine Learning Enthusiast',
    'React.js & Node.js Developer',
    'Python & OpenCV Specialist',
    'BCA Honors Scholar (8.4 CGPA)'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ============================================================
   3. NAVBAR SCROLL & ACTIVE LINK SPY
   ============================================================ */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar blur background toggle
    if (scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active Section Detection
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ============================================================
   4. MOBILE NAVIGATION MENU
   ============================================================ */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

/* ============================================================
   5. PROJECT FILTERING
   ============================================================ */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.projects-filter .filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ============================================================
   6. SKILL CATEGORY TABS
   ============================================================ */
function initSkillTabs() {
  const tabs = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.getAttribute('data-skill-filter');

      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (target === 'all' || cardCategory === target) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ============================================================
   7. PROJECT DEEP-DIVE MODALS
   ============================================================ */
const projectDetailsData = {
  'project-adaptive-ai': {
    title: 'AI-Adaptive Training Dashboard for Personalized Learning',
    category: 'Full-Stack Web Development & Real-Time Sync',
    image: 'images/ai_dashboard.jpg',
    stack: ['React.js', 'Node.js', 'Express.js', 'REST APIs', 'React Hooks', 'Optimistic UI'],
    overview: 'An advanced educational analytics dashboard that dynamically adapts training curricula to individual student learning paces while synchronizing live teaching sessions with real-time low latency.',
    highlights: [
      'Gained full-stack engineering expertise by bridging backend REST APIs with modular React frontend components.',
      'Architected real-time Live Class synchronization using dynamic data models for scheduled educator sessions.',
      'Replaced static client-side state with optimistic UI updates via custom React hooks, achieving zero noticeable lag for interactive actions.',
      'Integrated real-time progress indicators, student mastery heatmaps, and customizable lesson modules.'
    ]
  },
  'project-leaf-health': {
    title: 'Leaf Health Check - AI-Powered Plant Disease Detection',
    category: 'Applied AI & Computer Vision',
    image: 'images/leaf_health.jpg',
    stack: ['Python', 'TensorFlow', 'EfficientNetB0', 'Streamlit', 'OpenCV', 'SQLite'],
    overview: 'An intelligent agricultural diagnostics platform capable of identifying 30+ leaf diseases across numerous crop species in under 2 seconds, empowering farmers and horticulturists with instant actionable treatment recommendations.',
    highlights: [
      'Engineered deep learning transfer models using EfficientNetB0, optimizing weights for high classification accuracy.',
      'Integrated real-time video and image preprocessing pipelines using OpenCV for automated bounding box disease isolation.',
      'Streamlined inference workflow to execute predictions in under 2 seconds on commodity hardware.',
      'Implemented lightweight SQLite database integration to log historical diagnostics and track disease spread patterns.'
    ]
  },
  'project-sports-ecommerce': {
    title: 'E-Commerce Sports Kit Platform',
    category: 'Full-Stack E-Commerce Web App',
    image: 'images/sports_kit.jpg',
    stack: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'CSS3', 'REST APIs'],
    overview: 'A robust, high-performance web storefront designed for sports athletes and enthusiasts, featuring catalog filtering, inventory pricing management, secure checkout simulation, and live order tracking.',
    highlights: [
      'Designed a relational MySQL schema structuring product catalogs, specifications, order details, and customer profiles.',
      'Constructed a live order status pipeline enabling customers to track purchase milestones in real time.',
      'Optimized asset loading and mobile-first responsive layouts, ensuring seamless performance across mobile and desktop devices.',
      'Built a reactive shopping cart with dynamic tax, discounts, and order summary computations.'
    ]
  },
  'project-score-calculator': {
    title: 'Student Academic Score & Certificate Calculator',
    category: 'Academic Analytics & Document Automation',
    image: 'images/score_calc.jpg',
    stack: ['JavaScript', 'Python', 'DOM Manipulation', 'Dynamic Templates', 'UI/UX Design'],
    overview: 'An automated academic utility built to forecast student performance outcomes based on attendance metrics while generating customized student merit certificates on-the-fly.',
    highlights: [
      'Formulated predictive algorithms linking student attendance percentages with probable GPA outcomes.',
      'Implemented automated grade calculation logic, eliminating human grading computation errors for faculty members.',
      'Developed dynamic certificate generation engine with customizable templates allowing instant PDF/document export.',
      'Created an intuitive, modern dashboard interface featuring real-time sliders and goal-setting visualization.'
    ]
  }
};

function initProjectModals() {
  const modalBackdrop = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const viewDetailBtns = document.querySelectorAll('.view-detail-btn');

  if (!modalBackdrop) return;

  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectDetailsData[projectId];

      if (data) {
        populateModal(data);
        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

function populateModal(data) {
  const titleEl = document.getElementById('modal-title');
  const catEl = document.getElementById('modal-category');
  const imgEl = document.getElementById('modal-img');
  const descEl = document.getElementById('modal-desc');
  const tagsEl = document.getElementById('modal-tags');
  const highlightsEl = document.getElementById('modal-highlights');

  if (titleEl) titleEl.textContent = data.title;
  if (catEl) catEl.textContent = data.category;
  if (imgEl) {
    imgEl.src = data.image;
    imgEl.alt = data.title;
  }
  if (descEl) descEl.textContent = data.overview;

  if (tagsEl) {
    tagsEl.innerHTML = data.stack.map(tag => `<span class="tech-tag">${tag}</span>`).join('');
  }

  if (highlightsEl) {
    highlightsEl.innerHTML = data.highlights.map(item => `
      <li style="margin-bottom: 0.6rem; color: var(--text-secondary); font-size: 0.95rem;">
        <span style="color: var(--accent-emerald); font-weight: bold; margin-right: 0.5rem;">✓</span> ${item}
      </li>
    `).join('');
  }
}

/* ============================================================
   8. COPY TO CLIPBOARD BUTTONS
   ============================================================ */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('[data-copy]');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`);
      }).catch(() => {
        showToast('Unable to copy, please copy manually.');
      });
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ============================================================
   9. CONTACT FORM
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name')?.value.trim();
    const email = document.getElementById('form-email')?.value.trim();
    const subject = document.getElementById('form-subject')?.value.trim();
    const message = document.getElementById('form-message')?.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in your name, email, and message.');
      return;
    }

    // Build mailto link so user's client opens with prefilled content
    const mailtoUrl = `mailto:poojawprofessional@gmail.com?subject=${encodeURIComponent(subject || `Message from ${name}`)}&body=${encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`)}`;
    
    // Provide nice instant feedback
    showToast(`Thank you, ${name}! Opening mail client...`);
    form.reset();

    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 1000);
  });
}

/* ============================================================
   10. AMBIENT PARTICLE CANVAS
   ============================================================ */
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 20), 45);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.8,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const particleColor = isDark ? '99, 102, 241' : '79, 70, 229';

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${particleColor}, ${p.alpha})`;
      ctx.fill();

      // Connect nearby particles with subtle lines
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${particleColor}, ${0.15 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
}

/* ============================================================
   11. BACK TO TOP BUTTON
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 450) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
