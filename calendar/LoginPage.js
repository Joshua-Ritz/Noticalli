function validateForm(event) {
    // Prevent default form submission
    event.preventDefault();

    // Get input values
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('error-message') || createErrorMessage();

    // Validate inputs
    if (username === '' || password === '') {
        errorMessage.textContent = 'Username and password are required.';
        errorMessage.style.display = 'block'; // Show the error message
        return false; // Prevent form submission
    }

    // Hide error message if inputs are valid
    errorMessage.style.display = 'none';

    // Redirect to calendar page
    window.location.href = 'calendar.html';
    return true;
}

// Helper function to create an error message dynamically if missing
function createErrorMessage() {
    const form = document.getElementById('loginForm');
    const errorMessage = document.createElement('p');
    errorMessage.id = 'error-message';
    errorMessage.style.color = 'red';
    errorMessage.style.display = 'none';
    form.appendChild(errorMessage);
    return errorMessage;
}
