document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navList = document.querySelector('.nav-list');
    
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (navList.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navList.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // WhatsApp Form Submission
    const whatsappSubmit = document.getElementById('whatsappSubmit');
    if (whatsappSubmit) {
        whatsappSubmit.addEventListener('click', function() {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Format WhatsApp message
            let whatsappMessage = `New Message from ${name}:\n\n`;
            whatsappMessage += `Phone: ${phone}\n`;
            if (email) whatsappMessage += `Email: ${email}\n`;
            if (subject) whatsappMessage += `Subject: ${subject}\n\n`;
            whatsappMessage += `Message:\n${message}`;
            
            // Encode for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Create WhatsApp link (remove spaces and + from phone number)
            const whatsappUrl = `https://wa.me/254791720381?text=${encodedMessage}`;
            
            // Open in new tab
            window.open(whatsappUrl, '_blank');
        });
    }

    // Animate statistics counters
    const statItems = document.querySelectorAll('.stat-item');
    function animateCounters() {
        statItems.forEach(item => {
            const numberElement = item.querySelector('.stat-number');
            const target = parseInt(numberElement.textContent);
            let current = 0;
            const duration = 2000; // Animation duration in ms
            const increment = target / (duration / 16); // 60fps
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    numberElement.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    numberElement.textContent = target + '+';
                }
            };
            
            // Start animation when element is in view
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCounter();
                    observer.unobserve(item);
                }
            }, { threshold: 0.5 });
            
            observer.observe(item);
        });
    }

    // Initialize counters when about section is in view
    const aboutSection = document.getElementById('about');
    const aboutObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            aboutObserver.unobserve(aboutSection);
        }
    }, { threshold: 0.1 });

    aboutObserver.observe(aboutSection);

    // Service card animations
    const serviceCards = document.querySelectorAll('.service-card');
    function animateServiceCards() {
        serviceCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.style.transitionDelay = `${index * 0.1}s`;
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }

    // Set initial state for animation
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
    });

    window.addEventListener('scroll', animateServiceCards);
    animateServiceCards(); // Run once on load

    // Active nav link highlighting based on scroll position
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = header.offsetHeight;
            
            if (window.pageYOffset >= (sectionTop - headerHeight - 50)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Initialize active section on load
    window.dispatchEvent(new Event('scroll'));

    // Form validation for contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            if (!name || !phone || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // If you want to keep the form submission as backup
            // This would require server-side handling
            // contactForm.submit();
            
            // For demo purposes, just show a success message
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitButton.style.backgroundColor = '#2ecc71';
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.style.backgroundColor = '';
                contactForm.reset();
            }, 3000);
        });
    }
});