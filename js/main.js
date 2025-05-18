document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const header = document.querySelector('header');
    const mobileNav = document.querySelector('.mobile-nav');
    
    mobileMenuToggle.addEventListener('click', function() {
        document.body.classList.toggle('mobile-nav-open');
    });
    
    document.querySelectorAll('.mobile-nav .nav-link').forEach(link => {
        link.addEventListener('click', function() {
            document.body.classList.remove('mobile-nav-open');
        });
    });
    
    function navigateToSection(sectionId) {
        navLinks.forEach(item => item.classList.remove('active'));
        const activeNavLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
        if (activeNavLink) {
            activeNavLink.classList.add('active');
        }
        
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) {
                setTimeout(() => {
                    section.classList.add('active');
                }, 300);
            }
        });
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            navigateToSection(sectionId);
        });
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            navigateToSection(sectionId);
        });
    });
    
    const hashId = window.location.hash.substring(1);
    if (hashId) {
        navLinks.forEach(link => {
            if (link.getAttribute('data-section') === hashId) {
                link.click();
            }
        });
    } else {
        document.querySelector('.nav-link[data-section="home"]').classList.add('active');
        document.getElementById('home').classList.add('active');
    }
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let valid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            const emailField = contactForm.querySelector('[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    valid = false;
                    emailField.style.borderColor = 'red';
                }
            }
            
            if (valid) {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all required fields correctly.');
            }
        });
    }
    
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.project-card, .service-card, .stat-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (elementPosition.top < windowHeight * 0.85) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});
