document.addEventListener('DOMContentLoaded', () => {

    // 1. Preloader logic
    const preloader = document.getElementById('preloader');
    
    // Wait for bar animation (2.2s) + a small buffer, then fade out
    setTimeout(() => {
        if (preloader) preloader.classList.add('hidden');
        
        // Start typing animation after preloader fades out
        setTimeout(typeWriter, 800);
    }, 2500);

    // 2. Typing Animation for Hero
    const textToType = "Transformando a sua imagem em presença online.";
    const typingElement = document.getElementById('typing-text');
    let i = 0;
    const typingSpeed = 45; // ms per character

    function typeWriter() {
        if (i < textToType.length && typingElement) {
            typingElement.innerHTML += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        }
    }

    // 3. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]:not(#overlay-access-btn)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
            // Fecha menu mobile ao clicar em um link
            closeMenu();
        });
    });

    // 4. Menu Hambúrguer
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav      = document.getElementById('main-nav');
    const navOverlay   = document.getElementById('nav-overlay');

    function openMenu() {
        hamburgerBtn.classList.add('open');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        mainNav.classList.add('mobile-open');
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        hamburgerBtn.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('mobile-open');
        navOverlay.classList.remove('active');
        // Só restaura scroll se nenhum outro modal estiver aberto
        const overlayOpen  = document.getElementById('project-overlay')?.classList.contains('active');
        const sidebarOpen  = document.getElementById('projects-sidebar')?.classList.contains('active');
        if (!overlayOpen && !sidebarOpen) {
            document.body.style.overflow = '';
        }
    }

    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.contains('open') ? closeMenu() : openMenu();
    });



    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        const video = card.querySelector('video');
        if (video) {
            card.addEventListener('mouseenter', () => {
                video.play();
            });
            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        }
    });

    // 5. Project Card → Overlay
    const overlay        = document.getElementById('project-overlay');
    const overlayTitle   = document.getElementById('overlay-title');
    const overlayDesc    = document.getElementById('overlay-desc');
    const overlayAccess  = document.getElementById('overlay-access-btn');
    const overlayCloseBtn = document.getElementById('overlay-close-btn');

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            overlayTitle.textContent  = card.dataset.title  || '';
            overlayDesc.textContent   = card.dataset.desc   || '';
            overlayAccess.href        = card.dataset.link   || '#';
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Fechar overlay APENAS pelo botão X
    overlayCloseBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // 6. Sidebar de "Ver Mais Projetos"
    const sidebar         = document.getElementById('projects-sidebar');
    const sidebarBackdrop = document.getElementById('sidebar-backdrop');
    const openSidebarBtn  = document.getElementById('open-sidebar-btn');
    const sidebarCloseBtn = document.getElementById('sidebar-close-btn');

    openSidebarBtn.addEventListener('click', () => {
        sidebar.classList.add('active');
        sidebarBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Fechar sidebar APENAS pelo botão X
    sidebarCloseBtn.addEventListener('click', () => {
        sidebar.classList.remove('active');
        sidebarBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    });

});

