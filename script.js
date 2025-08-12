// ------------------------------
// Global navigation behavior
// ------------------------------
(function () {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navContent = document.getElementById('navContent');

  if (mobileToggle && navMenu && navContent) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navContent.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });
  }

  // Smooth scroll for on‑page anchors; also close mobile panel after click
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href') || '';
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (navContent) navContent.classList.remove('active');
          if (navMenu) navMenu.classList.remove('active');
          if (mobileToggle) mobileToggle.classList.remove('active');
        }
      }
    });
  });

  // Dropdown open on tap (mobile)
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = toggle.closest('.dropdown');
      if (parent) parent.classList.toggle('open');
    });
  });
})();

// ------------------------------
// Progress bar animation in logistics section
// ------------------------------
(function () {
  const logisticsSection = document.querySelector('.logistics-partner');
  if (!logisticsSection) return;

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };

  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll('.progress-fill');
        progressBars.forEach((bar) => {
          const width = bar.getAttribute('data-width') || '0';
          bar.style.width = width + '%';
        });
      }
    });
  }, observerOptions);

  progressObserver.observe(logisticsSection);

  // Counter animation for statistics
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.stat-number');
        counters.forEach((counter) => {
          const raw = counter.textContent || '';
          const target = parseInt(raw.replace(/[^\d]/g, ''), 10);
          const suffix = raw.replace(/[\d\+]/g, '');
          let current = 0;
          const increment = Math.max(1, Math.ceil(target / 100));
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = String(target) + suffix;
              clearInterval(timer);
            } else {
              counter.textContent = String(current) + suffix;
            }
          }, 20);
        });
      }
    });
  }, observerOptions);

  counterObserver.observe(logisticsSection);
})();

// ------------------------------
// Testimonials basic rotation
// ------------------------------
(function () {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const testimonials = [
    {
      text:
        "Trusted Freight LLC has completely transformed the way we handle our shipments. From pickup to delivery, everything is tracked, timely, and well-managed. We've been able to cut costs and reduce delays across the board",
      author: 'Matt Henry',
      position: 'Supply Chain Manager',
      image: '/placeholder.svg?height=60&width=60'
    },
    {
      text:
        'Working with Trusted Freight LLC has been a game-changer for our business. Their dedicated lanes program gave us the consistency we needed to grow our operations.',
      author: 'Sarah Johnson',
      position: 'Fleet Manager',
      image: '/placeholder.svg?height=60&width=60'
    },
    {
      text:
        'The team at Trusted Freight LLC goes above and beyond. Their support with TWIC cards and insurance made getting started so much easier than we expected.',
      author: 'Mike Rodriguez',
      position: 'Owner-Operator',
      image: '/placeholder.svg?height=60&width=60'
    }
  ];

  let current = 0;

  function updateTestimonial() {
    const data = testimonials[current];
    const testimonialText = document.querySelector('.testimonial-text h3');
    const authorName = document.querySelector('.author-info strong');
    const authorPosition = document.querySelector('.author-info span');
    const authorImage = document.querySelector('.author-image img');

    if (testimonialText) testimonialText.textContent = data.text;
    if (authorName) authorName.textContent = `— ${data.author}`;
    if (authorPosition) authorPosition.textContent = data.position;
    if (authorImage) authorImage.setAttribute('src', data.image);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      current = current === 0 ? testimonials.length - 1 : current - 1;
      updateTestimonial();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      current = current === testimonials.length - 1 ? 0 : current + 1;
      updateTestimonial();
    });
  }

  setInterval(() => {
    current = current === testimonials.length - 1 ? 0 : current + 1;
    updateTestimonial();
  }, 5000);
})();

// ------------------------------
// Navbar elevation on scroll
// ------------------------------
(function () {
  const navbarInner = document.querySelector('.navbar .container');
  if (!navbarInner) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) navbarInner.classList.add('elevated');
    else navbarInner.classList.remove('elevated');
  });
})();

// ------------------------------
// Lazy load images with data-src
// ------------------------------
(function () {
  const imageObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');
        if (src) img.setAttribute('src', src);
        img.classList.remove('lazy');
        obs.unobserve(img);
      }
    });
  });

  const lazyImgs = document.querySelectorAll('img[data-src]');
  lazyImgs.forEach((img) => imageObserver.observe(img));
})();

// ------------------------------
// Scroll-to-top button
// ------------------------------
(function () {
  const button = document.createElement('button');
  button.innerHTML = '↑';
  button.className = 'scroll-to-top';
  button.style.cssText = [
    'position:fixed',
    'bottom:20px',
    'right:20px',
    'width:50px',
    'height:50px',
    'border-radius:50%','background:#1e3a8a','color:#fff','border:none',
    'font-size:20px','cursor:pointer','opacity:0','transition:opacity .3s','z-index:1000'
  ].join(';');

  button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.body.appendChild(button);

  window.addEventListener('scroll', () => {
    button.style.opacity = window.scrollY > 500 ? '1' : '0';
  });
})();

// Flag page loaded
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});