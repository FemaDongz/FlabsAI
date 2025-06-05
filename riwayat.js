document.addEventListener('DOMContentLoaded', () => {
    const flabsUsernameGlobal = localStorage.getItem('flabsai_username'); // Get username once
    if (!flabsUsernameGlobal) {
        window.location.href = 'login.html';
        return;
    }

    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const chatHistoryContainer = document.getElementById('chatHistoryContainer');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    const noHistoryMessage = chatHistoryContainer.querySelector('.no-history-message');
    const CHAT_HISTORY_KEY = 'flabs_chatHistory';

    function displayChatHistory() {
        // Clear current display first, but keep the noHistoryMessage element
        let child = chatHistoryContainer.firstChild;
        while (child) {
            if (child !== noHistoryMessage) {
                const next = child.nextSibling;
                chatHistoryContainer.removeChild(child);
                child = next;
            } else {
                child = child.nextSibling;
            }
        }

        const history = JSON.parse(localStorage.getItem(CHAT_HISTORY_KEY) || '[]');

        if (history.length === 0) {
            if (noHistoryMessage) noHistoryMessage.style.display = 'block';
            return;
        }

        if (noHistoryMessage) noHistoryMessage.style.display = 'none';

        history.forEach(entry => {
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('history-entry');
            entryDiv.classList.add(entry.role === 'user' ? 'entry-user' : 'entry-model');

            const headerDiv = document.createElement('div');
            headerDiv.classList.add('entry-header');

            const roleSpan = document.createElement('span');
            roleSpan.classList.add('role');
            roleSpan.textContent = entry.role === 'user' ? (entry.username || 'User') : 'FlabsAI';
            headerDiv.appendChild(roleSpan);

            if (entry.timestamp) {
                const timeSpan = document.createElement('span');
                timeSpan.classList.add('timestamp');
                timeSpan.textContent = new Date(entry.timestamp).toLocaleString();
                headerDiv.appendChild(timeSpan);
            }
            entryDiv.appendChild(headerDiv);

            let messageText = "";
            if (Array.isArray(entry.parts)) {
                const textPart = entry.parts.find(part => part.text);
                if (textPart) {
                    messageText = textPart.text;
                    // Check for attachment info in user messages if stored that way
                    if (entry.role === 'user' && entry.attachment && entry.attachment.name) {
                        messageText = messageText.replace(`[Attached ${entry.attachment.type}: ${entry.attachment.name}]`, '').trim(); // Remove if already in text
                        messageText += `\n[Attached ${entry.attachment.type}: ${entry.attachment.name}]`; // Add it cleanly
                    }
                } else if (entry.parts.find(part => part.inlineData || part.imageUrl || part.processedCanvasDataUrl || entry.imageMeta)) {
                     messageText = entry.imageMeta ? `[ImageAI: ${entry.imageMeta}]` : "[Image or file content]";
                } else {
                     messageText = entry.parts.map(p => p.text || '').join(' ') || "(No text content)";
                }
            } else if (typeof entry.parts === 'string') {
                messageText = entry.parts;
            }

            const messageP = document.createElement('p');
            messageP.classList.add('message-text');
            // Sanitize and then set innerHTML to render potential <br> from multi-line inputs
            // For simplicity, just using textContent and relying on pre-wrap for now.
            messageP.textContent = messageText || "(No text content)";
            entryDiv.appendChild(messageP);

            chatHistoryContainer.appendChild(entryDiv);
        });
    }

    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all chat history? This cannot be undone.')) {
                localStorage.removeItem(CHAT_HISTORY_KEY);
                displayChatHistory();
            }
        });
    }

    displayChatHistory();
    console.log("Riwayat JS Loaded. User:", flabsUsernameGlobal);
});
