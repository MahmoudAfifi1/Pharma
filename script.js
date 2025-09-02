// DOM Elements
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const tabButtons = document.querySelectorAll('.tab-btn');
const productCards = document.querySelectorAll('.product-card');

// Navigation functionality
function initNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            showSection(targetSection);
            setActiveNavLink(link);
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Hero buttons navigation
    const heroButtons = document.querySelectorAll('[data-section]');
    heroButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = button.getAttribute('data-section');
            showSection(targetSection);
            setActiveNavLinkBySection(targetSection);
        });
    });

    // Footer links navigation
    const footerLinks = document.querySelectorAll('.footer-links a[data-section]');
    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            showSection(targetSection);
            setActiveNavLinkBySection(targetSection);
        });
    });
}

// Show specific section
function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Scroll to top of the page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Set active navigation link
function setActiveNavLink(activeLink) {
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Set active navigation link by section
function setActiveNavLinkBySection(sectionId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
}

// Product filtering functionality
function initProductFiltering() {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter products
            filterProducts(category);
        });
    });
}

function filterProducts(category) {
    productCards.forEach(card => {
        const productCategory = card.getAttribute('data-category');
        
        if (category === 'all' || productCategory === category) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeInUp 0.6s ease forwards';
        } else {
            card.classList.add('hidden');
        }
    });
}

// Contact form functionality
function initContactForm() {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });

    // Real-time validation
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            clearError(input);
        });
    });
}

function validateForm() {
    let isValid = true;
    const formData = new FormData(contactForm);
    
    // Name validation
    const name = formData.get('name').trim();
    if (!name) {
        showError('nameError', 'الرجاء إدخال الاسم الكامل');
        isValid = false;
    } else if (name.length < 2) {
        showError('nameError', 'يجب أن يكون الاسم أكثر من حرفين');
        isValid = false;
    }
    
    // Email validation
    const email = formData.get('email').trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        showError('emailError', 'الرجاء إدخال البريد الإلكتروني');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError('emailError', 'الرجاء إدخال بريد إلكتروني صحيح');
        isValid = false;
    }
    
    // Phone validation (optional but if provided should be valid)
    const phone = formData.get('phone').trim();
    if (phone) {
        const phoneRegex = /^[\+]?[0-9\-\(\)\s]+$/;
        if (!phoneRegex.test(phone) || phone.length < 8) {
            showError('phoneError', 'الرجاء إدخال رقم هاتف صحيح');
            isValid = false;
        }
    }
    
    // Subject validation
    const subject = formData.get('subject');
    if (!subject) {
        showError('subjectError', 'الرجاء اختيار الموضوع');
        isValid = false;
    }
    
    // Message validation
    const message = formData.get('message').trim();
    if (!message) {
        showError('messageError', 'الرجاء كتابة الرسالة');
        isValid = false;
    } else if (message.length < 10) {
        showError('messageError', 'يجب أن تكون الرسالة أكثر من 10 أحرف');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const fieldName = field.name;
    const fieldValue = field.value.trim();
    
    clearError(field);
    
    switch (fieldName) {
        case 'name':
            if (!fieldValue) {
                showError('nameError', 'الرجاء إدخال الاسم الكامل');
            } else if (fieldValue.length < 2) {
                showError('nameError', 'يجب أن يكون الاسم أكثر من حرفين');
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!fieldValue) {
                showError('emailError', 'الرجاء إدخال البريد الإلكتروني');
            } else if (!emailRegex.test(fieldValue)) {
                showError('emailError', 'الرجاء إدخال بريد إلكتروني صحيح');
            }
            break;
            
        case 'phone':
            if (fieldValue) {
                const phoneRegex = /^[\+]?[0-9\-\(\)\s]+$/;
                if (!phoneRegex.test(fieldValue) || fieldValue.length < 8) {
                    showError('phoneError', 'الرجاء إدخال رقم هاتف صحيح');
                }
            }
            break;
            
        case 'subject':
            if (!fieldValue) {
                showError('subjectError', 'الرجاء اختيار الموضوع');
            }
            break;
            
        case 'message':
            if (!fieldValue) {
                showError('messageError', 'الرجاء كتابة الرسالة');
            } else if (fieldValue.length < 10) {
                showError('messageError', 'يجب أن تكون الرسالة أكثر من 10 أحرف');
            }
            break;
    }
}

function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // Add error styling to input
        const input = errorElement.closest('.form-group').querySelector('input, select, textarea');
        if (input) {
            input.style.borderColor = 'var(--danger)';
        }
    }
}

function clearError(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.style.display = 'none';
        field.style.borderColor = 'var(--border-color)';
    }
}

function submitForm() {
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'جاري الإرسال...';
    submitButton.disabled = true;
    contactForm.classList.add('loading');
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Hide form and show success message
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Reset form after showing success
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'block';
            formSuccess.style.display = 'none';
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            contactForm.classList.remove('loading');
            
            // Clear any remaining errors
            const errorMessages = contactForm.querySelectorAll('.error-message');
            errorMessages.forEach(error => {
                error.style.display = 'none';
            });
            
            const inputs = contactForm.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.style.borderColor = 'var(--border-color)';
            });
        }, 3000);
        
    }, 2000);
}

// Smooth animations on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0s';
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.feature-card, .product-card, .service-card, .stat-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Accessibility enhancements
function initAccessibility() {
    // Keyboard navigation for tabs
    tabButtons.forEach((button, index) => {
        button.addEventListener('keydown', (e) => {
            let targetIndex;
            
            switch (e.key) {
                case 'ArrowRight':
                    targetIndex = index > 0 ? index - 1 : tabButtons.length - 1;
                    break;
                case 'ArrowLeft':
                    targetIndex = index < tabButtons.length - 1 ? index + 1 : 0;
                    break;
                case 'Home':
                    targetIndex = 0;
                    break;
                case 'End':
                    targetIndex = tabButtons.length - 1;
                    break;
                default:
                    return;
            }
            
            e.preventDefault();
            tabButtons[targetIndex].focus();
            tabButtons[targetIndex].click();
        });
    });
    
    // Ensure proper focus management for mobile menu
    hamburger.addEventListener('click', () => {
        setTimeout(() => {
            if (navMenu.classList.contains('active')) {
                navLinks[0].focus();
            }
        }, 100);
    });
    
    // Escape key to close mobile menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.focus();
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initProductFiltering();
    initContactForm();
    initAnimations();
    initAccessibility();
    
    // Show home section by default
    showSection('home');
    
    console.log('🏥 شركة الدواء العربية - الموقع الإلكتروني محمل بنجاح');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Refresh animations when page becomes visible
        const activeSection = document.querySelector('.section.active');
        if (activeSection) {
            const cards = activeSection.querySelectorAll('.feature-card, .product-card, .service-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                }, index * 100);
            });
        }
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('خطأ في الموقع:', e.error);
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ تم تحميل الموقع في ${Math.round(loadTime)} مللي ثانية`);
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Responsive handling
function handleResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

window.addEventListener('resize', debounce(handleResize, 250));

// Preload critical assets
function preloadAssets() {
    const criticalAssets = [
        'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    ];
    
    criticalAssets.forEach(asset => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = asset;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadAssets();
