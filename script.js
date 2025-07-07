// Initialize particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#38ef7d'
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#38ef7d',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});

// Smooth scrolling for navigation links
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

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 32, 39, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 32, 39, 0.95)';
    }
});

// Animate elements on scroll
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

// Observe all service cards and portfolio items
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.service-card, .portfolio-card, .about-content, .contact-form');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});

// Animate statistics counter
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target.toString().includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else if (target.toString().includes('+')) {
            element.textContent = Math.floor(current) + '+';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = counter.textContent;
                let numericTarget;
                
                if (target.includes('%')) {
                    numericTarget = parseInt(target.replace('%', ''));
                } else if (target.includes('+')) {
                    numericTarget = parseInt(target.replace('+', ''));
                } else if (target.includes('/')) {
                    counter.textContent = target; // Keep as is for "24/7"
                    return;
                } else {
                    numericTarget = parseInt(target);
                }
                
                animateCounter(counter, numericTarget);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Animate tech stack items
anime({
    targets: '.tech-item',
    translateY: [50, 0],
    opacity: [0, 1],
    delay: anime.stagger(100),
    duration: 800,
    easing: 'easeOutExpo'
});

// Floating animation for service icons
anime({
    targets: '.service-icon',
    translateY: [0, -10, 0],
    duration: 3000,
    loop: true,
    easing: 'easeInOutSine',
    delay: anime.stagger(200)
});

// Portfolio card hover animations
document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        anime({
            targets: this.querySelector('.portfolio-overlay'),
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
    
    card.addEventListener('mouseleave', function() {
        anime({
            targets: this.querySelector('.portfolio-overlay'),
            opacity: [1, 0],
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
});

// Form submission animation
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Animate button
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    anime({
        targets: submitBtn,
        scale: [1, 0.95, 1],
        duration: 200,
        easing: 'easeInOutQuad'
    });
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #11998e, #38ef7d)';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            this.reset();
        }, 2000);
    }, 1500);
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const floatingCard = document.querySelector('.floating-card');
    
    if (heroContent && floatingCard) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        floatingCard.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Mobile menu animation
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                anime({
                    targets: '.navbar-nav .nav-item',
                    translateX: [0, -50],
                    opacity: [1, 0],
                    delay: anime.stagger(50),
                    duration: 300,
                    easing: 'easeInQuad'
                });
            } else {
                setTimeout(() => {
                    anime({
                        targets: '.navbar-nav .nav-item',
                        translateX: [-50, 0],
                        opacity: [0, 1],
                        delay: anime.stagger(50),
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                }, 100);
            }
        });
    }
});

// Loading animation
window.addEventListener('load', function() {
    anime({
        targets: '.hero-title',
        translateY: [100, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo'
    });
    
    anime({
        targets: '.hero-subtitle',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: 200,
        easing: 'easeOutExpo'
    });
    
    anime({
        targets: '.hero-buttons',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: 400,
        easing: 'easeOutExpo'
    });
});

// Scroll progress indicator
function createScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 4px;
        background: linear-gradient(135deg, #11998e, #38ef7d);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const progress = (scrolled / maxScroll) * 100;
        indicator.style.width = progress + '%';
    });
}

// Initialize scroll indicator
document.addEventListener('DOMContentLoaded', createScrollIndicator);