// ====================================
// PREMIUM PORTFOLIO - JAVASCRIPT
// ====================================

// --- 1. SUBSCRIBE BUTTON & MODAL ---
const subscribeBtn = document.getElementById('subscribeBtn');
const subscribeModal = document.getElementById('subscribeModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const supportAmountInput = document.getElementById('supportAmount');
const qrImage = document.getElementById('qrImage');
const gpayBtn = document.getElementById('gpayBtn');
const phonepeBtn = document.getElementById('phonepeBtn');

// URN Verification Selectors
const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
const paymentConfirmAction = document.getElementById('paymentConfirmAction');
const urnSection = document.getElementById('urnSection');
const urnNumber = document.getElementById('urnNumber');
const urnSubmitBtn = document.getElementById('urnSubmitBtn');
const urnSuccessBox = document.getElementById('urnSuccessBox');
const savedUrnText = document.getElementById('savedUrnText');

if (subscribeBtn && subscribeModal && closeModalBtn) {
    const originalSubscribeText = subscribeBtn.innerHTML;

    subscribeBtn.addEventListener('click', () => {
        // Show "Generating Support..." effect on button
        subscribeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating Support...';
        subscribeBtn.style.pointerEvents = 'none';
        subscribeBtn.style.opacity = '0.8';

        // Wait a short delay before opening modal to let user see the effect
        setTimeout(() => {
            // Restore button text
            subscribeBtn.innerHTML = originalSubscribeText;
            subscribeBtn.style.pointerEvents = 'auto';
            subscribeBtn.style.opacity = '1';

            // Reset verification states on modal open
            if (urnSection) urnSection.style.display = 'none';
            if (urnSuccessBox) urnSuccessBox.style.display = 'none';
            if (paymentConfirmAction) paymentConfirmAction.style.display = 'block';
            if (urnNumber) urnNumber.value = '';
            
            // Restore standard modal contents visibility
            const qrContainer = document.getElementById('qrContainer');
            const paymentApps = document.querySelector('.payment-apps');
            const amountInputWrapper = document.querySelector('.amount-input-wrapper');
            const descriptionTexts = document.querySelectorAll('.modal-body > p');
            
            if (qrContainer) qrContainer.style.display = 'block';
            if (paymentApps) paymentApps.style.display = 'flex';
            if (amountInputWrapper) amountInputWrapper.style.display = 'block';
            descriptionTexts.forEach(p => {
                if (p.id !== 'supportModalFooterText') p.style.display = 'block';
            });

            // Show the QR modal
            subscribeModal.classList.add('active');

            // Focus and select the input to auto-open the keyboard on mobile
            if (supportAmountInput) {
                setTimeout(() => {
                    supportAmountInput.focus();
                    supportAmountInput.select();
                }, 150);
            }
        }, 600); // 600ms = 0.6 seconds, fast enough but readable
    });

    closeModalBtn.addEventListener('click', () => {
        subscribeModal.classList.remove('active');
    });

    // Close on outside click
    subscribeModal.addEventListener('click', (e) => {
        if (e.target === subscribeModal) {
            subscribeModal.classList.remove('active');
        }
    });

    // Payment Selection and URN verification handlers
    const showVerificationFlow = () => {
        if (urnSection) {
            urnSection.style.display = 'block';
            setTimeout(() => {
                urnSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
                if (urnNumber) urnNumber.focus();
            }, 100);
        }
        if (paymentConfirmAction) paymentConfirmAction.style.display = 'none';
    };

    if (confirmPaymentBtn) confirmPaymentBtn.addEventListener('click', showVerificationFlow);
    if (gpayBtn) gpayBtn.addEventListener('click', showVerificationFlow);
    if (phonepeBtn) phonepeBtn.addEventListener('click', showVerificationFlow);

    // Enforce numbers-only and limit length to 12 digits during input
    if (urnNumber) {
        urnNumber.addEventListener('input', () => {
            urnNumber.value = urnNumber.value.replace(/\D/g, '').slice(0, 12);
        });
    }

    // Submit URN and save successfully
    if (urnSubmitBtn && urnNumber && urnSuccessBox && savedUrnText) {
        urnSubmitBtn.addEventListener('click', () => {
            const urnValue = urnNumber.value.trim();
            // Validate that reference ID is exactly 12 digits
            if (!/^\d{12}$/.test(urnValue)) {
                urnNumber.style.borderColor = '#ff4a5a';
                urnNumber.value = '';
                urnNumber.placeholder = 'URN must be exactly 12 digits!';
                setTimeout(() => {
                    urnNumber.style.borderColor = 'rgba(0, 242, 254, 0.2)';
                    urnNumber.placeholder = '12-digit reference ID';
                }, 2000);
                return;
            }

            // Save URN transaction reference to localStorage
            const verificationRecord = {
                urn: urnValue,
                amount: supportAmountInput ? supportAmountInput.value : '1.99',
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('urn_payment_verification', JSON.stringify(verificationRecord));

            // Hide standard payment contents
            const qrContainer = document.getElementById('qrContainer');
            const paymentApps = document.querySelector('.payment-apps');
            const amountInputWrapper = document.querySelector('.amount-input-wrapper');
            const descriptionTexts = document.querySelectorAll('.modal-body > p');
            
            if (qrContainer) qrContainer.style.display = 'none';
            if (paymentApps) paymentApps.style.display = 'none';
            if (amountInputWrapper) amountInputWrapper.style.display = 'none';
            descriptionTexts.forEach(p => {
                if (p.id !== 'supportModalFooterText') p.style.display = 'none';
            });
            if (urnSection) urnSection.style.display = 'none';

            // Show URN verification success
            savedUrnText.textContent = urnValue;
            urnSuccessBox.style.display = 'block';
        });
    }
}

// Live update of UPI QR code and payment apps based on amount input
if (supportAmountInput && qrImage && gpayBtn && phonepeBtn) {
    const updateUPIElements = () => {
        // Keep only numbers and at most one decimal point
        let cleanVal = supportAmountInput.value.replace(/[^0-9.]/g, '');
        const dots = cleanVal.split('.');
        if (dots.length > 2) {
            cleanVal = dots[0] + '.' + dots.slice(1).join('');
        }
        
        let numVal = parseFloat(cleanVal);
        const errorMsg = document.getElementById('amountError');

        if (!isNaN(numVal)) {
            if (numVal > 500) {
                numVal = 500;
                cleanVal = '500';
                if (errorMsg) {
                    errorMsg.textContent = 'Maximum support amount is ₹500';
                    errorMsg.style.display = 'block';
                }
            } else if (numVal < 1) {
                if (errorMsg) {
                    errorMsg.textContent = 'Minimum support amount is ₹1';
                    errorMsg.style.display = 'block';
                }
            } else {
                if (errorMsg) {
                    errorMsg.style.display = 'none';
                }
            }
        } else {
            numVal = 0;
            if (errorMsg) {
                errorMsg.textContent = 'Minimum support amount is ₹1';
                errorMsg.style.display = 'block';
            }
        }
        
        supportAmountInput.value = cleanVal;
        
        // Build the UPI link (VPA: 7006780939-2@ybl)
        let upiLink = 'upi://pay?pa=7006780939-2@ybl&pn=M%20Suhaib&cu=INR';
        
        // Enforce boundary in generated payment link
        let amtStr = '1.99';
        if (!isNaN(numVal)) {
            const clamped = Math.max(1, Math.min(500, numVal));
            if (clamped !== numVal) {
                amtStr = clamped.toString();
            } else {
                amtStr = cleanVal;
            }
        }
        upiLink += `&am=${amtStr}`;
        
        // Generate QR code using the qrserver API
        const encodedData = encodeURIComponent(upiLink);
        qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedData}`;
        
        // Update deep-link buttons
        gpayBtn.href = upiLink;
        phonepeBtn.href = upiLink;
    };

    supportAmountInput.addEventListener('input', updateUPIElements);

    // Enforce valid minimum on input blur
    supportAmountInput.addEventListener('blur', () => {
        let cleanVal = supportAmountInput.value.replace(/[^0-9.]/g, '');
        let numVal = parseFloat(cleanVal);
        const errorMsg = document.getElementById('amountError');
        
        if (isNaN(numVal) || numVal < 1) {
            supportAmountInput.value = '1.99';
            if (errorMsg) {
                errorMsg.style.display = 'none';
            }
            updateUPIElements();
        }
    });
}

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
