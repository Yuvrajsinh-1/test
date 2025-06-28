// Contact Page JavaScript

// Contact form handler
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.bindEvents();
            this.setupValidation();
        }
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Real-time validation
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearErrors(input));
        });
    }

    setupValidation() {
        // Add validation styles
        const validationCSS = `
            .form-group.error input,
            .form-group.error select,
            .form-group.error textarea {
                border-color: #ef4444;
                box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
            }
            
            .form-group.success input,
            .form-group.success select,
            .form-group.success textarea {
                border-color: #10b981;
                box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
            }
            
            .error-message {
                color: #ef4444;
                font-size: 0.875rem;
                margin-top: 0.25rem;
                display: none;
            }
            
            .form-group.error .error-message {
                display: block;
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = validationCSS;
        document.head.appendChild(style);

        // Add error message elements
        const formGroups = this.form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            group.appendChild(errorDiv);
        });
    }

    validateField(field) {
        const formGroup = field.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        let isValid = true;
        let message = '';

        // Clear previous states
        formGroup.classList.remove('error', 'success');

        // Validation rules
        switch (field.type) {
            case 'email':
                if (!this.isValidEmail(field.value)) {
                    isValid = false;
                    message = 'Please enter a valid email address';
                }
                break;
            case 'tel':
                if (field.value && !this.isValidPhone(field.value)) {
                    isValid = false;
                    message = 'Please enter a valid phone number';
                }
                break;
            default:
                if (field.required && !field.value.trim()) {
                    isValid = false;
                    message = 'This field is required';
                }
        }

        // Special validation for select
        if (field.tagName === 'SELECT' && field.required && !field.value) {
            isValid = false;
            message = 'Please select an option';
        }

        // Update UI
        if (!isValid) {
            formGroup.classList.add('error');
            errorMessage.textContent = message;
        } else if (field.value.trim()) {
            formGroup.classList.add('success');
        }

        return isValid;
    }

    clearErrors(field) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error');
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    async handleSubmit() {
        if (!this.validateForm()) {
            this.showMessage('Please fix the errors above', 'error');
            return;
        }
    
        const submitBtn = this.form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
    
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
    
        try {
            const formData = new FormData(this.form);
            const response = await fetch('http://127.0.0.1:5000/submit-contact', {
                method: 'POST',
                body: formData
            });
    
            const result = await response.json();
    
            if (result.status === "success") {
                this.showMessage('Thank you! Your message has been sent successfully.', 'success');
                this.form.reset();
                this.clearAllValidation();
            } else {
                this.showMessage('Error: ' + result.message, 'error');
            }
        } catch (error) {
            this.showMessage('Server error. Please try again later.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }
    
    simulateSubmission() {
        return new Promise((resolve) => {
            setTimeout(resolve, 2000); // Simulate 2 second delay
        });
    }

    clearAllValidation() {
        const formGroups = this.form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error', 'success');
        });
    }

    showMessage(text, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const message = document.createElement('div');
        message.className = `form-message ${type}`;
        message.textContent = text;

        // Insert message
        this.form.insertBefore(message, this.form.firstChild);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 5000);
    }
}

// FAQ functionality
class FAQManager {
    constructor() {
        this.init();
    }

    init() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            question.addEventListener('click', () => {
                this.toggleFAQ(item, answer);
            });
        });
    }

    toggleFAQ(item, answer) {
        const isOpen = item.classList.contains('open');
        
        // Close all other FAQs
        document.querySelectorAll('.faq-item').forEach(faqItem => {
            faqItem.classList.remove('open');
            const faqAnswer = faqItem.querySelector('.faq-answer');
            faqAnswer.style.maxHeight = '0';
        });

        // Toggle current FAQ
        if (!isOpen) {
            item.classList.add('open');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    }
}

// Contact page animations
class ContactAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.animateOnScroll();
        this.addContactCardHovers();
    }

    animateOnScroll() {
        const elements = document.querySelectorAll('.contact-card, .faq-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
            observer.observe(element);
        });
    }

    addContactCardHovers() {
        const contactCards = document.querySelectorAll('.contact-card');
        
        contactCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }
}

// Add contact-specific CSS
const contactCSS = `
/* Contact Hero */
.contact-hero {
    position: relative;
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.contact-hero .hero-bg {
    position: absolute;
    inset: 0;
}

.contact-hero .hero-bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.contact-hero .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.6), rgba(17, 24, 39, 0.8));
}

.contact-hero .hero-content {
    position: relative;
    z-index: 10;
    text-align: center;
    color: white;
    padding: var(--spacing-4);
}

.contact-hero .hero-title {
    font-family: var(--font-display);
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: var(--spacing-4);
}

.contact-hero .hero-description {
    font-size: 1.25rem;
    color: #e5e7eb;
    max-width: 48rem;
    margin: 0 auto;
}

/* Contact Section */
.contact-section {
    padding: var(--spacing-16) 0;
}

