// Reuse mobile nav toggle
(function () {
  const toggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navContent = document.getElementById('navContent');
  if (toggle) {
    toggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navContent.classList.toggle('active');
      toggle.classList.toggle('active');
    });
  }
})();

// Simple reveal on scroll
(function () {
  const els = Array.from(document.querySelectorAll('.reveal'));
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  els.forEach((el) => obs.observe(el));
})(); 