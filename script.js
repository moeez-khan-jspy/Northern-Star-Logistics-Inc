// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navContent = document.getElementById('navContent');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navContent.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// Services carousel
(function initServicesCarousel() {
    const viewport = document.getElementById('servicesViewport');
    const track = viewport ? viewport.querySelector('.services-track') : null;
    const prev = document.getElementById('servicesPrev');
    const next = document.getElementById('servicesNext');
    if (!viewport || !track || !prev || !next) return;

    function cardWidth() {
        const first = track.querySelector('.service-card');
        if (!first) return viewport.clientWidth;
        const style = getComputedStyle(first);
        return first.getBoundingClientRect().width + parseFloat(style.marginRight || 0);
    }

    function updateButtons() {
        const maxScroll = track.scrollWidth - viewport.clientWidth - 2;
        prev.disabled = viewport.scrollLeft <= 0;
        next.disabled = viewport.scrollLeft >= maxScroll;
    }

    function scrollByCards(dir) {
        viewport.scrollBy({ left: dir * cardWidth(), behavior: 'smooth' });
    }

    prev.addEventListener('click', () => scrollByCards(-1));
    next.addEventListener('click', () => scrollByCards(1));
    viewport.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);

    // Kick off
    updateButtons();
})();

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Progress Bar Animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-fill');
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            });
        }
    });
}, observerOptions);

const logisticsSection = document.querySelector('.logistics-partner');
if (logisticsSection) {
    progressObserver.observe(logisticsSection);
}

// Counter Animation for Statistics
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
                const suffix = counter.textContent.replace(/[\d\+]/g, '');
                let current = 0;
                const increment = target / 100;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target + suffix;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + suffix;
                    }
                }, 20);
            });
        }
    });
}, observerOptions);

if (logisticsSection) {
    counterObserver.observe(logisticsSection);
}

// Testimonial Navigation (Basic functionality)
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const testimonials = [
    {
        text: "Trusted Freight LLC has completely transformed the way we handle our shipments. From pickup to delivery, everything is tracked, timely, and well-managed. We've been able to cut costs and reduce delays across the board",
        author: "Matt Henry",
        position: "Supply Chain Manager",
        image: "/placeholder.svg?height=60&width=60"
    },
    {
        text: "Working with Trusted Freight LLC has been a game-changer for our business. Their dedicated lanes program gave us the consistency we needed to grow our operations.",
        author: "Sarah Johnson",
        position: "Fleet Manager",
        image: "/placeholder.svg?height=60&width=60"
    },
    {
        text: "The team at Trusted Freight LLC goes above and beyond. Their support with TWIC cards and insurance made getting started so much easier than we expected.",
        author: "Mike Rodriguez",
        position: "Owner-Operator",
        image: "/placeholder.svg?height=60&width=60"
    }
];

let currentTestimonial = 0;

function updateTestimonial() {
    const testimonial = testimonials[currentTestimonial];
    const testimonialText = document.querySelector('.testimonial-text h3');
    const authorName = document.querySelector('.author-info strong');
    const authorPosition = document.querySelector('.author-info span');
    const authorImage = document.querySelector('.author-image img');
    
    if (testimonialText) testimonialText.textContent = testimonial.text;
    if (authorName) authorName.textContent = `— ${testimonial.author}`;
    if (authorPosition) authorPosition.textContent = testimonial.position;
    if (authorImage) authorImage.src = testimonial.image;
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentTestimonial = currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1;
        updateTestimonial();
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentTestimonial = currentTestimonial === testimonials.length - 1 ? 0 : currentTestimonial + 1;
        updateTestimonial();
    });
}

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = currentTestimonial === testimonials.length - 1 ? 0 : currentTestimonial + 1;
    updateTestimonial();
}, 5000);

// Navbar elevation on scroll (apply to inner rounded container)
const navbarInner = document.querySelector('.navbar .container');
window.addEventListener('scroll', () => {
    if (!navbarInner) return;
    if (window.scrollY > 10) {
        navbarInner.classList.add('elevated');
    } else {
        navbarInner.classList.remove('elevated');
    }
});

// Form Validation (if forms are added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[^\D]{1,16}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Lazy Loading for Images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Scroll to top functionality
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Add scroll to top button (can be styled and positioned as needed)
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #1e3a8a;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s;
        z-index: 1000;
    `;
    
    button.addEventListener('click', scrollToTop);
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.opacity = '1';
        } else {
            button.style.opacity = '0';
        }
    });
};

createScrollToTopButton();

// Initialize all animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    console.log('Trusted Freight LLC website loaded successfully');
});