.contact-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-12);
}

@media (min-width: 1024px) {
    .contact-grid {
        grid-template-columns: 1fr 1fr;
    }
}

/* Contact Form */
.contact-form-section .section-title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: var(--spacing-4);
}

.contact-form-section .section-description {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-8);
}

.contact-form {
    /* No additional styles needed */
}

.form-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
}

@media (min-width: 640px) {
    .form-row {
        grid-template-columns: 1fr 1fr;
    }
}

.form-group {
    margin-bottom: var(--spacing-6);
}

.form-group label {
    display: block;
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: var(--spacing-2);
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: var(--spacing-3);
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 1rem;
    transition: all var(--transition-normal);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--primary-500);
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
}

.form-group textarea {
    resize: vertical;
    min-height: 120px;
}

.submit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-2);
    width: 100%;
    padding: var(--spacing-4);
    background: var(--primary-500);
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-normal);
}

.submit-btn:hover {
    background: var(--primary-600);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

.form-message {
    padding: var(--spacing-4);
    border-radius: 0.5rem;
    margin-bottom: var(--spacing-6);
    font-weight: 500;
}

.form-message.success {
    background: #d1fae5;
    color: #065f46;
    border: 1px solid #a7f3d0;
}

.form-message.error {
    background: #fee2e2;
    color: #991b1b;
    border: 1px solid #fecaca;
}

[data-theme="dark"] .form-message.success {
    background: rgba(16, 185, 129, 0.1);
    color: #34d399;
    border-color: rgba(16, 185, 129, 0.2);
}

[data-theme="dark"] .form-message.error {
    background: rgba(239, 68, 68, 0.1);
    color: #f87171;
    border-color: rgba(239, 68, 68, 0.2);
}

/* Contact Info */
.contact-info-section .section-title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: var(--spacing-4);
}

.contact-info-section .section-description {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-8);
}

.contact-cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-6);
    margin-bottom: var(--spacing-8);
}

@media (min-width: 640px) {
    .contact-cards {
        grid-template-columns: repeat(2, 1fr);
    }
}

.contact-card {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-4);
    padding: var(--spacing-6);
    background: var(--bg-primary);
    border-radius: 1rem;
    box-shadow: var(--shadow-md);
    transition: all var(--transition-normal);
}

.contact-card:hover {
    box-shadow: var(--shadow-lg);
}

.contact-icon {
    flex-shrink: 0;
    width: 3rem;
    height: 3rem;
    background: var(--primary-100);
    color: var(--primary-600);
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
}

[data-theme="dark"] .contact-icon {
    background: rgba(255, 107, 53, 0.1);
    color: var(--primary-400);
}

.contact-details h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--spacing-2);
}

.contact-details p {
    color: var(--text-secondary);
    line-height: 1.6;
}

/* Social Section */
.social-section {
    text-align: center;
}

.social-section h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--spacing-4);
}

.social-section .social-links {
    display: flex;
    justify-content: center;
    gap: var(--spacing-4);
}

.social-section .social-links a {
    width: 3rem;
    height: 3rem;
    background: var(--primary-100);
    color: var(--primary-600);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    transition: all var(--transition-normal);
}

.social-section .social-links a:hover {
    background: var(--primary-500);
    color: white;
    transform: translateY(-2px);
}

[data-theme="dark"] .social-section .social-links a {
    background: rgba(255, 107, 53, 0.1);
    color: var(--primary-400);
}

[data-theme="dark"] .social-section .social-links a:hover {
    background: var(--primary-500);
    color: white;
}

/* FAQ Section */
.faq-section {
    padding: var(--spacing-16) 0;
    background: var(--bg-secondary);
}

.faq-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
    max-width: 48rem;
    margin: 0 auto;
}

.faq-item {
    background: var(--bg-primary);
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    transition: all var(--transition-normal);
}

.faq-item:hover {
    box-shadow: var(--shadow-md);
}

.faq-question {
    width: 100%;
    padding: var(--spacing-6);
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
    transition: all var(--transition-normal);
}

.faq-question:hover {
    color: var(--primary-600);
}

.faq-question i {
    transition: transform var(--transition-normal);
}

.faq-item.open .faq-question i {
    transform: rotate(180deg);
}

.faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height var(--transition-normal);
}

.faq-answer p {
    padding: 0 var(--spacing-6) var(--spacing-6);
    color: var(--text-secondary);
    line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 768px) {
    .contact-hero .hero-title {
        font-size: 2rem;
    }
    
    .contact-cards {
        grid-template-columns: 1fr;
    }
    
    .contact-card {
        padding: var(--spacing-4);
    }
    
    .contact-icon {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 1rem;
    }
}
`;

// Inject contact CSS
const contactStyle = document.createElement('style');
contactStyle.textContent = contactCSS;
document.head.appendChild(contactStyle);

// Initialize contact page functionality
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
    new FAQManager();
    new ContactAnimations();
});
