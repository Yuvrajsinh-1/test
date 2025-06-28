// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.bindEvents();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const themeToggle = document.getElementById('themeToggle');
        const icon = themeToggle.querySelector('i');
        
        if (this.theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    bindEvents() {
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('click', () => this.toggle());
    }
}

// Mobile Navigation
class MobileNavigation {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        this.bindEvents();
    }

    toggle() {
        this.isOpen = !this.isOpen;
        const mobileNav = document.getElementById('mobileNav');
        const menuBtn = document.getElementById('mobileMenuBtn');
        const icon = menuBtn.querySelector('i');

        if (this.isOpen) {
            mobileNav.classList.add('active');
            icon.className = 'fas fa-times';
        } else {
            mobileNav.classList.remove('active');
            icon.className = 'fas fa-bars';
        }
    }

    close() {
        this.isOpen = false;
        const mobileNav = document.getElementById('mobileNav');
        const menuBtn = document.getElementById('mobileMenuBtn');
        const icon = menuBtn.querySelector('i');

        mobileNav.classList.remove('active');
        icon.className = 'fas fa-bars';
    }

    bindEvents() {
        const menuBtn = document.getElementById('mobileMenuBtn');
        menuBtn.addEventListener('click', () => this.toggle());

        // Close mobile menu when clicking on links
        const mobileLinks = document.querySelectorAll('.nav-mobile .nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => this.close());
        });

        // Handle mobile dropdown
        const mobileDropdownBtn = document.querySelector('.mobile-dropdown-btn');
        const mobileDropdownContent = document.querySelector('.mobile-dropdown-content');
        
        if (mobileDropdownBtn && mobileDropdownContent) {
            mobileDropdownBtn.addEventListener('click', (e) => {
                e.preventDefault();
                mobileDropdownContent.classList.toggle('active');
                const icon = mobileDropdownBtn.querySelector('i');
                icon.style.transform = mobileDropdownContent.classList.contains('active') 
                    ? 'rotate(180deg)' : 'rotate(0deg)';
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const mobileNav = document.getElementById('mobileNav');
            const menuBtn = document.getElementById('mobileMenuBtn');
            
            if (this.isOpen && !mobileNav.contains(e.target) && !menuBtn.contains(e.target)) {
                this.close();
            }
        });
    }
}

// Search Modal
class SearchModal {
    constructor() {
        this.isOpen = false;
        this.searchData = [
            {
                id: '1',
                title: 'Kutch District',
                type: 'district',
                description: 'Land of the Great Rann, famous for white salt desert and vibrant culture',
                location: 'Gujarat',
                href: 'kutch.html'
            },
            {
                id: '2',
                title: 'Dwarka',
                type: 'district',
                description: 'Holy city of Lord Krishna, ancient temples and spiritual significance',
                location: 'Gujarat',
                href: 'dwarka.html'
            },
            {
                id: '3',
                title: 'Hotel Prince Palace',
                type: 'hotel',
                description: 'Luxury accommodation in the heart of Bhuj with modern amenities',
                location: 'Bhuj',
                href: 'bhuj.html'
            },
            {
                id: '4',
                title: 'Toran Restaurant',
                type: 'restaurant',
                description: 'Authentic Gujarati cuisine with traditional flavors and hospitality',
                location: 'Ahmedabad',
                href: 'ahmedabad.html'
            },
            {
                id: '5',
                title: 'Somnath Temple',
                type: 'attraction',
                description: 'One of the twelve Jyotirlinga shrines of Lord Shiva',
                location: 'Junagadh',
                href: 'junagadh.html'
            },
            {
                id: '6',
                title: 'Junagadh',
                type: 'district',
                description: 'Rich historical heritage with magnificent forts and proximity to Gir National Park',
                location: 'Gujarat',
                href: 'junagadh.html'
            },
            {
                id: '7',
                title: 'Ahmedabad',
                type: 'district',
                description: 'UNESCO World Heritage city with stunning architecture and vibrant street food',
                location: 'Gujarat',
                href: 'ahmedabad.html'
            },
            {
                id: '8',
                title: 'Bhuj',
                type: 'district',
                description: 'Gateway to Kutch with rich history, handicrafts, and traditional architecture',
                location: 'Gujarat',
                href: 'bhuj.html'
            }
        ];
        this.init();
    }

    init() {
        this.bindEvents();
    }

    open() {
        this.isOpen = true;
        const modal = document.getElementById('searchModal');
        const searchInput = document.getElementById('searchInput');
        
        modal.classList.add('active');
        setTimeout(() => searchInput.focus(), 100);
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.isOpen = false;
        const modal = document.getElementById('searchModal');
        const searchInput = document.getElementById('searchInput');
        
        modal.classList.remove('active');
        searchInput.value = '';
        this.showPlaceholder();
        document.body.style.overflow = '';
    }

