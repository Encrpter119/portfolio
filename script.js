// ====================================
// PREMIUM PORTFOLIO - JAVASCRIPT
// ====================================

// --- 1. THEME TOGGLE (Dark/Light Mode) ---
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const getCurrentTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme === 'light' || savedTheme === 'light-mode') ? 'light' : 'dark';
};


const initTheme = () => {
    const savedTheme = getCurrentTheme();
    if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        body.classList.add('dark-mode');
        document.documentElement.removeAttribute('data-theme');
    }
    updateThemeIcon();
};

const updateThemeIcon = () => {
    if (getCurrentTheme() === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
};

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentThm = getCurrentTheme();
        const newTheme = currentThm === 'dark' ? 'light' : 'dark';

        localStorage.setItem('theme', newTheme);
        initTheme();
    });
}
initTheme(); // Initialize on load

// --- 2. NAVBAR SCROLL EFFECT & MOBILE MENU ---
const navbar = document.querySelector('.navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// --- 3. ACTIVE NAV LINK ON SCROLL ---
const updateActiveNav = () => {
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    });
};
updateActiveNav();

// --- 4. SCROLL PROGRESS BAR ---
const scrollProgress = document.querySelector('.scroll-progress');
if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (window.scrollY / docHeight) * 100;
        scrollProgress.style.width = scrollPercentage + '%';
    });
}

// --- 5. ANIMATED ROLES ---
const roles = ['Student', 'Frontend Developer', 'Freelancer', 'Problem Solver', 'Tech Enthusiast'];
let roleIndex = 0;
const roleText = document.querySelector('.role-text');

if (roleText) {
    setInterval(() => {
        roleText.style.opacity = '0';
        roleText.style.transform = 'translateY(10px)';

        setTimeout(() => {
            roleIndex = (roleIndex + 1) % roles.length;
            roleText.textContent = roles[roleIndex];
            roleText.style.opacity = '1';
            roleText.style.transform = 'translateY(0)';
            roleText.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }, 500);
    }, 3000);
}

// --- 6. INTERSECTION OBSERVER ANIMATIONS (Glass Cards) ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeUpObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Animate progress bars if inside a skill card
            const progressFills = entry.target.querySelectorAll('.progress-fill');
            progressFills.forEach(fill => {
                const targetWidth = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.transition = 'width 1.5s cubic-bezier(0.1, 0.5, 0.1, 1)';
                    fill.style.width = targetWidth;
                }, 300);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply fade-in-up base class to elements we want to animate
const animatedElements = document.querySelectorAll('.glass-card, .skill-category, .service-card, .glass-header');
animatedElements.forEach((el, index) => {
    el.classList.add('fade-in-up');
    // Add staggered delay for siblings
    el.style.transitionDelay = `${(index % 3) * 0.15}s`;
    fadeUpObserver.observe(el);
});

// --- 7. SMOOTH SCROLLING ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// --- 8. RESUME DOWNLOAD ---
const resumeBtn = document.getElementById('resumeBtn');
if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
        // e.preventDefault(); // Uncomment to intercept default behavior
        console.log("Downloading resume...");
    });
}

// --- 9. BACK TO TOP BUTTON ---
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// --- 10. CONTACT FORM SUBMISSION WITH DIGITAL EFFECTS ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Add digital feature: Transforming button
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Transmitting...';
        submitBtn.style.opacity = '0.8';
        submitBtn.style.pointerEvents = 'none';
        
        // Simulate network delay
        setTimeout(() => {
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.style.opacity = '1';
            submitBtn.style.pointerEvents = 'auto';
            
            // Clear form
            contactForm.reset();
            
            // Create and show Toast Popup
            const toast = document.createElement('div');
            toast.className = 'toast-popup';
            toast.innerHTML = `
                <div class="toast-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="toast-content">
                    <h4>Message Transmitted!</h4>
                    <p>I will respond shortly through mail.</p>
                </div>
            `;
            
            document.body.appendChild(toast);
            
            // Trigger animation in
            setTimeout(() => {
                toast.classList.add('show');
            }, 100);
            
            // Remove after 4 seconds
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.remove();
                }, 500);
            }, 4000);
            
        }, 1500); // 1.5 seconds digital delay
    });
}

console.log('%c🚀 Premium Portfolio Initialized', 'color: #00f2fe; font-size: 20px; font-weight: bold;');
