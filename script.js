// script.js
document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // --- 3D Parallax Tilt Effect for Hero Device Mockups ---
    const container = document.querySelector('.hero-visual-container');
    const laptop = document.querySelector('.mockup-laptop');
    const mobile = document.querySelector('.mockup-mobile');

    // Only apply 3D effect on larger screens to save mobile battery/performance
    if (container && laptop && mobile && window.innerWidth > 768) {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const rotateX = (y / rect.height) * -15; 
            const rotateY = (x / rect.width) * 15;

            laptop.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            mobile.style.transform = `translateZ(80px) rotateX(${rotateX * 1.5}deg) rotateY(${(rotateY * 1.5) - 15}deg)`;
        });

        container.addEventListener('mouseleave', () => {
            laptop.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            mobile.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            
            laptop.style.transform = 'rotateX(0deg) rotateY(0deg)';
            mobile.style.transform = 'translateZ(80px) rotateX(0deg) rotateY(-15deg)';
            
            setTimeout(() => {
                laptop.style.transition = 'transform 0.1s ease-out';
                mobile.style.transition = 'transform 0.1s ease-out';
            }, 600);
        });

        laptop.style.transition = 'transform 0.1s ease-out';
        mobile.style.transition = 'transform 0.1s ease-out';
    }

    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all currently open FAQ items
                faqItems.forEach(i => i.classList.remove('active'));
                
                // If it wasn't active, open it
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // --- Scroll Reveal Animations ---
    // Appended .cta-content-wrapper to ensure the new animated CTA section fades in beautifully
    // Appended .reveal to ensure elements with the class pre-applied (like on the About/FAQ page) are also targeted and observed
    const revealElements = document.querySelectorAll('.card, .pricing-card, .maintenance-card, .section h2:not(.trust-heading), .section p, .hero-content, .contact-grid > div, .spotlight-content, .spotlight-visuals, .video-placeholder, .story-image-container, .story-text-card, .comparison-wrapper, .service-image-box, .cta-box, .trust-container, .cta-content-wrapper, .faq-container, .reveal');
    
    // Add base class for animation
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
});