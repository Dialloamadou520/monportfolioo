document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const contactForm = document.getElementById('contact-form');
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    // Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        html.classList.add('dark');
    }
    
    function toggleTheme() {
        html.classList.toggle('dark');
        const theme = html.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    }
    
    themeToggle.addEventListener('click', toggleTheme);
    themeToggleMobile.addEventListener('click', toggleTheme);

    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les valeurs du formulaire
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const phone = document.getElementById('contact-phone').value;
        const subject = document.getElementById('contact-subject').value;
        const message = document.getElementById('contact-message').value;

        // Construire le message WhatsApp
        let whatsappMessage = `*Nouveau message du portfolio*\n\n`;
        whatsappMessage += `👤 *Nom:* ${name}\n`;
        whatsappMessage += `📧 *Email:* ${email}\n`;
        if (phone) {
            whatsappMessage += `📱 *Téléphone:* ${phone}\n`;
        }
        whatsappMessage += `📋 *Sujet:* ${subject}\n\n`;
        whatsappMessage += `💬 *Message:*\n${message}`;

        // Encoder le message pour l'URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Votre numéro WhatsApp (format international sans + ni espaces)
        const whatsappNumber = '221773525382';
        
        // Créer l'URL WhatsApp
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Ouvrir WhatsApp dans un nouvel onglet
        window.open(whatsappURL, '_blank');
        
        // Afficher un message de confirmation
        alert(`Merci ${name} ! Vous allez être redirigé vers WhatsApp pour envoyer votre message.`);
        
        // Réinitialiser le formulaire
        contactForm.reset();
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-card, .project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('shadow-lg');
        } else {
            nav.classList.remove('shadow-lg');
        }
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('text-blue-600', 'font-bold');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-blue-600', 'font-bold');
            }
        });
    });
});
