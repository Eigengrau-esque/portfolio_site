/* =============================================
   PORTFOLIO — MAIN.JS
   Features: dark mode, scroll reveal, mobile nav
   ============================================= */

// ---- DARK MODE ----
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

// Load saved preference or system preference
const savedTheme = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
root.setAttribute('data-theme', savedTheme);

if (themeToggle) {
  themeToggle.setAttribute('aria-label',
    savedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
  );

  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeToggle.setAttribute('aria-label',
      next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
  });
}

// ---- MOBILE NAV ----
const navToggle = document.getElementById('navToggle');
const navLinksWrap = document.getElementById('navLinksWrap');

if (navToggle && navLinksWrap) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinksWrap.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  // Close on link click
  navLinksWrap.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinksWrap.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinksWrap.contains(e.target)) {
      navLinksWrap.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// ---- SCROLL REVEAL ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- ACTIVE NAV LINK ----
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const linkPath = link.getAttribute('href').split('/').pop();
  if (linkPath === currentPath) link.classList.add('active');
});

// ---- SCROLL PROGRESS BAR (optional visual touch) ----
const progressBar = document.getElementById('scrollProgress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.body.scrollHeight - window.innerHeight;
    progressBar.style.width = `${(scrolled / total) * 100}%`;
  });
}

// ---- FORM ENHANCEMENT ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    const btn = this.querySelector('.form-submit');
    btn.textContent = 'Sending...';
    btn.disabled = true;
  });
}
