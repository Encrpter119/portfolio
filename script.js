// ====================================
// PERSONAL PORTFOLIO - JAVASCRIPT
// ====================================

// ====================================
// 1. THEME TOGGLE (Dark/Light Mode)
// ====================================

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const body = document.body;

// Check for saved theme preference or default to light mode
const getCurrentTheme = () => {
    return localStorage.getItem('theme') || 'light-mode';
};

// Initialize theme on page load
const initTheme = () => {a
    const savedTheme = getCurrentTheme();
    if (savedTheme === 'dark-mode') {
        body.classList.add('dark-mode');
        updateThemeIcon();
    }
};

// Update theme icon
const updateThemeIcon = () => {
    if (body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
};

// Toggle theme
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const theme = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', theme);
    updateThemeIcon();
});

// ====================================
// 2. HAMBURGER MENU
// ====================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ====================================
// 3. NAVIGATION ACTIVE STATE
// ====================================

const updateActiveNav = () => {
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
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

// ====================================
// 4. SCROLL PROGRESS BAR
// ====================================

const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const scrollPercentage = (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = scrollPercentage + '%';
});

// ====================================
// 5. BACK TO TOP BUTTON
// ====================================

const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ====================================
// 6. ANIMATED ROLES (Hero Section)
// ====================================

const roles = [
    'Student',
    'Frontend Developer',
    'Freelancer',
    'Tech Enthusiast',
    'Problem Solver',
    'Web Developer'
];

let currentRoleIndex = 0;
const roleText = document.querySelector('.role-text');

const rotateRole = () => {
    currentRoleIndex = (currentRoleIndex + 1) % roles.length;
    roleText.textContent = roles[currentRoleIndex];
};

setInterval(rotateRole, 3000); // Change role every 3 seconds

// ====================================
// 7. CONTACT FORM HANDLING
// ====================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        try {
            // In a real application, you would send this data to a backend server
            // For now, we'll just show a success message
            
            // Disable button and show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        } catch (error) {
            showFormMessage('An error occurred. Please try again.', 'error');
        }
    });
}

const showFormMessage = (message, type) => {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Auto-hide message after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
};

// ====================================
// 8. RESUME DOWNLOAD
// ====================================

const resumeBtn = document.getElementById('resumeBtn');

if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Download the PDF file
        const link = document.createElement('a');
        link.href = 'CV_MSUHAIB.pdf';
        link.download = 'CV_MSUHAIB.pdf';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

// ====================================
// 9. SMOOTH SCROLL BEHAVIOR
// ====================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just '#'
        if (href === '#') {
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ====================================
// 10. INTERSECTION OBSERVER FOR ANIMATIONS
// ====================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill bars for animation
document.querySelectorAll('.skill-bar').forEach(el => {
    observer.observe(el);
});

// Observe project cards
document.querySelectorAll('.project-card').forEach(el => {
    observer.observe(el);
});

// Observe service cards
document.querySelectorAll('.service-card').forEach(el => {
    observer.observe(el);
});

// ====================================
// 11. SKILL PROGRESS ANIMATION
// ====================================

let skillsAnimated = false;

const animateSkills = () => {
    if (skillsAnimated) return;
    
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;
    
    const skillsRect = skillsSection.getBoundingClientRect();
    
    if (skillsRect.top < window.innerHeight) {
        skillsAnimated = true;
        
        document.querySelectorAll('.progress-fill').forEach(fill => {
            const width = fill.style.width;
            fill.style.width = '0';
            
            setTimeout(() => {
                fill.style.transition = 'width 1s ease-out';
                fill.style.width = width;
            }, 100);
        });
    }
};

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// ====================================
// 12. TOOLTIP FUNCTIONALITY
// ====================================

const createTooltip = (element, text) => {
    element.setAttribute('title', text);
    element.addEventListener('mouseenter', () => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: var(--primary-color);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 1000;
            pointer-events: none;
        `;
        
        element.parentElement.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = (rect.left - tooltip.offsetWidth / 2 + rect.width / 2) + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
    });
};

// ====================================
// 13. ACTIVE SECTION INDICATOR
// ====================================

const updateSectionIndicator = () => {
    const sections = document.querySelectorAll('section');
    
    const removeAllActive = () => {
        sections.forEach(section => {
            section.style.opacity = '1';
        });
    };
    
    window.addEventListener('scroll', () => {
        removeAllActive();
    });
};

updateSectionIndicator();

// ====================================
// 14. PRELOADER SIMULATION
// ====================================

window.addEventListener('load', () => {
    // Fade in content
    document.body.style.animation = 'fadeIn 0.5s ease-out';
});

// ====================================
// 15. KEYBOARD NAVIGATION
// ====================================

document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Alt + T for theme toggle
    if (e.altKey && e.key === 't') {
        themeToggle.click();
    }
});

// ====================================
// 16. LAZY LOADING IMAGES
// ====================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ====================================
// 17. PERFORMANCE OPTIMIZATION
// ====================================

// Debounce function for scroll events
const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

// Optimize scroll performance
let scrolling = false;

window.addEventListener('scroll', debounce(() => {
    scrolling = true;
    requestAnimationFrame(() => {
        scrolling = false;
    });
}, 100));

// ====================================
// 18. CONSOLE GREETING
// ====================================

console.log(
    '%c🚀 Welcome to My Portfolio!',
    'font-size: 24px; font-weight: bold; color: #007AFF;'
);
console.log(
    '%cThank you for visiting! Feel free to explore my projects and get in touch.',
    'font-size: 14px; color: #666;'
);

// ====================================
// 19. DYNAMIC YEAR IN FOOTER
// ====================================

const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.textContent = `© ${currentYear} M Suhaib. All rights reserved.`;
}

// ====================================
// 20. INITIALIZE ON DOM READY
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateThemeIcon();
    
    // Any additional initialization can go here
    console.log('✅ Portfolio fully loaded and initialized');
});

// Handle external links
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
    link.setAttribute('target', '_blank');
});

// ====================================
// 21. PROMO POPUP MODAL
// ====================================

const promoPopup = document.getElementById('promoPopup');
const promoPopupClose = document.getElementById('promoPopupClose');

// Show popup after a short delay on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        if (promoPopup) {
            promoPopup.classList.add('active');
        }
    }, 1500);
});

// Close popup
const closePromoPopup = () => {
    if (promoPopup) {
        promoPopup.classList.remove('active');
    }
};

if (promoPopupClose) {
    promoPopupClose.addEventListener('click', closePromoPopup);
}

// Close when clicking outside the popup content
if (promoPopup) {
    promoPopup.addEventListener('click', (e) => {
        if (e.target === promoPopup) {
            closePromoPopup();
        }
    });
}

// Close with Escape key (extends existing keyboard handler)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && promoPopup && promoPopup.classList.contains('active')) {
        closePromoPopup();
    }
});