    search(query) {
        const resultsContainer = document.getElementById('searchResults');
        
        if (!query.trim()) {
            this.showPlaceholder();
            return;
        }

        const filteredResults = this.searchData.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase()) ||
            item.location.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredResults.length === 0) {
            this.showNoResults(query);
            return;
        }

        this.showResults(filteredResults);
    }

    showPlaceholder() {
        const resultsContainer = document.getElementById('searchResults');
        resultsContainer.innerHTML = `
            <div class="search-placeholder">
                <i class="fas fa-search"></i>
                <p>Start typing to search...</p>
            </div>
        `;
    }

    showNoResults(query) {
        const resultsContainer = document.getElementById('searchResults');
        resultsContainer.innerHTML = `
            <div class="search-placeholder">
                <i class="fas fa-search"></i>
                <p>No results found for "${query}"</p>
                <p style="font-size: 0.875rem; color: var(--text-tertiary); margin-top: 0.5rem;">
                    Try searching for districts, hotels, or restaurants
                </p>
            </div>
        `;
    }

    showResults(results) {
        const resultsContainer = document.getElementById('searchResults');
        
        resultsContainer.innerHTML = results.map(result => `
            <a href="${result.href}" class="search-result" onclick="searchModal.close()">
                <div class="search-result-content">
                    <div class="search-result-icon ${result.type}">
                        <i class="fas fa-${this.getIcon(result.type)}"></i>
                    </div>
                    <div class="search-result-details">
                        <div class="search-result-header">
                            <h3 class="search-result-title">${result.title}</h3>
                            <span class="search-result-type ${result.type}">${result.type}</span>
                        </div>
                        <p class="search-result-description">${result.description}</p>
                        <p class="search-result-location">📍 ${result.location}</p>
                    </div>
                </div>
            </a>
        `).join('');
    }

    getIcon(type) {
        const icons = {
            district: 'map-marker-alt',
            hotel: 'building',
            restaurant: 'utensils',
            attraction: 'camera'
        };
        return icons[type] || 'search';
    }

    bindEvents() {
        const searchBtn = document.getElementById('searchBtn');
        const searchModal = document.getElementById('searchModal');
        const searchModalClose = document.getElementById('searchModalClose');
        const searchInput = document.getElementById('searchInput');

        // Open search modal
        searchBtn.addEventListener('click', () => this.open());

        // Close search modal
        searchModalClose.addEventListener('click', () => this.close());

        // Close modal when clicking outside
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) {
                this.close();
            }
        });

        // Handle search input
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.search(e.target.value);
            }, 300);
        });

        // Handle keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Open search with Ctrl/Cmd + K
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.open();
            }
            
            // Close search with Escape
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Add smooth scrolling to anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Intersection Observer for Animations
class AnimationObserver {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        document.querySelectorAll('.animate-slide-up').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    }
}

// Header Scroll Effect
class HeaderScrollEffect {
    constructor() {
        this.init();
    }

    init() {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
            
            // Update for dark theme
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                if (currentScrollY > 100) {
                    header.style.background = 'rgba(17, 24, 39, 0.98)';
                } else {
                    header.style.background = 'rgba(17, 24, 39, 0.95)';
                }
            }
            
            lastScrollY = currentScrollY;
        });
    }
}

// Loading Animation
class LoadingAnimation {
    constructor() {
        this.init();
    }

    init() {
        // Add loading class to body
        document.body.classList.add('loading');
        
        // Remove loading class when page is fully loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.remove('loading');
                document.body.classList.add('loaded');
            }, 500);
        });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    const themeManager = new ThemeManager();
    const mobileNavigation = new MobileNavigation();
    const searchModal = new SearchModal();
    const smoothScroll = new SmoothScroll();
    const animationObserver = new AnimationObserver();
    const headerScrollEffect = new HeaderScrollEffect();
    const loadingAnimation = new LoadingAnimation();

    // Make search modal globally accessible
    window.searchModal = searchModal;

    // Add some interactive enhancements
    addInteractiveEnhancements();
});

// Interactive Enhancements
function addInteractiveEnhancements() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.district-card, .feature-card, .tip-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Add click ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .district-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            const heroImage = hero.querySelector('.hero-bg img');
            if (heroImage) {
                heroImage.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Add typing effect to search placeholder
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const placeholders = [
            'Search districts...',
            'Find hotels...',
            'Discover restaurants...',
            'Explore attractions...'
        ];
        let currentPlaceholder = 0;
        
        setInterval(() => {
            if (!searchInput.matches(':focus')) {
                searchInput.placeholder = placeholders[currentPlaceholder];
                currentPlaceholder = (currentPlaceholder + 1) % placeholders.length;
            }
        }, 3000);
    }
}

// Add CSS for ripple effect
const rippleCSS = `
.btn, .district-btn {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.loading {
    overflow: hidden;
}

.loading * {
    animation-play-state: paused;
}

.loaded * {
    animation-play-state: running;
}
`;

// Inject ripple CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);