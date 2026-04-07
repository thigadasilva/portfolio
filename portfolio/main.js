document.addEventListener('DOMContentLoaded', () => {

    // 1. Preloader logic
    const preloader = document.getElementById('preloader');
    
    // Allow the preloader animation to run for 2.5 seconds before hiding
    setTimeout(() => {
        preloader.classList.remove('active');
        
        // After preloader fades out, optionally trigger an entry animation for the Home Screen
        // For now, #home is default active, but if we wanted to sequence it:
        document.getElementById('home').classList.add('active');
    }, 2500);

    // 2. Navigation interactions
    const quadrants = document.querySelectorAll('.quadrant');
    const backBtns = document.querySelectorAll('.back-btn');
    const screens = document.querySelectorAll('.screen.overlay');

    // Click on a quadrant to open target section
    quadrants.forEach(quad => {
        quad.addEventListener('click', () => {
            const targetId = quad.getAttribute('data-target');
            const targetScreen = document.getElementById(targetId);
            
            if (targetScreen) {
                targetScreen.classList.add('active');
            }
        });
    });

    // Click on a back button to close the currently active overlay
    backBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Find the parent overlay of the button
            const overlay = e.target.closest('.screen.overlay');
            if (overlay) {
                overlay.classList.remove('active');
            }
        });
    });

    // 3. Play video on hover
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
