// Slider functionality
const slider1 = document.getElementById("slider1");
const sliderLabel1 = document.getElementById("sliderValue1");

slider1.addEventListener("input", () => {
    sliderLabel1.textContent = slider1.value;
    updateAverage(); // Update the average whenever a slider value changes
});

const slider2 = document.getElementById("slider2");
const sliderLabel2 = document.getElementById("sliderValue2");

slider2.addEventListener("input", () => {
    sliderLabel2.textContent = slider2.value;
    updateAverage();
});

const slider3 = document.getElementById("slider3");
const sliderLabel3 = document.getElementById("sliderValue3");

slider3.addEventListener("input", () => {
    sliderLabel3.textContent = slider3.value;
    updateAverage();
});

const slider4 = document.getElementById("slider4");
const sliderLabel4 = document.getElementById("sliderValue4");

slider4.addEventListener("input", () => {
    sliderLabel4.textContent = slider4.value;
    updateAverage();
});

// Function to calculate the average and update the label
function updateAverage() {
    const value1 = parseInt(slider1.value);
    const value2 = parseInt(slider2.value);
    const value3 = parseInt(slider3.value);
    const value4 = parseInt(slider4.value);

    const average = (value1 + value2 + value3 + value4) / 4;
    const resultLabel = document.getElementById("average-label");

    resultLabel.textContent = getLabelForAverage(average);
    localStorage.setItem("averageValue", resultLabel.textContent); // Save the text content
    updateLabelColor(resultLabel, average);
}

// Function to determine the label based on the average value
function getLabelForAverage(average) {
    if (average >= 8) return "Healthy";
    if (average >= 6) return "Good";
    if (average >= 4) return "Fine";
    return "Bad";
}

// Function to update the color of the label based on the average value
function updateLabelColor(label, average) {
    if (average >= 8) {
        label.style.color = "green"; // Healthy
    } else if (average >= 6) {
        label.style.color = "blue"; // Good
    } else if (average >= 4) {
        label.style.color = "orange"; // Fine
    } else {
        label.style.color = "red"; // Bad
    }
}

// Sign-up button event
const signUpButton = document.querySelector('button[type="submit"]');
const averageLabel = document.getElementById("average-label");
const usernameInput = document.getElementById('username');

signUpButton.addEventListener('click', function(event) {
    // Prevent the form from submitting
    event.preventDefault();

    // Get the username value
    const username = usernameInput.value.trim(); // Trim to remove whitespace

    if (!username) {
        alert('Please enter a username.');
        return;
    }

    // Store the username in local storage
    localStorage.setItem('username', username);

    // Redirect to the calendar page
    window.location.href = 'calendar.html';
});
