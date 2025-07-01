// js/router.js

document.addEventListener('DOMContentLoaded', () => {
    const pageWrapper = document.querySelector('.page-wrapper');

    // --- SLIDE IN ---
    // On page load, check if we need to animate the content in
    const transitionType = sessionStorage.getItem('transitionType');
    if (transitionType) {
        pageWrapper.classList.add(transitionType);
        // Clear the session storage so it doesn't happen on refresh
        sessionStorage.removeItem('transitionType');
    }

    // --- SLIDE OUT ---
    // Find all navigation links that should trigger a slide
    const navLinks = document.querySelectorAll('.command-line, .webring-button');

    navLinks.forEach(link => {
        // Exclude external links
        if (link.hostname === window.location.hostname) {
            link.addEventListener('click', (event) => {
                event.preventDefault(); // Stop the browser from navigating instantly
                
                const destination = link.href;
                let animationClass = 'slide-out-left';
                let nextAnimationClass = 'slide-in-right';

                // If this is a "RETURN_HOME" button, slide the other way
                if (link.classList.contains('webring-button')) {
                    animationClass = 'slide-out-right';
                    nextAnimationClass = 'slide-in-left';
                }

                // Store the next page's animation type
                sessionStorage.setItem('transitionType', nextAnimationClass);

                // Apply the slide-out animation
                pageWrapper.classList.add(animationClass);

                // Wait for the animation to finish, then navigate
                setTimeout(() => {
                    window.location.href = destination;
                }, 500); // This should match the animation duration in CSS
            });
        }
    });
});