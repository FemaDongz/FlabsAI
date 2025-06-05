document.addEventListener('DOMContentLoaded', () => {
    const flabsUsernameGlobal = localStorage.getItem('flabsai_username');
    if (!flabsUsernameGlobal) {
        window.location.href = 'login.html';
        return;
    }

    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const usernameDisplayInput = document.getElementById('usernameDisplay');
    if (usernameDisplayInput) {
        usernameDisplayInput.value = flabsUsernameGlobal;
    }

    const changeUsernameBtn = document.getElementById('changeUsernameBtn');
    if(changeUsernameBtn){
        changeUsernameBtn.addEventListener('click', () => {
            const newUsername = prompt("Enter your new guest username:", flabsUsernameGlobal);
            if (newUsername && newUsername.trim() !== "") {
                localStorage.setItem('flabsai_username', newUsername.trim());
                if (usernameDisplayInput) usernameDisplayInput.value = newUsername.trim();
                alert('Username updated! The change will be fully reflected after your next login or page refresh on other pages.');
                // Optionally, update the display in index.html sidebar if possible or force reload
                // For simplicity now, user will see change on next visit to index.html or dashboard.
            } else if (newUsername !== null) { // User didn't cancel, but entered empty
                alert("Username cannot be empty.");
            }
        });
    }

    const clearAllDataBtn = document.getElementById('clearAllDataBtn');
    const CHAT_HISTORY_KEY = 'flabs_chatHistory'; // Ensure this matches index.html
    if(clearAllDataBtn){
        clearAllDataBtn.addEventListener('click', () => {
            if(confirm('Are you sure you want to clear ALL local FlabsAI data? This includes your guest username and chat history.')){
                localStorage.removeItem('flabsai_username');
                localStorage.removeItem(CHAT_HISTORY_KEY);
                alert('All local data cleared. You will be redirected to login.');
                window.location.href = 'login.html';
            }
        });
    }

    // Theme Toggle Functionality
    const themeButtons = document.querySelectorAll('.theme-btn');
    const THEME_KEY = 'flabsai_theme';
    const currentTheme = localStorage.getItem(THEME_KEY) || 'dark'; // Default to dark

    function applyThemePreference(theme) {
        // This function would ideally toggle a class on the <body> element
        // e.g., document.body.classList.remove('dark-theme', 'light-theme');
        // document.body.classList.add(theme + '-theme');
        // For now, it just updates button appearance and stores preference.
        // Actual theme switching CSS needs to be in core.css based on body class.
        themeButtons.forEach(btn => {
            if (btn.dataset.theme === theme) {
                btn.classList.add('active');
                btn.style.backgroundColor = 'var(--accent-primary)'; // Example active style
                btn.style.color = 'white';
                btn.style.borderColor = 'var(--accent-primary)';
            } else {
                btn.classList.remove('active');
                btn.style.backgroundColor = 'var(--card-bg-color)'; // Reset to default
                btn.style.color = 'var(--text-color-secondary)';
                btn.style.borderColor = 'var(--border-color)';
            }
        });
        console.log(`Theme preference set to: ${theme}`);
    }

    applyThemePreference(currentTheme); // Apply stored or default theme on load

    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedTheme = button.dataset.theme;
            localStorage.setItem(THEME_KEY, selectedTheme);
            applyThemePreference(selectedTheme);
            alert('Theme preference saved. Full theme switching requires further CSS implementation in core.css.');
        });
    });

    console.log("Pengaturan JS Loaded for user:", flabsUsernameGlobal);
});
