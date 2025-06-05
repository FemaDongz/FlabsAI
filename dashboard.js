document.addEventListener('DOMContentLoaded', () => {
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const flabsUsername = localStorage.getItem('flabsai_username');
    if (!flabsUsername) {
        window.location.href = 'login.html'; // Redirect if not logged in
    } else {
        const welcomeMessageSpan = document.getElementById('welcomeMessage');
        if (welcomeMessageSpan) {
            welcomeMessageSpan.textContent = `User: ${flabsUsername}`;
        }
        const welcomeCardTitle = document.getElementById('welcomeCardTitle');
        if (welcomeCardTitle){
            welcomeCardTitle.textContent = `Welcome, ${flabsUsername}!`;
        }
    }
    console.log("Modern Dashboard JS Loaded with username: ", flabsUsername);
});
