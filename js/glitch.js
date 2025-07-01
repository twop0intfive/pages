document.addEventListener('DOMContentLoaded', () => {
    const profilePic = document.getElementById('profile-pic');
    const profileContainer = document.querySelector('.profile-container');

    // IMPORTANT: Replace these with the actual paths to your images
    const mainPhoto = 'images/twop0intfive.jpeg';
    const glitchPhotos = [
        'images/twop0intfive-2023.jpeg',
        'images/twop0intfive-2024.jpeg'
    ];

    let glitching = false;
    let glitchTimeout;

    function startGlitch() {
        if (glitching || !profilePic) return;
        glitching = true;

        // Set the background image for pseudo-elements at the start
        profileContainer.style.setProperty('--bg-image', `url(${mainPhoto})`);
        profileContainer.classList.add('glitch');

        let glitchImageIndex = 0;
        let switchCount = 0;
        const maxSwitches = 20 + Math.floor(Math.random() * 10);

        const glitchInterval = setInterval(() => {
            // Alternate between showing the glitch image and the chromatic effect
            if (switchCount % 2 === 0) {
                // Show a clear glitch image
                profilePic.style.opacity = '1';
                profileContainer.classList.remove('chromatic-aberration');

                const xOffset = (Math.random() - 0.5) * 20;
                const yOffset = (Math.random() - 0.5) * 20;
                profilePic.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
                
                profilePic.src = glitchPhotos[glitchImageIndex];
                glitchImageIndex = (glitchImageIndex + 1) % glitchPhotos.length;

            } else {
                // Show only the chromatic aberration effect
                profilePic.style.opacity = '0';
                profileContainer.classList.add('chromatic-aberration');
            }
            
            switchCount++;

            if (switchCount >= maxSwitches) {
                clearInterval(glitchInterval);

                // Restore to the main photo clearly
                profilePic.style.opacity = '1';
                profilePic.style.transform = 'translate(0, 0)';
                profilePic.src = mainPhoto;
                profileContainer.classList.remove('glitch', 'chromatic-aberration');
                glitching = false;
            }
        }, 40); // 40ms interval for a fast stutter effect
    }

    function scheduleNextGlitch() {
        const randomDelay = Math.random() * 8000 + 4000;
        clearTimeout(glitchTimeout);
        glitchTimeout = setTimeout(() => {
            startGlitch();
            scheduleNextGlitch();
        }, randomDelay);
    }

    function preloadImages() {
        [mainPhoto, ...glitchPhotos].forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    preloadImages();
    scheduleNextGlitch();
});