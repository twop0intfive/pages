// js/init.js
document.addEventListener('DOMContentLoaded', () => {
    // Check if a flag exists in sessionStorage.
    if (!sessionStorage.getItem('isNotInitialLoad')) {
        // If the flag doesn't exist, this is the first page load of the session.
        // Add the animation class to the body.
        document.body.classList.add('initial-load');
        
        // Set the flag in sessionStorage so this logic doesn't run again.
        sessionStorage.setItem('isNotInitialLoad', 'true');
    }
});