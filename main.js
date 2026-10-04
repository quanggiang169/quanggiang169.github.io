// ============ Mobile nav toggle ============
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ============ Scroll-spy for sticky nav (works for both header nav and local-nav) ============
  const spySections = document.querySelectorAll('section[id], div[id].anchor-target');
  const spyLinks = document.querySelectorAll('[data-nav], .local-nav a');
  if (spySections.length && spyLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          spyLinks.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
    spySections.forEach(s => observer.observe(s));
  }

  // ============ ACTS pillar tabs (used on both pages where present) ============
  const pillarBtns = document.querySelectorAll('.acts-tab-btn');
  const pillarPanels = document.querySelectorAll('.acts-panel');
  pillarBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-pillar');
      pillarBtns.forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
      });
      pillarPanels.forEach(p => {
        p.classList.toggle('active', p.getAttribute('data-panel') === target);
      });
    });
  });

  // ============ Language toggle (VI default / EN) ============
  // Any element carrying a data-en attribute stores its Vietnamese markup
  // in data-vi on first load, then swaps innerHTML on toggle.
  const i18nEls = document.querySelectorAll('[data-en]');
  i18nEls.forEach(el => { el.dataset.vi = el.innerHTML; });

  function setLang(lang) {
    i18nEls.forEach(el => {
      el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.vi;
    });
    document.documentElement.lang = lang === 'en' ? 'en' : 'vi';
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
    window.__siteLang = lang;
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang')));
  });

  setLang('vi');
});
