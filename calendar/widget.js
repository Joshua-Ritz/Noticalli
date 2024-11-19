// Add the real-time widget dynamically
document.addEventListener("DOMContentLoaded", () => {
    const widget = document.createElement("div");
    widget.className = "datetime-container";
    widget.innerHTML = `<span id="datetime-display" class="datetime-display"></span>`;
    document.body.insertBefore(widget, document.body.firstChild);

    // Update the real-time display
    function updateDateTime() {
        const now = new Date();
        const formattedDate = now.toLocaleDateString('default', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        const formattedTime = now.toLocaleTimeString('default', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
        document.getElementById('datetime-display').textContent = `${formattedDate}, ${formattedTime}`;
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);
});
