document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the date from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const selectedDate = urlParams.get('date');

    // Display the selected date
    const selectedDateElement = document.getElementById('selected-date');
    if (selectedDate) {
        selectedDateElement.textContent = `Selected Date: ${selectedDate}`;
    } else {
        selectedDateElement.textContent = 'No date selected.';
    }

    // Retrieve the stored value from localStorage for the average
    const averageValue = localStorage.getItem('averageValue');
    const averageResultElement = document.getElementById('average-label'); // Updated ID

    // If the average value exists, display it inside the container
    if (averageValue) {
        averageResultElement.textContent = `Your Quality of Life is: ${averageValue}`;
    } else {
        averageResultElement.textContent = 'No average value found.';
    }

    // Time Picker functionality
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours from 24-hour to 12-hour format
    if (hours > 12) {
        hours = hours - 12;
    } else if (hours === 0) {
        hours = 12; // Midnight case
    }

    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Fill hours select with 12-hour options
    const hoursSelect = document.getElementById('hours');
    for (let i = 1; i <= 12; i++) {
        const option = document.createElement('option');
        option.value = i < 10 ? '0' + i : i;
        option.textContent = i < 10 ? '0' + i : i;
        hoursSelect.appendChild(option);
    }

    // Set the current hour in the dropdown
    hoursSelect.value = hours < 10 ? '0' + hours : hours;

    // Fill minutes select with options for all minutes (00-59)
    const minutesSelect = document.getElementById('minutes');
    for (let i = 0; i < 60; i++) {
        const option = document.createElement('option');
        const minuteValue = i < 10 ? '0' + i : i;
        option.value = minuteValue;
        option.textContent = minuteValue;
        minutesSelect.appendChild(option);
    }

    // Set the current minutes value
    minutesSelect.value = minutes;

    // Fill AM/PM select with options
    const ampmSelect = document.getElementById('ampm');
    ['AM', 'PM'].forEach(ampmValue => {
        const option = document.createElement('option');
        option.value = ampmValue;
        option.textContent = ampmValue;
        ampmSelect.appendChild(option);
    });

    // Set the current AM/PM value
    ampmSelect.value = ampm;

    // Save selected time and note to localStorage when the user clicks 'Save'
    document.getElementById('save-planner').addEventListener('click', function () {
        // Get the selected time and note values
        const selectedTime = `${hoursSelect.value}:${minutesSelect.value} ${ampmSelect.value}`;
        const note = document.getElementById('note-textbox').value;

        // Store them in localStorage
        localStorage.setItem('selectedTime', selectedTime);
        localStorage.setItem('note', note);

        // Redirect to calendar.html to display the saved data
        window.location.href = 'calendar.html';
    });

    // Slider functionality
    const sliders = document.querySelectorAll('.slider-container input[type="range"]');
    const sliderValues = document.querySelectorAll('.slider-container span');

    sliders.forEach((slider, index) => {
        slider.addEventListener('input', function () {
            // Update the respective slider value display
            sliderValues[index].textContent = slider.value;

            // Store the slider value in localStorage
            localStorage.setItem(slider.id, slider.value);
        });
    });
});
