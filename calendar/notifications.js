document.addEventListener('DOMContentLoaded', () => {
    const slider1 = document.getElementById('taskSlider1');
    const slider2 = document.getElementById('taskSlider2');
    const slider3 = document.getElementById('taskSlider3');
    const slider4 = document.getElementById('taskSlider4');
    const notificationGapInput = document.getElementById('notificationGap');
    const muteSoundCheckbox = document.getElementById('muteSound');

    let intervalId;

    // Function to send notifications
    function sendNotification(task, time) {
        if (Notification.permission === 'granted') {
            new Notification(`Reminder: ${task}`, {
                body: `It's time to ${task} (${time} hours interval).`,
            });
        } else {
            alert(`Reminder: ${task}\nIt's time to ${task} (${time} hours interval).`);
        }

        // Play a sound if not muted
        if (!muteSoundCheckbox.checked) {
            const sound = new Audio('notification.mp3'); // Replace with your sound file
            sound.play();
        }
    }

    // Function to start periodic notifications
    function startNotifications() {
        if (intervalId) clearInterval(intervalId); // Clear any existing intervals

        const notificationGap = parseInt(notificationGapInput.value, 10) * 60 * 60 * 1000; // Convert hours to milliseconds

        intervalId = setInterval(() => {
            // Check and send notifications based on slider values
            if (parseInt(slider1.textContent, 10) > 0) sendNotification('Take a break', notificationGap / (60 * 60 * 1000));
            if (parseInt(slider2.textContent, 10) > 0) sendNotification('Get off the phone', notificationGap / (60 * 60 * 1000));
            if (parseInt(slider3.textContent, 10) > 0) sendNotification('Go exercise', notificationGap / (60 * 60 * 1000));
            if (parseInt(slider4.textContent, 10) > 0) sendNotification('Eat or drink now', notificationGap / (60 * 60 * 1000));
        }, notificationGap);
    }

    // Request notification permission
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }

    // Start notifications when the gap value changes
    notificationGapInput.addEventListener('change', startNotifications);

    // Start notifications on load
    startNotifications();
});

// Sound notification function
const playSound = () => {
    const sound = new Audio('notification.mp3'); // Adjust the path to your sound file
    sound.play();
};

// Function to update the selected time and trigger sound
const updateSelectedTime = (time) => {
    const selectedTimeElement = document.getElementById('selected-time');
    selectedTimeElement.textContent = time; // Update the time text

    // Play sound whenever the selected time is updated
    playSound();
};

// Example of periodically updating the selected time (for demo purposes)
setInterval(() => {
    const currentTime = new Date().toLocaleTimeString(); // Get current time as an example
    updateSelectedTime(currentTime);
}, 5000); // Update every 5 seconds as an example

