// Preloader
window.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const loadingBar = document.querySelector('.loading-bar');
    
    if (preloader && loadingBar) {
        let progress = 0;
        
        // Simular o progresso do carregamento
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 8) + 3; // incrementos aleatórios
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                loadingBar.style.width = `${progress}%`;
                
                // Aguarda um pequeno delay ao chegar em 100% para sumir com o preloader
                setTimeout(() => {
                    preloader.classList.add('preloader-hidden');
                    
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 500); // 500ms é o tempo da transição no CSS
                }, 300);
            } else {
                loadingBar.style.width = `${progress}%`;
            }
        }, 30);
    }
});

// Mobile Navigation Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const bars = document.querySelectorAll('.mobile-menu-btn .bar');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active-mobile-menu');
        
        // Simple hamburger to X animation
        if (navLinks.classList.contains('active-mobile-menu')) {
            bars[0].style.transform = 'translateY(8px) rotate(45deg)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
}

// Subtle parallax effect on background based on mouse movement
document.addEventListener('mousemove', (e) => {
    const bgElements = document.querySelector('.background-elements');
    
    // Calculate offset based on mouse proximity to center
    // Division by 60 for a very subtle, smooth effect
    const x = (window.innerWidth / 2 - e.clientX) / 100;
    const y = (window.innerHeight / 2 - e.clientY) / 100;
    
    if (bgElements) {
        bgElements.style.transform = `translate(${x}px, ${y}px)`;
    }
});

// Project Card Interaction
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('active');
    });
});

// Smooth scroll for anchor links

