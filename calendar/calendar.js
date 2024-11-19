document.addEventListener("DOMContentLoaded", function() {
    const calendarContainer = document.getElementById('calendar');
    const calendarTitle = document.getElementById('calendar-title');
    const currentDateLabel = document.getElementById('current-date-label');
    const nextButton = document.getElementById('next-button');
    const taskContainer = document.querySelector('.task');
    const usernameDisplay = document.getElementById("username-display");
    const planContainer = document.querySelector('.plan'); // Plan container in calendar.html
    let selectedDate = null;

    let currentMonth = new Date().getMonth(); // Current month (0-11)
    let currentYear = new Date().getFullYear(); // Current year (e.g. 2024)

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Display the username
    function displayUsername() {
        const username = localStorage.getItem("username");
        if (username) {
            usernameDisplay.textContent = `Welcome, ${username}!`;
        } else {
            usernameDisplay.textContent = "Welcome, Guest!";
        }
    }

    function generateCalendar() {
        // Clear the previous calendar content
        calendarContainer.innerHTML = '';

        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const totalDaysInMonth = lastDayOfMonth.getDate();
        const firstDayOfWeek = firstDayOfMonth.getDay();

        // Update the calendar title
        calendarTitle.textContent = `${firstDayOfMonth.toLocaleString('default', { month: 'long' })} ${currentYear}`;

        // Update the current date label
        currentDateLabel.textContent = `Current Date: ${firstDayOfMonth.toLocaleString('default', { month: 'long' })} ${currentYear}`;

        // Create the days of the week header
        daysOfWeek.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.textContent = day;
            dayHeader.style.fontWeight = "bold";
            calendarContainer.appendChild(dayHeader);
        });

        // Create empty divs for the days before the first day of the month
        for (let i = 0; i < firstDayOfWeek; i++) {
            const emptyDiv = document.createElement('div');
            calendarContainer.appendChild(emptyDiv);
        }

        // Create the day divs
        for (let day = 1; day <= totalDaysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = day;

            // Add event listener for clicking on a day
            dayDiv.addEventListener('click', function() {
                // Remove 'clicked' class from previously selected date
                if (selectedDate) {
                    selectedDate.classList.remove('clicked');
                }
                // Add 'clicked' class to the current selection
                dayDiv.classList.add('clicked');
                selectedDate = dayDiv; // Update the selected date reference
            });

            calendarContainer.appendChild(dayDiv);
        }
    }

    // Retrieve stored slider values from localStorage and display in task container
    function updateTaskContainer() {
        const slider1Value = localStorage.getItem('slider1');
        const slider2Value = localStorage.getItem('slider2');
        const slider3Value = localStorage.getItem('slider3');
        const slider4Value = localStorage.getItem('slider4');

        // Display the task details based on the slider values
        const taskContent = `
            <h2>Task Details:</h2>
            <p>Take a break: <span id="taskSlider1">${slider1Value ? slider1Value : 'No data'}</span></p>
            <p>Get off the phone: <span id="taskSlider2">${slider2Value ? slider2Value : 'No data'}</span></p>
            <p>Go exercise: <span id="taskSlider3">${slider3Value ? slider3Value : 'No data'}</span></p>
            <p>Eat or drink now: <span id="taskSlider4">${slider4Value ? slider4Value : 'No data'}</span></p>
        `;

        taskContainer.innerHTML = taskContent;
    }

    // Retrieve the selected time and note from localStorage and display them in the plan container
    function updatePlanContainer() {
        const selectedTime = localStorage.getItem('selectedTime');
        const note = localStorage.getItem('note');

        // Get the elements where the content will be displayed
        const timeElement = document.createElement('p');
        const noteElement = document.createElement('p');

        // Display the time and note
        if (selectedTime) {
            timeElement.textContent = `Selected Time: ${selectedTime}`;
        } else {
            timeElement.textContent = 'No time selected.';
        }

        if (note) {
            noteElement.textContent = `Note: ${note}`;
        } else {
            noteElement.textContent = 'No note provided.';
        }

        // Append to the plan container
        planContainer.innerHTML = ''; // Clear previous content
        planContainer.appendChild(timeElement);
        planContainer.appendChild(noteElement);
    }

    // Event listeners for the buttons
    document.getElementById('prev-year').addEventListener('click', function() {
        currentYear--;
        generateCalendar();
    });

    document.getElementById('next-year').addEventListener('click', function() {
        currentYear++;
        generateCalendar();
    });

    document.getElementById('prev-month').addEventListener('click', function() {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        generateCalendar();
    });

    document.getElementById('next-month').addEventListener('click', function() {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        generateCalendar();
    });

    // Update the 'Next' button functionality
    nextButton.addEventListener('click', function() {
        if (selectedDate) {
            const selectedDay = selectedDate.textContent;
            const selectedMonth = currentMonth + 1; // Month is 0-indexed
            const selectedYear = currentYear;

            // Format date as YYYY-MM-DD or any preferred format
            const formattedDate = `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}-${selectedDay.padStart(2, '0')}`;

            // Redirect to selection.html with the selected date in the query parameter
            window.location.href = `selection.html?date=${formattedDate}`;
        } else {
            alert('Please select a date first.');
        }
    });

    // Initial calendar rendering
    generateCalendar();

    // Update the task container with slider values
    updateTaskContainer();

    // Display the username
    displayUsername();

    // Update the plan container with time and note from localStorage
    updatePlanContainer();
});
