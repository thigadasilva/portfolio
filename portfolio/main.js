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
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Play video on hover
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        const video = card.querySelector('video');
        if (video) {
            // On mouse hover, start playback
            card.addEventListener('mouseenter', () => {
                video.play();
            });
            // Stop playback when mouse leaves
            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0; // Rewind the video to start
            });
        }
    });

});
