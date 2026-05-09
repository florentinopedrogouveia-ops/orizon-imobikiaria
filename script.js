document.addEventListener('DOMContentLoaded', () => {
    // 0. Preloader
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 1000);
    });

    // 1. Mobile Menu Logic
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        menuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    };

    menuBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
    });

    // 2. Hero Scroll Animation
    const heroContainer = document.querySelector('.hero-scroll-container');
    const heroBg = document.querySelector('.hero-bg-image');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroBtn = document.querySelector('.hero-btn-container');

    window.addEventListener('scroll', () => {
        const containerRect = heroContainer.getBoundingClientRect();
        const containerTop = containerRect.top;
        const containerHeight = containerRect.height;
        const windowHeight = window.innerHeight;

        // Calculate progress (0 to 1)
        // containerTop starts at 0 and goes to -(containerHeight - windowHeight)
        let progress = -containerTop / (containerHeight - windowHeight);
        progress = Math.max(0, Math.min(1, progress));

        // Background Zoom
        const scale = 1 + (progress * 0.5); // Zooms from 1 to 1.5
        heroBg.style.transform = `scale(${scale})`;

        // Title and Subtitle Fade/Slide
        const opacity = 1 - (progress * 2); // Fades out by 50% scroll
        const translateY = progress * -100; // Slides up
        
        heroTitle.style.opacity = Math.max(0, opacity);
        heroSubtitle.style.opacity = Math.max(0, opacity);
        heroBtn.style.opacity = Math.max(0, opacity);
        
        heroTitle.style.transform = `translateY(${translateY}px)`;
        heroSubtitle.style.transform = `translateY(${translateY * 0.5}px)`;
        heroBtn.style.transform = `translateY(${translateY * 1.5}px)`;
    });

    // 3. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Intersection Observer for Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // 5. Card Hover Interaction (Enhanced)
    const cards = document.querySelectorAll('.property-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 6. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
