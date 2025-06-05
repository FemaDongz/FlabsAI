document.addEventListener('DOMContentLoaded', () => {
    const commandInput = document.getElementById('commandInput');
    const outputDiv = document.getElementById('output');
    const terminalDiv = document.getElementById('terminal');

    // Focus on the input field when the terminal is clicked
    terminalDiv.addEventListener('click', () => {
        commandInput.focus();
    });

    commandInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = commandInput.value.trim();
            processCommand(command);
            commandInput.value = ''; // Clear input field
        }
    });

    function processCommand(command) {
        appendOutput(`> ${command}`); // Display the command entered by the user

        if (command === 'help') {
            appendOutput('Available commands:');
            appendOutput('- help: Show this help message');
            appendOutput('- clear: Clear the terminal output');
            appendOutput('- date: Display the current date and time');
            appendOutput('- hello: Display a greeting message');
        } else if (command === 'clear') {
            outputDiv.innerHTML = '';
        } else if (command === 'date') {
            appendOutput(new Date().toString());
        } else if (command === 'hello') {
            appendOutput('Hello! Welcome to the FlabsAI Dashboard.');
        } else if (command === '') {
            // If the command is empty, do nothing, just add a new line prompt implicitly
        } else {
            appendOutput(`Command not found: ${command}`);
        }
        scrollToBottom();
    }

    function appendOutput(message) {
        const newLine = document.createElement('div');
        newLine.textContent = message;
        outputDiv.appendChild(newLine);
        scrollToBottom();
    }

    function scrollToBottom() {
        terminalDiv.scrollTop = terminalDiv.scrollHeight;
    }

    // Initial welcome message
    appendOutput("Welcome to FlabsAI Terminal Dashboard!");
    appendOutput("Type 'help' to see available commands.");
    appendOutput(""); // Add an empty line for spacing before the first prompt
    commandInput.focus(); // Ensure input is focused on load
});
