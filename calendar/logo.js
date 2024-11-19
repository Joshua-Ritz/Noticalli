document.addEventListener("DOMContentLoaded", () => {
    const logoContainer = document.createElement("div");
    logoContainer.id = "floating-logo";
    logoContainer.innerHTML = `
        <a href="LoginPage.html">
            <img src="transparent logo.png" alt="Logo">
        </a>
    `;
    document.body.appendChild(logoContainer);
});
