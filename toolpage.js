// toolpage.js
document.addEventListener('DOMContentLoaded', () => {
    // Login Check
    const flabsUsername = localStorage.getItem('flabsai_username');
    if (!flabsUsername) {
        window.location.href = 'login.html';
        return;
    }

    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    console.log("Tool Page JS Loaded. User:", flabsUsername);
});
