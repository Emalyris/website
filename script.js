/* 
/*
 * Mobile menu toggle functionality
 * - Toggles visibility of mobile menu on button click.
 */

document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

/* 
/*
 * Smooth scrolling for anchor links (only if not pointing to other pages)
 * - Prevents default navigation and scrolls smoothly to target if exists.
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Skip if placeholder
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

/* 
/*
 * Fade-in animation on scroll using IntersectionObserver
 * - Observes elements and adds classes for fade-in when in view.
 */

const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    element.classList.add('opacity-0', 'translate-y-6');
    observer.observe(element);
});

/* 
/*
 * Form submission handler:
 * - Prevents default submit.
 * - Collects form data.
 * - Constructs mailto URL with fields in subject and body.
 * - Opens email client via window.location.
 * - Clears form after.
 */

document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form action
        const formData = new FormData(form);
        const email = 'lyrise25@gmail.com'; // Target email
        let subject = 'Contact Form Submission'; // Default subject
        let body = ''; // Build body from fields

        // Override subject if present
        if (formData.has('subject')) {
            subject = formData.get('subject');
        }

        // Build body from all fields
        for (const [key, value] of formData.entries()) {
            body += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}\n`;
        }

        // Construct mailto URL
        const params = new URLSearchParams();
        params.append('subject', subject);
        params.append('body', body);
        const mailtoUrl = `mailto:${email}?${params.toString()}`;

        // Open email client
        window.location.href = mailtoUrl;

        // Clear form fields
        form.reset();
    });
});