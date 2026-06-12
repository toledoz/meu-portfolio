document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       STICKY HEADER & SHRINK ON SCROLL
       ========================================================================== */
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on load

    /* ==========================================================================
       MOBILE MENU TOGGLE
       ========================================================================== */
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const toggleMenu = () => {
        mobileNavToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
        // Prevent body scrolling when menu is open
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    };
    
    const closeMenu = () => {
        mobileNavToggle.classList.remove('open');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
    };
    
    mobileNavToggle.addEventListener('click', toggleMenu);
    
    // Close menu when clicking link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside of menu
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('open') && 
            !navMenu.contains(e.target) && 
            !mobileNavToggle.contains(e.target)) {
            closeMenu();
        }
    });

    /* ==========================================================================
       TYPING ANIMATION
       ========================================================================== */
    const typingText = document.getElementById('typing-text');
    const words = [
        'Full Stack',
        'React',
        'React Native',
        'Node.js',
        'Java / Spring Boot'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 150;
    
    const type = () => {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove character
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeDelay = 75; // Faster when deleting
        } else {
            // Add character
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 150;
        }
        
        // Word completed typing
        if (!isDeleting && charIndex === currentWord.length) {
            typeDelay = 2000; // Pause at full word
            isDeleting = true;
        } 
        // Word completed deleting
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Move to next word
            typeDelay = 500; // Pause before starting new word
        }
        
        setTimeout(type, typeDelay);
    };
    
    // Start typing animation
    if (typingText) {
        setTimeout(type, 1000);
    }

    /* ==========================================================================
       ACTIVE LINK HIGHLIGHTING (Intersection Observer)
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    
    const activeLinkOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.35 // Triggers when 35% of the section is visible
    };
    
    const activeLinkObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, activeLinkOptions);
    
    sections.forEach(section => {
        activeLinkObserver.observe(section);
    });



    /* ==========================================================================
       CONTACT FORM VALIDATION & SIMULATION
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('form-submit-btn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect Form Values
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const subject = document.getElementById('form-subject').value.trim();
            const message = document.getElementById('form-message').value.trim();
            
            // Basic validation check
            if (!name || !email || !subject || !message) {
                showFeedback('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            // Email Regex pattern validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFeedback('Por favor, insira um e-mail válido.', 'error');
                return;
            }
            
            // Simulate API sending state
            submitBtn.disabled = true;
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = `Enviando... <i class="fa-solid fa-spinner fa-spin"></i>`;
            formFeedback.textContent = '';
            
            setTimeout(() => {
                // Success Simulation
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                showFeedback('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
                contactForm.reset();
            }, 1800);
        });
    }
    
    const showFeedback = (msg, type) => {
        formFeedback.textContent = msg;
        formFeedback.className = `form-feedback ${type}`;
        
        // Auto remove feedback after 5 seconds
        setTimeout(() => {
            formFeedback.textContent = '';
            formFeedback.className = 'form-feedback';
        }, 5000);
    };

    /* ==========================================================================
       SCROLL REVEAL ANIMATION SYSTEM
       ========================================================================== */
    // Add reveal class to various page elements dynamically
    const revealTargets = [
        '.section-header',
        '.hero-content',
        '.hero-visual',
        '.about-text',
        '.about-highlight',
        '.skills-card',
        '.project-featured',
        '.contact-info-panel',
        '.contact-form-panel'
    ];
    
    // Assign reveal class styles dynamically to avoid layout shifting on initial render
    revealTargets.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.classList.add('scroll-reveal');
        });
    });
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' // Offset to trigger slightly before coming fully into viewport
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Unobserve since we only want to reveal once
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});
